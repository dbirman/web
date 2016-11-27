
////////////////////////////////
////////// BLOCK 2 /////////////
////////////////////////////////

// Cannonball variables
var y0 = 0,
	vy = 10,
	ay = -1;

// Equations
var time = divide(range(0,50),10);
var data = quadratic(time,0,49,-9.8);

function textarea1(e) {
	var key = window.event.keyCode;
	if (key===13) {
		e.preventDefault();
		eval(document.getElementById('textarea1').value);
		drawPlot1();
		checkLS();
	}
}

function checkLS() {
	// We're going to check the least squares difference between our model
	// and the data, and when it gets below some threshold
	// we will allow students to continue
	ym = quadratic(time,y0,vy,ay);
	yd = data;
	LS = sum(pow(subtract(yd,ym),2));
	if (LS<1 && !done2) {
		alert('Good fit! You can continue with the tutorial now.');
		document.getElementById("continue").style.display="";
		document.getElementById("leastsquares_hidden1").style.display="";
		document.getElementById("leastsquares_visible1").style.display="none";
		done2 = true;
	}
}

function quadratic(t,y0,vy,ay) {
	// x = add(add(x0,multiply(vx,t)),multiply(ax,pow(t,2)));
	y = max(0,add(add(y0,multiply(vy,t)),multiply(ay,pow(t,2))));
	return y
}

function drawPlot1() {
	traceM = {
		x: time,
		y: quadratic(time,y0,vy,ay),
		mode:'line',
		line:{color:'black'},
		type:'scatter',
		name:'Model'
	}
	traceD = {
		x: time,
		y: data,
		mode:'markers',
		marker: {color:'red'},
		type:'scatter',
		color:'red',
		name:'Data'
	}
	layout.title = 'Cannonball height over time';
	layout.xaxis.title = 'Time (s)';
	layout.xaxis.range = [0,5];
	layout.yaxis.title = 'Height (m)';
	layout.yaxis.range = [0, 65];
	Plotly.newPlot('plot1',[traceM, traceD],layout);
}

////////////////////////////////
////////// BLOCK 3 /////////////
////////////////////////////////

var canvas_25 = document.getElementById("canvas_mot25");
var ctx_25 = canvas_25.getContext("2d");
var canvas_50 = document.getElementById("canvas_mot50");
var ctx_50 = canvas_50.getContext("2d");
var canvas_75 = document.getElementById("canvas_mot75");
var ctx_75 = canvas_75.getContext("2d");

var dots25 = initDots(400,100,100,0.25,0);
var dots50 = initDots(400,100,100,0.50,0);
var dots75 = initDots(400,100,100,0.75,0);
var tick3;

function clipCtx(ctx,canvas) {
	ctx.save();
	ctx.beginPath();
	ctx.arc(canvas.width/2,canvas.height/2,canvas.width/2,0,2*Math.PI,false);
	ctx.clip();
}

function drawMotionPatches() {
	ctx_25.clearRect(0,0,canvas_25.width,canvas_25.height);
	ctx_50.clearRect(0,0,canvas_50.width,canvas_50.height);
	ctx_75.clearRect(0,0,canvas_75.width,canvas_75.height);
	dots25 = updateDots(dots25,0.25);
	dots50 = updateDots(dots50,0.50);
	dots75 = updateDots(dots75,0.75);
	clipCtx(ctx_25,canvas_25);
	clipCtx(ctx_50,canvas_75);
	clipCtx(ctx_75,canvas_75);
	drawDots(dots25,ctx_25);
	drawDots(dots50,ctx_50);
	drawDots(dots75,ctx_75);
	ctx_25.restore();
	ctx_50.restore();
	ctx_75.restore();
	tick3 = window.requestAnimationFrame(drawMotionPatches);
}

////////////////////////////////
////////// BLOCK 4 /////////////
////////////////////////////////
var canvas_patch1 = document.getElementById("motion_patch1");
var output1 = document.getElementById("output1");
var ctx_patch1 = canvas_patch1.getContext("2d");
var ctx_output1 = output1.getContext("2d");

var tick4;

var time4 = 0;
var dots4 = initDots(400,100,100,0,0);

var outL = zeros(200);
var outR = zeros(200);

function drawMotionDemo() {
	ctx_patch1.clearRect(0,0,canvas_patch1.width,canvas_patch1.height);
	ctx_output1.clearRect(0,0,output1.width,output1.height);

	// compute time, direction, and coherence
	time4 += 0.01; // we'll use a sine wave to compute the coherence
	var coherence = Math.sin(time4);
	var dir = (coherence>0) ? 0 : Math.PI;
	var noise = 0.2; // use to generate DDM 
	// update
	dots4 = updateDots(dots4,Math.abs(coherence),dir);
	// draw dots
	clipCtx(ctx_patch1,canvas_patch1);
	drawDots(dots4,ctx_patch1)
	ctx_patch1.restore();
	// draw DDM output
	var mult = 40;
	outL.shift();
	outL.push((coherence<0) ? (-1 * coherence + randn() * noise)*mult : randn()*noise*mult);
	ctx_output1.strokeStyle = "#0000ff";
	ctx_output1.beginPath();
	ctx_output1.moveTo(0,output1.height-20);
	for (var i=0;i<400;i++) {
		ctx_output1.lineTo(i,output1.height-outL[i]-20);
	}
	ctx_output1.stroke();
	// out right
	outR.shift();
	outR.push((coherence>0) ? (coherence + randn() * noise)*mult : randn()*noise*mult);
	ctx_output1.strokeStyle = "#ff0000";
	ctx_output1.beginPath();
	ctx_output1.moveTo(0,output1.height-20);
	for (var i=0;i<400;i++) {
		ctx_output1.lineTo(i,output1.height-outR[i]-20);
	}
	ctx_output1.stroke();

	tick4 = window.requestAnimationFrame(drawMotionDemo);
}

