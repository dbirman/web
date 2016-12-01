// Spiking variables
var spk_rate = 2;
var spk = zeros(200);
// Image
var pixReduction = 4; // how many pixels = 1 pixel for calculations
// Even a reduction by a factor of 2 makes a HUGE difference for 
// speed of calculations, and there's really no appreciable difference
// for the quality of the output
var imageData; // this is the current image data REDUCED
var imageDataRound; // for checking against clicked locations
var imageDataRaw; // keep this around so we can re-draw the RF later
// Receptive field
var rf;
var x0,y0,x0r,y0r; // center of receptive field
var rf_size;
var computeRF; // function set for each run 
var correctCount = 0;
// Stimulus parameters
var size;
var sizeOut;
//  - Circles: adjusts radius
//  - Bars: adjusts length
var theta;
var thetaOut;

// Visual canvas
var can_vis;
var can_out;
var cursorPosRaw = [-10,-10];
var cursorPos = [-10,-10]; // REDUCED POSITION-- NOT REAL
// Contexts
var ctx_vis;
var ctx_out;
// requestAnimationFrame 
var tick;

////////////////////
///// BLOCK 3 //////
////////////////////

var done3 = false;

function launch3() {
  can_vis = document.getElementById("visual1");
  can_out = document.getElementById("output1");
  sizeOut = document.getElementById("size1");
  ctx_vis = can_vis.getContext("2d");
  ctx_out = can_out.getContext("2d");

  can_vis.addEventListener("click",updateCanvasClick,false);
  can_vis.eventClick = eventClick3;
  can_vis.addEventListener("mousemove",updateCanvasMove,false);
  can_vis.eventMove = eventMove3;

  computeRF = computeRF3;

  // Launch
  addRGCrf();

  changeSize(2); // initial size
  drawBlock3();
  spike();
}

// Visual variables
var clickListPos = [];
var clickListNeg = [];

function sectionComplete() {
  // stop animations
  window.cancelAnimationFrame(tick);
  clearTimeout(stick);
  // show true 
  // completeSound.play();
  drawRawRF(ctx_vis,can_vis);
  done3 = true;
  $("#continue").show();
  $("#endblock3").show();
}

function computeRF3() {
  var diam = size*2; //diameter
  rf = zeros(pow(diam,2)[0]);
  for (var x=0;x<diam;x++) {
    for (var y=0;y<diam;y++) {
      var dist = Math.hypot(x-size,y-size);
      rf[y*diam+x] = (dist<size) ? 1 : 0;
    }
  }
}

function updateBlock3() {
  curData = zeros(rf.length); var count = 0;
  for (var x=cursorPos[0]-size;x<=cursorPos[0]+size-1;x++) {
    for (var y=cursorPos[1]-size;y<=cursorPos[1]+size-1;y++) {
      curData[count++] = imageData[y*can_vis.width/pixReduction+x];
    }
  }
  var val = sum(multiply(curData,rf)); 
  if (val>0) {val=val*3;}
  updateSpikeRate(val);
}

function updateSpikeRate(val) {
  spk_rate = 3 + val;
  if (spk_rate<0) {spk_rate=0;}
}

function eventClick3(x,y) {
  var x = Math.floor(x/pixReduction), y = Math.floor(y/pixReduction);
  for (var i=0;i<clickListNeg.length;i++) {
    if (clickListNeg[i][0]==x && clickListNeg[i][1]==y) {
      if (imageDataRound[y*100+x]==-1) {correctCount--;}
      clickListNeg.splice(i,1); return;
    }
  }
  for (var i=0;i<clickListPos.length;i++) {
    if (clickListPos[i][0]==x && clickListPos[i][1]==y) {
      if (imageDataRound[y*100+x]==1) {correctCount--;}
      // move to neg
      clickListNeg.push(clickListPos.splice(i,1)[0]);
      // check if that position is neg
      if (imageDataRound[y*100+x]==-1) {correctCount++;}
      return;
    }
  }
  clickListPos.push([x,y]);
  if (imageDataRound[y*100+x]==1) {correctCount++;}
  if (correctCount>25 && clickListPos.length>0 && clickListNeg.length>0) {sectionComplete();}
}

function eventMove3(x,y) {
  cursorPosRaw = [x,y];
  cursorPos = [Math.floor(x/pixReduction),Math.floor(y/pixReduction)];
}

