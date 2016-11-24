var curBlock = 1;

// Canvas variables (for demo)
var canvas_rf = document.getElementById("canvas-rf");
var canvas_spk = document.getElementById("canvas-spk");
var canvas_img = document.getElementById("canvas-img");
var ctx_rf = canvas_rf.getContext("2d");
var ctx_spk = canvas_spk.getContext("2d");
var ctx_img = canvas_img.getContext("2d");

// RF variables
var rf;

// Spiking variables
var spk = createArray(400);
var hodgkinhuxley;
var inject = false;

// Image variables
var imgx, imgy, imgtx, imgty;
var imagedrawing = false;
var adorbs_px;

var adorbs = document.getElementById("adorbs");

var tick;

function stopDemo() {
	window.cancelAnimationFrame(tick);
}

function demo() {
	demoDraw();
	demoLogic();
	tick = window.requestAnimationFrame(demo);
}

function demoDraw() {
	draw_rf();
	draw_spk();
  draw_img();
}

function update_rf(x,y) {
	var xpos = Math.floor(x/25.);
	var ypos = Math.floor(y/25.);
	rf[xpos][ypos] = rf[xpos][ypos] + 0.5;
  if (rf[xpos][ypos] > 1) {rf[xpos][ypos]=-1;}
}

function update_img(x,y) {
  imagedrawing = true;
  imgtx = x; imgty = y;
  imgx = Math.round(x); imgy = Math.round(y);
}

function draw_rf() {
	for (var x =0; x<7;x++) {
		for (var y = 0; y < 7;y++) {
			ctx_rf.fillStyle = gsc2hex((rf[x][y]+1)/2);
			ctx_rf.fillRect(x*25,y*25,x*25+25,y*25+25);
		}
	}
}

function draw_spk() {
	ctx_spk.fillStyle = "#000000";
	ctx_spk.fillRect(0,0,canvas_spk.width,canvas_spk.height);
	ctx_spk.lineWidth = 1;
	ctx_spk.strokeStyle = "#ff0000"; // red
	ctx_spk.beginPath();
	ctx_spk.moveTo(0,175-spk[i]-40)
	for (var i=1; i<400;i++) {
		ctx_spk.lineTo(i,175-spk[i]-40);
	}
	ctx_spk.stroke();
}

function draw_img() {
  ctx_img.drawImage(adorbs,0,0,canvas_img.width,canvas_img.height);
  if (imagedrawing) {
    ctx_img.fillStyle = "#ffffff";
    ctx_img.globalAlpha = 0.3;
    ctx_img.fillRect(imgtx-3,imgty-3,7,7);
  }
}

function imgleave() {
  imagedrawing = false;
}

function demoLogic() {
  var V = 0;
  // Calculate overlap
  if (imagedrawing) {
    // We are on the image, get the rf
    rf_reshaped = rf[0].concat(rf[1],rf[2],rf[3],rf[4],rf[5],rf[6])
    // Now get the current image section: use imgx and imgy
    vs = [];
    for (var x=-3;x<4;x++) {
      for (var y=-3;y<4;y++) {
        cx = imgx-x; cy = imgy-y;
        v = adorbs_px[cy*150+cx];
        vs.push(v);
      }
    }
    // Multiply
    for (var i=0;i<vs.length;i++) {
      V += vs[i]*rf_reshaped[i];
    }
  }
  if (Number.isNaN(V)) {V=0;}
  var IDC = V;
  //repeats four times
  for (var reps=0;reps<25;reps++) {
    // Spiking
    var IRand = 35
    var Itau = 1
    var rawInj = IDC + IRand * 2 * (Math.random()-0.5);
    hodgkinhuxley.Iinj += hodgkinhuxley.dt/Itau * (rawInj - hodgkinhuxley.Iinj);
    hodgkinhuxley.step();
    V = hodgkinhuxley.V;
  }
  // IDC *= 0.9;
  spk.shift();
  spk.push(V);
}

function run(i) {
	// Runs each time a block starts incase that block has to do startup
	stopDemo();
	switch(i) {
		case 3:
   demo(); break;
 }
}

function prev() {
	document.getElementById("block"+curBlock).style.display="none";
	if (curBlock>1) {curBlock--;}
	run(curBlock);
	document.getElementById("block"+curBlock).style.display="";
}
function next() {
	document.getElementById("block"+curBlock).style.display="none";
	if (document.getElementById("block"+(curBlock+1))) {
		curBlock++;
		document.getElementById("block"+curBlock).style.display="";
	} else {		
		document.getElementById("endblock").style.display="";
	}
	run(curBlock);
}

