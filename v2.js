
// When the user clicks anywhere on the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal || event.target == modal_content) {
//     	hide();
//     }
// }

function over(n) {
	flicker(n);
	document.getElementById("circ"+n).style.opacity = "0";
}

function out(n) {
	clearTimeout(ticks[n]);
	elems[n].style.opacity = "1";
}

var modals = [];
var areas = [cAbout,cCohcon,cLibet,cFBSear,cLearn,cSelfies];
var ticks = [-1,-1,-1,-1,-1,-1];
var opacity = [true,true,true,true,true,true];
var elems = [];

// Callbacks

function area(n) {
	areas[n]();
}

var cM_about = document.getElementById("cM_about");

function cAbout(show) {
	console.log('aboot');
	if (show) {
		cM_about.style.display="block";
	} else {
		cM_about.style.display="";
	}
}

function cCohcon() {

}

function cLibet() {

}

function cFBSear() {

}

function cLearn() {

}

function cSelfies() {

}

function flicker(n) {
	opacity[n] = !opacity[n];
	elems[n].style.opacity = "" + Number(opacity[n]);
	ticks[n] = setTimeout(function() {flicker(n);},150);
}

function init() {
	for (var i=1;i<=6;i++) {
		elems[i] = document.getElementById("circ"+i);
		modals[i] = document.getElementById("modal"+i);
	}
}

window.onload = init;