function updateVisual3() {
  // draw clicks
  for (var i=0;i<clickListNeg.length;i++) {   
    drawCross(clickListNeg[i][0]*pixReduction,clickListNeg[i][1]*pixReduction,false,"#CD6155"); 
  }
  for (var i=0;i<clickListPos.length;i++) {
    drawCross(clickListPos[i][0]*pixReduction,clickListPos[i][1]*pixReduction,true,"#55CD61");
  }
  // draw cursor (over everything)
  ctx_vis.beginPath();
  ctx_vis.arc(cursorPosRaw[0], cursorPosRaw[1], size*2, 0, 2 * Math.PI, false);
  ctx_vis.fillStyle = "rgba(255,255,255,0.5)";
  ctx_vis.fill();
  // draw outer edge
  ctx_vis.beginPath();
  ctx_vis.arc(can_vis.width/2,can_vis.height/2,can_vis.width/2-1, 0, 2 * Math.PI, false);
  ctx_vis.strokeStyle = "#ffffff";
  ctx_vis.stroke();
}

function drawCross(x,y,cross,color) {
  ctx_vis.beginPath();
  ctx_vis.strokeStyle = color;
  ctx_vis.moveTo(x-5,y);
  ctx_vis.lineTo(x+5,y);
  if (cross) {
    ctx_vis.moveTo(x,y-5);
    ctx_vis.lineTo(x,y+5);
  } 
  ctx_vis.stroke();
}

function drawBlock3() {
  tick = window.requestAnimationFrame(drawBlock3);

  updateBlock3();
  // Clear contexts
  ctx_vis.clearRect(0,0,can_vis.width,can_vis.height);
  ctx_out.clearRect(0,0,can_out.width,can_out.height);
  // Block visual context + update
  clipCtx(ctx_vis,can_vis);
  updateVisual3();
  ctx_vis.restore();
  // Update output context
  ctx_out.strokeStyle = "#CD6155"; // low saturation red
  ctx_out.beginPath();
  ctx_out.moveTo(0,can_out.height-20-spk[0])
  for (var i=1;i<spk.length;i++) {
    ctx_out.lineTo(i,can_out.height-20-spk[i]);
  }
  ctx_out.stroke();
}

////////////////////
///// SHARED ///////
////////////////////


function changeSize(nSize) {
  size = nSize*pixReduction;
  sizeOut.innerHTML = "size="+size+"px"
  // Recompute the RF based on this new radius
  computeRF();
}

function computeSpikeRate(x,y,shape) {
  // Shape is an array that defines the size of the current
  // object that is being shown. We use this size to obtain
  // the corresponding space of the receptive field and dot
  // product the two to obtain the current firing rate.
  // We set spk_rate to that firing rate (scaled if necessary)
}

function addRGCrf() {
  // Sets up the retinal ganglion cell receptive field
  // we do this by drawing quickly on the canvas the retinal
  // ganglion cell RF, and then using getImageData to recover
  // what the image looks like (gray everywhere, except at 
  // areas where there is excitatory/inhibitory activity).
  // Finally we reduce the resolution of the image by the pixReduction
  // factor, and re-scale into the [0 1] space.

  // pick an x y coordinate to center at
  x0 = Math.random() * can_vis.width;
  y0 = Math.random() * can_vis.height;
  while (Math.hypot(x0-can_vis.width/2, y0-can_vis.height/2)>(can_vis.width/2-30)) {
    x0 = Math.random() * can_vis.width;
    y0 = Math.random() * can_vis.height;
  }
  x0r = Math.floor(x0/pixReduction);
  y0r = Math.floor(y0/pixReduction);
  // clear context
  ctx_vis.fillStyle = "#808080";
  ctx_vis.fillRect(0,0,can_vis.width,can_vis.height);
  // we will use the mexican hat function (gaussian windowed sin wave)
  // based on the hypotenuse distance from x,y coordinates
  rf_size = 100/pixReduction; // how far to do the test coordinate region
  var f = 0.1; 
  var sigma = 2.5; // largeish sigma
  var theta = 0; // no phase offset
  var xRange = divide(range(0,101),10);
  var outRange = mexicanHat(xRange,f,sigma,theta);
  for (var x=0;x<can_vis.width;x++) {
    for (var y =0;y<can_vis.height;y++) {
      var dist = Math.hypot(x-x0,y-y0);
      if (dist<75) {
        var i=0;
        while (i<dist) {i+=1;}
        ctx_vis.fillStyle = gsc2hex(Math.round(outRange[i]*1000)/1000);
        ctx_vis.fillRect(x,y,1,1);
      } else {
        ctx_vis.fillStyle = "#808080";
        ctx_vis.fillRect(x,y,1,1);
      }
    }
  }
  imageDataRaw = getImage(ctx_vis,can_vis,false);
  // Whew! That was a fucking pain. Now we get the image data
  // Note that rescale the imageData into the [-1 1] space
  // This is so that when we do firing rates later and things
  // work out nicely.
  imageData = getImage(ctx_vis,can_vis,true);

  for (var i=0;i<imageData.length;i++) {
    imageData[i] = imageData[i]/128-1;
  }
  imageDataRound = zeros(imageData.length);
  for (var i=0;i<imageDataRound.length;i++) {
    imageDataRound[i] = (imageData[i]>0.02)?1:((imageData[i]<0.02)?-1:0);
  }

}

