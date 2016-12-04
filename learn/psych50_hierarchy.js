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
var sizeOutText;
var rotation;
var rotationOut;
var rotationOutText;
var drawStimulus; // draw function called by update()
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
var isDone;

////////////////////
///// BLOCK 3 //////
////////////////////

var done3 = false;

function launch3() {
  can_vis = document.getElementById("visual1");
  can_out = document.getElementById("output1");
  ctx_vis = can_vis.getContext("2d");
  ctx_out = can_out.getContext("2d");

  can_vis.addEventListener("click",updateCanvasClick,false);
  can_vis.eventClick = eventClick;
  can_vis.addEventListener("mousemove",updateCanvasMove,false);
  can_vis.eventMove = eventMove;

  sizeOut = document.getElementById("size1");
  sizeOutText = "radius=";

  computeRF = computeRF3;

  isDone = function() {return done3;}
  checkDone = checkDone3;
  drawStimulus = drawStimulus3;
  // Launch
  addRGCrf();

  changeSize(2); // initial size
  drawBlock();
  spike();
}

function end3() {
  done3 = true;
  $("#endblock3").show();
  sectionComplete();
}

function checkDone3() {
  if (!done3 && correctCount>15 && clickListPos.length>3 && clickListNeg.length>3) {end3();}
  console.log(correctCount);
}

// Visual variables
var clickListPos = [];
var clickListNeg = [];

function computeRF3() {
  var rad = size/pixReduction, diam=rad*2;
  rf = zeros(pow(diam,2)[0]);
  for (var x=0;x<diam;x++) {
    for (var y=0;y<diam;y++) {
      var dist = Math.hypot(x-rad,y-rad);
      rf[y*diam+x] = (dist<rad) ? 1 : 0;
    }
  }
}

function drawStimulus3() {
  ctx_vis.beginPath();
  ctx_vis.arc(cursorPosRaw[0], cursorPosRaw[1], size*2, 0, 2 * Math.PI, false);
  ctx_vis.fillStyle = "rgba(255,255,255,0.5)";
  ctx_vis.fill();
}

////////////////////
///// BLOCK 7 //////
////////////////////

var done7 = false;

function launch7() {
  can_vis = document.getElementById("visual7");
  can_out = document.getElementById("output7");
  ctx_vis = can_vis.getContext("2d");
  ctx_out = can_out.getContext("2d");

  can_vis.addEventListener("click",updateCanvasClick,false);
  can_vis.eventClick = eventClick;
  can_vis.addEventListener("mousemove",updateCanvasMove,false);
  can_vis.eventMove = eventMove;

  sizeOut = document.getElementById("size7");
  sizeOutText = "length=";
  rotationOut = document.getElementById("rotation7");
  rotationOutText="rotation=";

  isDone = function() {return done7;}

  computeRF = computeRF7;
  // only change after compute is set
  changeSize(3); // initial size
  changeRotation(0);

  checkDone = checkDone7;
  drawStimulus = drawStimulus7;
  // Launch
  addSCrf();

  drawBlock();
  spike();
}

function end7() {
  done7 = true;
  $("#endblock7").show();
  sectionComplete();
}

function checkDone7() {
  if (!done7 && correctCount>15 && clickListPos.length>3 && clickListNeg.length>3) {end7(); sectionComplete();}
}

// Visual variables
var clickListPos = [];
var clickListNeg = [];

canvast = document.getElementById("test");
ctxt = canvast.getContext("2d");

function computeRF7() {
  // Build the receptive field--this is square, min size is
  // the diagonal of the stimulus size. Use rotatePoint to
  // build stimulus at the correct angle.

  ctxt.clearRect(0,0,canvast.width,canvast.height);

  var diam = Math.round(size/pixReduction*1.5*2);
  var rad = diam/2;
  rf = zeros(pow(diam,2)[0]);
  for (var x=0;x<diam;x++) {
    for (var y=0;y<diam;y++) {
      var rot = rotatePoint(x,y,rad,rad,rotation*Math.PI/180);
      var ydist = Math.abs(rot[1]-rad);
      rf[y*diam+x] = (ydist<(diam/1.5/4)) ? 1 : 0;
      ctxt.fillStyle = gsc2hex(rf[y*diam+x]);
      ctxt.fillRect(x*pixReduction,y*pixReduction,pixReduction,pixReduction);
    }
  }

}

function drawStimulus7() {
  // draw a rotated bar
  ctx_vis.save();
  ctx_vis.translate(cursorPosRaw[0],cursorPosRaw[1]);
  ctx_vis.rotate(-rotation*Math.PI/180);
  ctx_vis.fillStyle = "rgba(255,255,255,0.5)";
  var lsize = size*1.5;
  ctx_vis.fillRect(-lsize,-size/4,lsize*2,size/2);
  ctx_vis.restore();
}
////////////////////
///// SHARED ///////
////////////////////

