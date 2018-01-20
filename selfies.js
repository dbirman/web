
mapboxgl.accessToken = 'pk.eyJ1IjoiZGFuYmlybWFuOTk4IiwiYSI6ImNqNzl5YjhyeTA4ejYycXAzbTc4ZTFucjQifQ.o3KPRP5zwv01xg1WskZVRg';
var map = new mapboxgl.Map({
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

function getData() {
    var coordsX = info.coordsX,
        coordsY = info.coordsY,
        imgs = info.imgs,
        names = info.names;

    var data = {};
    data.type = "FeatureCollection";
    data.features = [];

    for (var i=0;i<imgs.length;i++) {
        var feature = {};
        feature.type = "Feature";
        feature.properties = {};
        feature.properties.description = '<img class="popup-img" width="200vw" src="./images/ss/'+imgs[i]+'.jpg"/><h1 style="color:black;text-align:center;font-size:2.5vh">'+names[i]+'</h1>';
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