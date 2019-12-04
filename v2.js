
// When the user clicks anywhere on the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal || event.target == modal_content) {
//     	hide();
//     }
// }

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) { closeCheck(event); }
window.ontouchstart = function(event) {closeCheck(event); }

function closeCheck(event) {
	target = event.target;
	if ((event.target.className == "close") || (event.target.className== "modal-content-big")) {
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

let areaVisible = false;

// The areas are:
// 1  2  3   4  5  
//  6 = climbing
// 

function showArea(n) {
	areaVisible = true;

	hideHint();
	areas[n-1].style.display="block";
	document.getElementById("svg").className = "svg-container blur";

	if (n==6) {
		window.dispatchEvent(new Event('resize'));
		checkLayersLoaded();
	}
}

var loaded = false;

function flicker(n) {
	if (elems[n]==undefined) {return;}
	opacity[n] = !opacity[n];
	elems[n].style.opacity = "" + Number(opacity[n]);
	ticks[n] = setTimeout(function() {flicker(n);},150);
}

var hintTick;

function showHint() {
	try {
		localStorage.hinted = true;
	} catch (e) {
		console.log('Local storage was blocked -- defaulting to session');
		sessionStorage.hinted = true;
	}
	if (!areaVisible) {
		document.getElementById("hint").style.opacity = "1";
	}
}

function hideHint() {
	document.getElementById("hint").style.opacity = "0";
}

var hintTime = 10000;

var layersLoaded = false;
function checkLayersLoaded() {
	if (!layersLoaded) {

    // Add a layer showing the places.
    var layer = {
    	"source": {},
    	"layout": {
    		"icon-image": "{icon}-15",
    		"icon-allow-overlap": true
    	}
    };
    layer.id = "places";
    layer.type = "symbol";
    layer.source = {};
    layer.source.type = "geojson";
    layer.source.data = getData();
    layer["layout"] = {
    	"icon-image": "{icon}-15",
    	"icon-allow-overlap": true
    }
    // layer.layout['icon-image'] = "{icon}-15";
    // layer.layout['icon-allow-overlap'] = false;

    map.addLayer(layer);

    // Create a popup, but don't add it to the map yet.
    var popup = new mapboxgl.Popup({
    	closeButton: false,
    	closeOnClick: false
    });

    map.on('mouseenter', 'places', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'default';

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(e.features[0].geometry.coordinates)
        .setHTML(e.features[0].properties.description)
        .addTo(map);
    });

    map.on('mouseleave', 'places', function() {
    	map.getCanvas().style.cursor = '';
    	popup.remove();
  	});
	}
}

function init() {

	try {
		if (localStorage.hinted==undefined) {
			hintTick = setTimeout(showHint,hintTime);
		}
	} catch (e) {
		if (sessionStorage.hinted==undefined) {
			hintTick = setTimeout(showHint,hintTime);
		}
		console.log('Local storage was blocked');
	}
	for (var i=1;i<=6;i++) {
		elems[i] = document.getElementById("circ"+i);
		modals[i] = document.getElementById("modal"+i);
		document.getElementById(""+i).style.cursor = "pointer";
	}
	mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuYmlybWFuOTk4IiwiYSI6ImNqNzl5YjhyeTA4ejYycXAzbTc4ZTFucjQifQ.o3KPRP5zwv01xg1WskZVRg';

	map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/outdoors-v10?optimize=true',
		center: [-98.5795, 39.8283],
		zoom: 1
	});

	// map.on('load', function() {

	// });
}

window.onload = init;

var map;

function getData() {
	var coordsX = info.coordsX,
	coordsY = info.coordsY,
	imgs = info.imgs,
	names = info.names;
	alts = info.alt;

	var data = {};
	data.type = "FeatureCollection";
	data.features = [];

	for (var i=0;i<imgs.length;i++) {
		var feature = {};
		feature.type = "Feature";
		feature.properties = {};
		feature.properties.description = '<img class="popup-img" width="200vw" src="./images/ss/'+imgs[i]+'.jpg" alt="'+alts[i]+'"/><h1 style="color:black;text-align:center;font-size:2.5vh">'+names[i]+'</h1>';
		feature.properties.icon = "mountain";
		feature.geometry = {};
		feature.geometry.type = "Point";
		feature.geometry.coordinates = [coordsX[i],coordsY[i]];
		if (!(coordsX[i]==undefined)) {
			data.features.push(feature);
		}
	}
	return data;
}

