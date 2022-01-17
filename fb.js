function fbMap() {

    // Creating the map object
    const myMap = L.map("map", {
      center: [37.09024, -95.712891],
      zoom: 3.5
      // layers: [streetMap, quakeMarkers]
    });
  
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap); 
    
    // Perform a GET request to the query URL/
    // const response = await fetch //("/summary route")//

    var fbIcon = L.icon({
        iconUrl: 'images/fireball.png',
        // shadowUrl: 'leaf-shadow.png',
        iconSize:     [38, 95], // size of the icon
        // shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        // shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });

    const fbMarkers = [];
    //iterate through data to grab details
    for(let i = 0; i < features.length; i++ ) {
        let fireballs = features[i];
        let location = quake.properties.place;
        let date= new Date(quake.properties.time);
        
        // define the markers
        let fbMarker = L.fbIcon([lat, lon], {
        colorOpacity:1,
        color: black,
        weight: 1,   
        fillOpacity: 1,
        // fillColor: color, 
        // radius: magnitude * 20000
        })
        .bindPopup("<H2>" + location + '<H2>' + '<hr>' +
        '<h4>' + 'Date: ' + date  + '<h4>');

        fbMarkers.push(fbMarker);

        }

        let fbLayer = L.layerGroup(fbMarkers);

        // adding tile layers
        let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        });
      
        let streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });
              
        // creating layer group 
        const overlayMaps = {
          'Fireball': fbLayer
        };
      
        // creating tile group
        const baseMaps = {
          'Street Map': streetMap,
          'Topography': topo
        }
       
        myMap.addLayer(fbLayer)
        myMap.addLayer(streetMap)
        
        L.control.layers(baseMaps, overlayMaps, {
          collapsed: false
        }).addTo(myMap);   



}

fbMap()