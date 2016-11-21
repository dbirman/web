var curBlock = 1;
var canvas_rf = document.getElementById("canvas-rf");
var canvas_spk = document.getElementById("canvas-spk");
var canvas_img = document.getElementById("canvas-img");
var ctx_rf = canvas_rf.getContext("2d");
var ctx_spk = canvas_spk.getContext("2d");
var ctx_img = canvas_img.getContext("2d");

var rf;

var tick;

function stopDemo() {
	window.cancelAnimationFrame(tick);
}

function demo() {
	console.log('run');
	demoDraw();
	demoLogic();
	tick = window.requestAnimationFrame(demo);
}

function demoDraw() {
	draw_rf();
}

function draw_rf() {
	for (var x =0; x<7;x++) {
		for (var y = 0; y < 7;y++) {
			ctx_rf.fillStyle = gsc2hex(rf[x][y]);
			ctx_rf.fillRect(x*25,y*25,x*25+25,y*25+25);
		}
	}
}

function demoLogic() {

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
	var block = document.getElementById("block"+i);
	while(block) {
		block.style.display="none";
		i++;
		block = document.getElementById("block"+i);
	}
	run(curBlock);
	init_rf();
}

launch();



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

function getCursorPosition(canvas, event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    console.log("x: " + x + " y: " + y);
}