function updateBlock() {
  var rad = Math.sqrt(rf.length); // should always be square
  var curData = zeros(rf.length); var count = 0;
  var win_xy = [Math.round(cursorPos[0]-rad/2),Math.round(cursorPos[1]-rad/2)];
  for (var x=win_xy[0];x<win_xy[0]+rad;x++) {
    for (var y=win_xy[1];y<win_xy[1]+rad;y++) {
      curData[count++] = imageData[y*can_vis.width/pixReduction+x];
    }
  }
  var val = sum(multiply(curData,rf));
  updateSpikeRate(val);
}

function updateSpikeRate(val) {
  spk_rate = 3 + val*4;
  if (spk_rate<0) {spk_rate=0;}
}

function eventClick(x,y,shift) {
  // get current pos
  var x = Math.floor(x/pixReduction), y = Math.floor(y/pixReduction);

  if (shift) {
    // Deal with negatives
    for (var i=0;i<clickListNeg.length;i++) {
      if (clickListNeg[i][0]==x && clickListNeg[i][1]==y) {
        // FOUND IN LIST
        if (imageDataRound[y*100+x]==-1) {correctCount--;}
        clickListNeg.splice(i,1); checkDone(); return;
      }
    }
    
    // NOT IN LIST, ADD
    if (imageDataRound[y*100+x]==-1) {correctCount++;}
    clickListNeg.push([x,y]); checkDone(); return;

  } 
  else {
    for (var i=0;i<clickListPos.length;i++) {
      if (clickListPos[i][0]==x && clickListPos[i][1]==y) {
          // FOUND IN LIST
        if (imageDataRound[y*100+x]==1) {correctCount--;}
        clickListPos.splice(i,1); checkDone(); return;
      }
    }
      
    // NOT IN LIST, ADD
    if (imageDataRound[y*100+x]==1) {correctCount++;}
      clickListPos.push([x,y]); checkDone(); return;
  }
}

function eventMove(x,y) {
  cursorPosRaw = [x,y];
  cursorPos = [Math.floor(x/pixReduction),Math.floor(y/pixReduction)];
}

function updateVisual() {
  if (!isDone()) {
    // draw clicks
    for (var i=0;i<clickListNeg.length;i++) {   
      drawCross(clickListNeg[i][0]*pixReduction,clickListNeg[i][1]*pixReduction,false,"#CD6155"); 
    }
    for (var i=0;i<clickListPos.length;i++) {
      drawCross(clickListPos[i][0]*pixReduction,clickListPos[i][1]*pixReduction,true,"#55CD61");
    }
  } 
  else {
    // show true RF
    drawRawRF(ctx_vis,can_vis);
  }
  // draw cursor (over everything)
  drawStimulus();
  // draw outer edge
  ctx_vis.beginPath();
  ctx_vis.arc(can_vis.width/2,can_vis.height/2,can_vis.width/2-1, 0, 2 * Math.PI, false);
  ctx_vis.strokeStyle = "#ffffff";
  ctx_vis.stroke();
}

