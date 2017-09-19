
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

// var coordsX = [-116.7627,       -116.7891,      -120.91,        -123.135,           -115.46322,         -71.1656,  -119.3192,   -115.46652,         -118.291,       -115.49249,             -115.46322, -115.48829,     -81.0473,     -121.5137,        -119.3992,      -119.4331,  -122.33692,             -120.71869,     -121.1979,                  -117.43131,             -119.5349,      10.932489,                       -115.48726,     -118.29229,             -118.30,           -116.785,       -74.179,                            -115.49045,             -119.4047,                      -116.14889,                         -121.82043,                 -121.759,                   -119.6363,                  -119.53364,                     -119.5449,              6.8643],
//     coordsY = [50.74667,        50.7455,        48.48,          49.6867,            36.03487,           44.06298,  37.9672,     36.03518,           36.59,          36.14396,               36.02487,  36.11213,        36.3916,      47.549,           37.8186,        37.86303,   41.17689,               47.52963,       36.4895,                    51.26301,               37.7442,        46.032358,                       36.16894,       36.57844,               36.57744,          50.7189,        41.74421,                           36.10256,               37.8717,                        34.04228,                           48.77969,                   46.85280,                   37.7165,                    37.72751,                        37.7432,               45.83270],
//     imgs = ['eastpost_spire',   'bugaboo_spire','goode',    'angels_crest',         'bourbon_street','cathedral','conness_west','dreamofturkeys','fishhook',        'frigid_air_buttress','frogland','ginger',      'great_arch',   'infinite_bliss','matthes7',    'medlicott',    'ogre',                 'outer_space',  'pinnacles',                'sir_donald',           'snake',        'transylvania',                 'tunnelvision','whitney_butt',       'whitney_face',        'pigeon_spire','gunks',                             'black_orpheus',        'fairview',                         'mental_physics',               'baker',                'rainier',                  'middlecathedral',              'libertycap',                    'reg_nw',           'mont_blanc'],
//     names = ['Eastpost Spire',  'Bugaboo Spire','Goode Mountain','Angel\'s Crest','Bourbon Street','Recompense','Mt Conness','Dream of Wild Turkeys','Fishook Arete','Frigid Air Buttress','Frogland','Ginger Cracks','Great Arch','Infinite Bliss','Matthes Crest','Medlicott Dome','Cosmic Wall, The Ogre','Outer Space','Burgundy Dome, Pinnacles NP','NW Ridge, Mt Sir Donald','Snake Dike','Transylvania, Monte Casale','Tunnel Vision','Mt Whitney, East Butt','Mt Whitney, East Face','Pigeon Spire, Bugaboos','High Exposure, Gunks','Black Orpheus, Red Rock','Fairview Dome, Tuolumne Meadows','Mental Physics, Lenticular Dome','Emmons Glacier, Mt Baker','Kautz Glacier, Rainier','East Buttress, Middle Cathedral','Southwest Face, Liberty Cap','Regular NW, Half Dome','Italian Route, Mont Blanc'];

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