
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

function showArea(n) {
	hideHint();
	areas[n-1].style.display="block";

	if (n==6) {
		window.dispatchEvent(new Event('resize'));
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
	document.getElementById("hint").style.opacity = "1";
}

function hideHint() {
	document.getElementById("hint").style.opacity = "0";
}

var hintTime = 10000;

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
		style: 'mapbox://styles/mapbox/outdoors-v10',
		center: [-98.5795, 39.8283],
		zoom: 1
	});


	map.on('load', function() {

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
});

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