function drawBlock() {
  tick = window.requestAnimationFrame(drawBlock);

  updateBlock();
  // Clear contexts
  ctx_vis.clearRect(0,0,can_vis.width,can_vis.height);
  ctx_out.clearRect(0,0,can_out.width,can_out.height);
  // Block visual context + update
  clipCtx(ctx_vis,can_vis);
  updateVisual();
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
///// HELPERS //////
////////////////////


function drawCross(x,y,cross,color) {
  ctx_vis.beginPath();
  ctx_vis.strokeStyle = color;
  ctx_vis.moveTo(x-3,y);
  ctx_vis.lineTo(x+3,y);
  if (cross) {
    ctx_vis.moveTo(x,y-3);
    ctx_vis.lineTo(x,y+3);
  } 
  ctx_vis.stroke();
}

function changeSize(nSize) {
  size = nSize*pixReduction;
  sizeOut.innerHTML = sizeOutText+size+"px";
  // Recompute the RF based on this new radius
  computeRF();
}

function changeRotation(nRotation) {
  rotation = nRotation;
  rotationOut.innerHTML = rotationOutText+rotation+"deg";
  computeRF();
}

function mexicanHat(x,f,sigma,theta) {
  // technically there's an x0 but we set it to 0 here
  // gaussian window * sin wave
  return add(0.5,multiply(0.5,multiply(pow(Math.exp(1),multiply(-1,divide(pow(x,2),multiply(2,pow(sigma,2))[0]))),cos(subtract(multiply(2*Math.PI*f,x),theta))))); 
}

function mexicanHat2d(x,dist,f,sigma,theta) {
  return add(0.5,multiply(0.5,multiply(pow(Math.exp(1),multiply(-1,divide(pow(dist,2),multiply(2,pow(sigma,2))[0]))),cos(subtract(multiply(2*Math.PI*f,x),theta))))); 
}

function drawRawRF_test(ctx,canvas) {
  for (var x=0;x<canvas.width;x++) {
    for (var y=0;y<canvas.width;y++) {
      var val = imageDataRaw[y*400+x];
      if (!(val==128)) {
        ctx.fillStyle = gsc2hex(val/255);
        ctx.fillRect(x,y,1,1);
      }
    }
  }
}

function drawRawRF(ctx,canvas) {
  for (var x=0;x<canvas.width/pixReduction;x+=2) {
    for (var y=0;y<canvas.width/pixReduction;y+=2) {
      if (imageDataRound[y*100+x]==1) {
        // draw +
        drawCross(x*pixReduction,y*pixReduction,true,"#55CD61"); 
      } else if (imageDataRound[y*100+x]==-1) {
        drawCross(x*pixReduction,y*pixReduction,true,"#CD6155"); 
      }
    }
  }
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

  // reset hidden
  $("#continue").show();

  correctCount = 0;

  switch (i) {
    case 5:
      if (!done3) {
        launch3();
        $("#continue").hide();
        $("#endblock3").hide();
      }
      break;
    case 7:
      if (!done7) {
        launch7();
        $("#continue").hide();
        $("#endblock7").hide();
      }
  }
}

function launch_local() {
  completeSound = new Audio("sounds/secretsound.mp3");
  spikes = [];
  for (var i=0;i<50;i++) {
    spikes.push(new Audio("sounds/spike.wav"));
  }
  cur = 0; 
  katex.render("out=f(in)",document.getElementById("katex1"),{displayMode:true});
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
  canvas.eventClick(out[0],out[1],evt.shiftKey);
}

function sectionComplete() {
  // completeSound.play();
  // mark that this section is complete (so it doesn't restart if we come back)
  $("#continue").show();
}

function rotatePoint(x,y,xo,yo,angle) {
  var cos = Math.cos(angle),
    sin = Math.sin(angle),
    dX = x - xo,
    dY = y - yo;

  return [cos * dX - sin * dY + xo,sin * dX + cos * dY + yo];
}

////////////////////
///// RECEPTIVE //////
////////////////////

////////////////////
///// FIELD //////
////////////////////

////////////////////
///// FUNCTIONS //////
////////////////////

function pickRFCenter() {
  // pick an x y coordinate to center at
  x0 = Math.random() * can_vis.width;
  y0 = Math.random() * can_vis.height;
  while (Math.hypot(x0-can_vis.width/2, y0-can_vis.height/2)>(can_vis.width/2-50)) {
    x0 = Math.random() * can_vis.width;
    y0 = Math.random() * can_vis.height;
  }
  x0r = Math.floor(x0/pixReduction);
  y0r = Math.floor(y0/pixReduction);
}

function pullData() {
  // Now we get the image data
  // Note that rescale the imageData into the [-1 1] space
  // This is so that when we do firing rates later and things
  // work out nicely.
  imageDataRaw = getImage(ctx_vis,can_vis,false);
  imageData = getImage(ctx_vis,can_vis,true);

  for (var i=0;i<imageData.length;i++) {
    imageData[i] = imageData[i]/128-1;
  }
  imageDataRound = zeros(imageData.length);
  for (var i=0;i<imageDataRound.length;i++) {
    imageDataRound[i] = (imageData[i]>0.02)?1:((imageData[i]<-0.02)?-1:0);
  }
}

function addSCrf() {
  // Sets up the simple cell receptive field
  // see RGCrf for technical detials

  // The SC receptive field is a gaussian windowed
  // mexican hat function in *one dimension*
  pickRFCenter();

  // clear context to grey
  ctx_vis.fillStyle = "#808080";
  ctx_vis.fillRect(0,0,can_vis.width,can_vis.height);
  // pick an angle for the receptive field
  var angle = Math.floor(Math.random()*9)/4*Math.PI;
  //
  var f = 0.015; 
  var sigma = 25; // largeish sigma
  var theta = Math.PI/2; // no phase offset
  // To run the algorithm we compute for every x,y coordinate a rotated
  // coordinate around the point x0,y0
  for (var x=0;x<can_vis.width;x++) {
    for (var y =0;y<can_vis.height;y++) {
      var dist = Math.hypot(x-x0,y-y0);
      if (dist<75) {
        // note: rotates around x0,y0, -angle so that it doesn't go backwards
        var rot = rotatePoint(x,y,x0,y0,angle); 
        var gsc = mexicanHat2d(rot[0]-x0,dist,f,sigma,theta);
        ctx_vis.fillStyle = gsc2hex(gsc);
        ctx_vis.fillRect(x,y,1,1);
      }
      else {
        ctx_vis.fillStyle = "#808080";
        ctx_vis.fillRect(x,y,1,1);
      }
    }
  }
  // get imageData, raw, round
  pullData();
}

function addRGCrf() {
  // Sets up the retinal ganglion cell receptive field
  // we do this by drawing quickly on the canvas the retinal
  // ganglion cell RF, and then using getImageData to recover
  // what the image looks like (gray everywhere, except at 
  // areas where there is excitatory/inhibitory activity).
  // Finally we reduce the resolution of the image by the pixReduction
  // factor, and re-scale into the [0 1] space.

  // The RGC receptive field is a gaussian windowed
  // mexican hat function in *zero dimensions*
  pickRFCenter();
  // clear context to grey
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
  // get imageData, raw, round
  pullData();
}