////////////////////////////////
////////// BLOCK 5 /////////////
////////////////////////////////

// This is the sample block, before they build up the model themselves
var canvas_sample = document.getElementById("sample");
var ctx_sample = canvas_sample.getContext("2d");

var tick5;

var dots4 = initDots(400,100,100,0,0);
var coherence4 = 0.75;


function drawMotionSample() {
	dots4 = updateDots(dots4,coherence4)
	// draw
	ctx_sample.clearRect(0,0,canvas_sample.width,canvas_sample.height);
	clipCtx(ctx_sample,canvas_sample);
	drawDots(dots4,ctx_sample);
	ctx_sample.restore();

	tick5 = window.requestAnimationFrame(drawMotionSample);
}

function resetSample() {
	coherence4 = Math.random()*2-1;
	dots4.dir = (coherence4>0) ? 0 : Math.PI;
	coherence4 = Math.abs(coherence4);
	// Re-build the plot
	drawPlot2();
}

function buildPlot2() {
	var mult = 2; // response multiplier (coherence>0) ? (coherence + randn() * noise)*mult : randn()*noise*mult
	var noise = 1;
	var data = {};
	// build up the variables for the plot
	// the evidence runs are just the L/R evidence 
	data.eL = [0]; // evidence left
	data.eR = [0];
	data.E = [0]; // accumulated evidence
	data.time = range(1,40);
	for (var i=1; i<40; i++) {
		var r = (dots4.dir==0) ? (coherence4 + randn() * noise)*mult : randn()*noise*mult;
		r = r>0?r:0;
		var l = (!(dots4.dir==0)) ? (coherence4 + randn() * noise)*mult : randn()*noise*mult;
		l = l>0?l:0;
		var E = l-r;
		data.eL.push(l);
		data.eR.push(r);
		data.E.push(data.E[i-1]+E);
	}
	return data;
}

function drawPlot2() {
	var data2 = buildPlot2();
	traceL = {
		x: data2.time,
		y: data2.eL,
		mode:'line',
		line:{color:'blue'},
		type:'scatter',
		name:'Left population response'
	}
	traceR = {
		x: data2.time,
		y: data2.eR,
		mode:'line',
		line:{color:'red'},
		type:'scatter',
		name:'Right population response'
	}
	traceM = {
		x: data2.time,
		y: data2.E,
		mode:'line',
		marker: {color:'black'},
		type:'scatter',
		name:'Accumulated evidence (left - right)'
	}
	layout.title = 'Accumulated evidence';
	layout.xaxis.title = 'Time (ms)';
	layout.xaxis.range = [0,40];
	layout.yaxis.title = 'Evidence for RIGHT --------- Evidence for LEFT';
	layout.yaxis.range = [-25,25];
	Plotly.newPlot('plot2',[traceL,traceR, traceM],layout);
}

////////////////////////////////
////////// BLOCK 6 /////////////
////////////////////////////////



///////////////////////////////////
////////// LOCAL CODE /////////////
///////////////////////////////////

var done2 = false;

function stopMotion() {
	window.cancelAnimationFrame(tick3);
	window.cancelAnimationFrame(tick4);
	window.cancelAnimationFrame(tick5);
}

function run(i) {
	stopMotion();				
	document.getElementById("continue").style.display="";
	// Runs each time a block starts incase that block has to do startup
	switch(i) {
		case 2:
			if (!done2) {
				// least squares fitting: hide continue and leastsquares answer panels
				document.getElementById("continue").style.display="none";
				document.getElementById("leastsquares_hidden1").style.display="none";		
			}
			break;
		case 3:
			drawMotionPatches();
			break;
		case 4:
			drawMotionDemo();
			break;
		case 5:
			drawMotionSample();
			break;
 }
}

function launch_local() {
	katex.render("y(t)=y_{0}+v_{y}t+\\frac{1}{2}at^{2}",document.getElementById("katex1"),{displayMode:true});
	katex.render("y(t)=y_{0}+v_{y}t+\\frac{1}{2}at^{2}",document.getElementById("katex2"),{displayMode:true});	
	katex.render("difference(t)=left(t)-right(t)",document.getElementById("katex3"),{displayMode:true});	
	drawPlot1();
	drawPlot2();
}