function mexicanHat(x,f,sigma,theta) {
  // technically there's an x0 but we set it to 0 here
  // gaussian window * sin wave
  return add(0.5,multiply(0.5,multiply(pow(Math.exp(1),multiply(-1,divide(pow(x,2),multiply(2,pow(sigma,2))[0]))),cos(subtract(multiply(2*Math.PI*f,x),theta))))); 
}


////////////////////
///// HELPERS //////
////////////////////

function drawRawRF(ctx,canvas) {
  clipCtx(ctx_vis,can_vis);  
  for (var x=0;x<canvas.width;x++) {
    for (var y=0;y<canvas.width;y++) {
      ctx.fillStyle = gsc2hex(imageDataRaw[y*canvas.width+x]/255);
      ctx.fillRect(x,y,1,1);
    }
  }
  ctx_vis.beginPath();
  ctx_vis.arc(x0,y0,size*7, 0, 2 * Math.PI, false);
  ctx_vis.strokeStyle = "#ffffff";
  ctx_vis.stroke();
  ctx_vis.restore();
}

function getImage(ctx,canvas,flag) {
  var adata = ctx.getImageData(0,0,canvas.width,canvas.height).data;
  var data = zeros(adata.length/4);
  // we ignore alpha
  for (var i=0;i<data.length;i++) {
    data[i] = adata[i*4];
  }
  if (!flag) {return data;}
  var dataRed = zeros(data.length/(pow(pixReduction,2)[0]));
  // the last thing we have to do is reduce the quality by our factor
  for (var x=0;x<(canvas.width/pixReduction);x++) {
    for (var y=0;y<(canvas.height/pixReduction);y++) {
      // we could pre-save the size but that would be a hassle
      // also this isn't that slow (in theory)
      var ldata = [];
      // get the x position on the original canvas
      var xd_ = x*pixReduction, yd_ = y*pixReduction;
      for (var xd=xd_;xd<xd_+pixReduction;xd++) {
        for (var yd=yd_;yd<yd_+pixReduction;yd++) {
          ldata.push(data[yd*canvas.width+xd]);
        }
      }
      dataRed[y*(canvas.width/pixReduction)+x] = mean(ldata)
    }
  }
  return dataRed;
}

var stick;
var spike_false = [0,0,0,0,0];
var spike_true = [5,50,-10,-5,-2];

function spike() {
  // run again
  stick = setTimeout(spike,5);
  //
  prob = spk_rate/200; // estimate is that average tick is actually 5 ms
  if (Math.random() < prob) {
    spikes[cur].play();
    cur += 1; if(cur>39){cur=0;}
    for (var i=0;i<5;i++) {spk.shift(); spk.push(spike_true[i]+randn()*2);}
  } else {
    for (var i=0;i<5;i++) {spk.shift(); spk.push(spike_false[i]+randn()*2);}
  }
}

function poisson(avg) {
  // Returns the probability of a spike at any time t, given an average
  // rate of spiking and a time interval
}

function run(i) {
  clearTimeout(stick);
  window.cancelAnimationFrame(tick);
  // start tracking time
  prev_tick = now();

  correctCount = 0;

  switch (i) {
    case 3:
      if (!done3) {
        launch3();
        $("#continue").hide();
        $("#endblock3").hide();
      }
      break;
  }
}

function launch_local() {
  completeSound = new Audio("sounds/secretsound.mp3");
  spikes = [];
  for (var i=0;i<50;i++) {
    spikes.push(new Audio("sounds/spike.wav"));
  }
  cur = 0;
}

function updateCanvas(evt,canvas) {
  var rect = canvas.getBoundingClientRect(), // abs. size of element
    scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
    scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

  var x =  (evt.clientX - rect.left) * scaleX,   // scale mouse coordinates after they have
    y =  (evt.clientY - rect.top) * scaleY     // been adjusted to be relative to element
  return [x,y];
}

function updateCanvasMove(evt) {
  var canvas = evt.target;
  out = updateCanvas(evt,canvas);
  canvas.eventMove(out[0],out[1]);
}

function updateCanvasClick(evt) {
  evt.preventDefault();
  var canvas = evt.target;
  out = updateCanvas(evt,canvas);
  canvas.eventClick(out[0],out[1]);
}