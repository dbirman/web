
// When the user clicks anywhere on the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal || event.target == modal_content) {
//     	hide();
//     }
// }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target.className == "close") {
    	// chain parentElements until you find the modal
    	var parent = event.target.parentElement;
    	while (parent.className!="modal") {
    		parent = parent.parentElement;
    	}
        parent.style.display = "none";
    }
    if (event.target.className == "modal") {
        event.target.style.display = "none";
    }
}


function over(n) {
	flicker(n);
	document.getElementById("circ"+n).style.opacity = "0";
}

function out(n) {
	clearTimeout(ticks[n]);
	elems[n].style.opacity = "1";
}

var modals = [];
var cAbout = document.getElementById("cM_about"),
	cCohcon = document.getElementById("cM_cohcon"),
	cLibet = document.getElementById("cM_libet"), 
	cFBSear = document.getElementById("cM_fbsear"), 
	cLearn = document.getElementById("cM_learn"), 
	cSelfies = document.getElementById("cM_selfies");
var areas = [cAbout,cCohcon,cFBSear,cLibet,cLearn,cSelfies];
var ticks = [-1,-1,-1,-1,-1,-1];
var opacity = [true,true,true,true,true,true];
var elems = [];

// Callbacks

function showArea(n) {
	areas[n-1].style.display="block";

	if (n==6) {
		window.dispatchEvent(new Event('resize'));
	}
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
		document.getElementById(""+i).style.cursor = "pointer";
	}
}

window.onload = init;