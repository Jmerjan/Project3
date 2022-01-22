async function fbMap() {
  
    // Perform a GET request to the query URL/
      const response = await fetch("/fireball")
      const data = await response.json()
      console.log(data)
      
    
      var fbIcon = L.icon({
          iconUrl: "static/images/fireball_ccexpress.png",
          iconSize:     [70, 70], // size of the icon
          iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
          popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      });
    
      var fbMarkers = [];
      //iterate through data to grab details
      for (let i = 0; i < data.length; i++ ) {
          let fireballs = data[i];
          let date = new Date(fireballs.date);
          let latitude = fireballs.latitude;
          let longitude = fireballs.longitude;
          console.log(latitude, longitude);

          // define the markers
          let fbMarker = L.marker([latitude, longitude], {
          icon: fbIcon,
          })
          .bindPopup("<h5>" + "Lat: " + latitude + " Long: " + longitude + '<h5>' + '<hr>' +
          '<h6>' + 'Date: ' + date  + '<h6>');
    
          fbMarkers.push(fbMarker);
    
          }
    
      let fbLayer = L.layerGroup(fbMarkers);
    
      // adding tile layers
      let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      });
    
      var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });
      
        
      // creating tile group
      var baseMaps = {
        'Street Map': street,
        'Topography': topo
      }
    
      // creating layer group 
      var overlayMaps = {
        'Fireball': fbLayer
      };
    
        // Creating the map object
      var myMap = L.map("map", {
          center: [-2.613281, 10.914596],
          zoom: 2,
          layers: [street, fbLayer]
      });
      
      L.control.layers(baseMaps, overlayMaps, {
        collapsed: false
      }).addTo(myMap);   
    }
    
    fbMap();