function launch() {
	var i = 2;
  document.getElementById("endblock").style.display="none";
	var block = document.getElementById("block"+i);
	while(block) {
		block.style.display="none";
		i++;
		block = document.getElementById("block"+i);
	}
	run(curBlock);
	init_rf();
	canvas_rf.addEventListener("click", updateCanvas, false);
	canvas_rf.event = update_rf;

  canvas_img.addEventListener("mousemove", updateCanvas, false);
  canvas_img.addEventListener("mouseleave", imgleave, false);
  canvas_img.event = update_img;
  canvas_img.style.width  = '450px';
  canvas_img.style.height = '303px';
  // we're going to do something hacky to get the adorbs_img
  // file loaded properly
  // load it to the canvas
  ctx_img.drawImage(adorbs,0,0);
  // Now we need to contrast normalize the pixels
  // for each pixel, (150,101), subtract local mean and div
  // by local stdev
  adorbs_px = createArray(150*101);
  for (var x=0;x<150;x++) {
    for (var y=0;y<101;y++) {
      var val = ctx_img.getImageData(x,y,1,1).data[0];
      var local = ctx_img.getImageData(math.min(x-1,0),math.min(y-1,0),math.min(151-x,3),math.min(151-y,3)).data;
      var local_ = createArray(local.length/4);
      for (var i=0;i<local_.length;i++) {
        local_[i] = local[i*4];
      }
      adorbs_px[y*150+x] = (val-math.mean(local_)) / math.std(local_);
    }
  }

	hodgkinhuxley = new HH();

  for (var x =0; x<7;x++) {
    for (var y = 0; y < 7;y++) {
      rf[x][y] = 0;
    }
  }
}



// HELPERS

function init_rf() {
	rf = createArray(7,7);
	for (var x =0; x<7;x++) {
		for (var y = 0; y < 7;y++) {
			rf[x][y] = 0;
		}
	}
}

function createArray(length) {
  var arr = new Array(length || 0),
  i = length;

  if (arguments.length > 1) {
    var args = Array.prototype.slice.call(arguments, 1);
    while(i--) arr[length-1 - i] = createArray.apply(this, args);
  }

  return arr;
}

function gsc2hex( percentage ) {
  var color_part_dec = 255 * percentage;
  var color_part_hex = Number(parseInt( color_part_dec , 10)).toString(16);
  return "#" + color_part_hex + color_part_hex + color_part_hex;
}

function updateCanvas(evt) {
var canvas = evt.target;
var rect = canvas.getBoundingClientRect(), // abs. size of element
    scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
    scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

var x =  (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
		y =  (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element

    canvas.event(x,y);
}

function HH() {
	// From http://myselph.de/hodgkinHuxley.html
  this.dt = 0.025; //ms
  this.C = 1; //in muF/cm^2
  this.GKMax = 36;
  this.GNaMax = 120;
  this.EK = -12; //mV
  this.ENa = 115;
  this.Gm = 0.3;
  this.VRest = 10.613;
  this.V = 0;
  this.n = 0.32;
  this.m = 0.05;
  this.h = 0.60;
  this.INa = 0;
  this.IK = 0;
  this.Im = 0;
  this.Iinj = 0;

  function alphaN(V) {
    if (V===10) return alphaN(V+0.001); // 0/0 -> NaN
    return (10-V) / (100*(Math.exp((10-V)/10)-1));
  };
  function betaN(V) {
    return 0.125 * Math.exp(-V/80);
  };
  
  function alphaM(V) {
    if (V===25) return alphaM(V+0.001);  // 0/0 -> NaN
    return (25-V) / (10 * (Math.exp((25-V)/10)-1));
  };
  function betaM(V) {
    return 4 * Math.exp(-V/18)
  };
  
  function alphaH(V) {
    return 0.07*Math.exp(-V/20);
  };
  function betaH(V) {
    return 1 / (Math.exp((30-V)/10)+1);
  };
  
  this.step = function () {
    var aN = alphaN(this.V);
    var bN = betaN(this.V);
    var aM = alphaM(this.V);
    var bM = betaM(this.V);
    var aH = alphaH(this.V);
    var bH = betaH(this.V);
    
    var tauN = 1 / (aN + bN);
    var tauM = 1 / (aM + bM);
    var tauH = 1 / (aH + bH);
    var nInf = aN * tauN;
    var mInf = aM * tauM;
    var hInf = aH * tauH;
    
    this.n += this.dt / tauN * (nInf - this.n);
    this.m += this.dt / tauM * (mInf - this.m);
    this.h += this.dt / tauH * (hInf - this.h);
    this.INa = this.GNaMax * this.m * this.m * this.m * this.h * (this.ENa - this.V);
    this.IK = this.GKMax * this.n * this.n * this.n * this.n * (this.EK - this.V);
    this.Im = this.Gm * (this.VRest - this.V);
    this.V += this.dt / this.C * (this.INa + this.IK + this.Im + this.Iinj);
  };
};


// STart



launch();