[].forEach.call(document.querySelectorAll('img[data-src]'),    function(img) {
  img.setAttribute('src', img.getAttribute('data-src'));
  img.onload = function() {
    img.removeAttribute('data-src');
  };
});

// 1: 1.1191 66.9272
// 2: 358.5762 89.5557
// 3: 318.4414 24.833
// 4: 113.769 9.1948
// 5: 90 221.8154
// 6: 367.2197 225.1553

// Original x/y positions for text, these are based on a wide screen format (i.e. about Dan goes off the left side of the brain, etc)
let wideSVGx = [30, 358.6, 318.4, 113.8, 90, 367.2],
	wideSVGy = [40, 89.6, 24.8, 9.2, 221.8, 225.2];

// New x/y positions for when the screen is vertical, like on mobile
let vertSVGx = [70, 310, 250, 113.8, 90, 300],
	vertSVGy = [40, 50, 0, -10, 221.8, 260];

let wideOffx = [50,0,0,50,50,-10],
	vertOffx = [20,20,30,50,50,20];

let diffSVGx = [], diffSVGy = [], diffOffx = [];

for (var i=0;i<6;i++) {
	diffSVGx[i] = wideSVGx[i]-vertSVGx[i];
	diffSVGy[i] = wideSVGy[i]-vertSVGy[i];
	diffOffx[i] = wideOffx[i] - vertOffx[i];
}

let origSVGx = 0,
	origSVGwidth = 443,
	dSVGx = 60,
	dSVGwidth = -143;

function moveSVGPos() {
	// get the width and height
	let w = window.innerWidth,
		h = window.innerHeight;
	// if width is greater, just go with a ratio of 1
	let ratio =0;
	if (w>1.25*h) {
		ratio = 1;
	} else if (w < h) {
		ratio = 0;
	} else {
		let d = w-h;
		ratio = d / (0.25*h);
	}

	for (var i=1;i<=6;i++) {
		baseX = vertSVGx[i-1] + ratio*diffSVGx[i-1];
		baseY = vertSVGy[i-1] + ratio*diffSVGy[i-1];
		offX = vertOffx[i-1] + ratio*diffOffx[i-1];

		setTextId(i,baseX,baseY);
		setCircId(i,baseX+20,baseY+7);
		setLvId(i,baseX+offX,baseY+7);

		setLhId(i,baseX+offX,baseX+20,baseY+7);
	}

	document.getElementById("svgsvg").viewBox.baseVal.width = origSVGwidth + (1-ratio) * dSVGwidth;
	document.getElementById("svgsvg").viewBox.baseVal.x = origSVGx + (1-ratio) * dSVGx;
}

function setTextId(id,x,y) {
	let mat = document.getElementById("text"+id).transform.baseVal.getItem(0).matrix;
	mat.e = x;
	mat.f = y;
}

function setCircId(id,x,y) {
	document.getElementById("circ"+id).setAttribute("cx",x);
	document.getElementById("circ"+id).setAttribute("cy",y);
}

function setLvId(id,x,y) {
	document.getElementById("l"+id+"v").setAttribute("x2",x);
	document.getElementById("l"+id+"v").setAttribute("y2",y);
	// document.getElementById("l"+id+"v").back();
}
function setLhId(id,x1,x2,y) {
	document.getElementById("l"+id+"h").setAttribute("x1",x1);
	document.getElementById("l"+id+"h").setAttribute("x2",x2);
	document.getElementById("l"+id+"h").setAttribute("y1",y);
	document.getElementById("l"+id+"h").setAttribute("y2",y);
}

// Move SVG text positions
moveSVGPos();
window.addEventListener("resize",moveSVGPos);