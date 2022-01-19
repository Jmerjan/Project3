
var initialDes = '2012 VS76'

async function createdropdown(descriptor) {
  const response = await fetch ("/summary")
  const data = await response.json()
  console.log(data)

  function desFinder(dictionary) {
    return dictionary.des == descriptor;
    }

  // creating dropdown menu
  var dropdown = document.getElementById("selDataset"); 

  //create a for loop to get all the ids for dropdown
  for(var i = 0; i < data.length; i++) {
      // var id_demographics=names[id];
      var des = data[i].des;
      var info = document.createElement("option");
      info.textContent = des;
      info.value = des;
      dropdown.appendChild(info);
      // console.log(info)
      // console.log(id_demographics)
  }

  // panel dropdown info
  var metadataPanel = document.getElementById("sample-metadata")
  metadataPanel.innerHTML = ""

  var result = data.filter(desFinder)

for (let [key, value] of Object.entries(result[0])) {
  // metadataPanel.append(`${key.toUpperCase()}: ${value}</h6>`)
  var header = document.createElement("h6");
  header.textContent = `${key.toUpperCase()}: ${value}`
  metadataPanel.append(header)
}
} 

// https://plotly.com/python/

createdropdown(initialDes);

// Chart 1 // Stacked plot of distance/velocity (y axis) over time (x axis)

async function stackedplot(descriptor) {
  const response = await fetch ("/stackedplot");
  const caddata = await response.json();
  console.log(caddata)
      
  function desFinder(dictionary) {
    return dictionary.des == descriptor;
    }

  // Initialize an empty array for the sample's data
  let filteredDes = caddata.filter(desFinder);

  console.log(filteredDes)

  var cdArray = [];
  var velArray = [];
  var distArray = [];

  for (var i = 0; i < filteredDes.length; i++) {
    cdArray.push(filteredDes[i].cd)
    velArray.push(filteredDes[i].v_rel)
    distArray.push(filteredDes[i].dist)
  }

  console.log(cdArray, velArray, distArray)

  var distancetrace = {
    type: 'scatter',
    x: cdArray,
    y: distArray
    // text: hovertext,
    // orientation: 'h'
  }

  var velocitytrace = {
    type: 'scatter',
    x: cdArray,
    y: velArray
    // text: hovertext,
    // orientation: 'h'
  }

  var scatterdata = [velocitytrace, distancetrace]
  var layout = {
      title: 'Velocity, Distance vs Date',
      grid: {
        rows:2,
        column:1,
        pattern: "independent",
        //roworder
      },
      
      yaxis: {
        autorange: true,
      },
      xaxis: {
        autorange: true,
      },
    };

  Plotly.newPlot("scatter", scatterdata, layout);
}

stackedplot(initialDes);

async function bubblechart(descriptor) {
// Chart 2 // Bubble Chart (maybe 3-d) size, distance, 
//energy level, diameter to dictate size

  const response = await fetch ('/summary');
  const summarydata = await response.json();
  console.log(summarydata)

  function desFinder(dictionary) {
    return dictionary.des == descriptor;
    }
  
  var diameterArray = [];
  var massArray = [];
  var energyArray = [];
  var desArray = [];
  var ipArray = [];

  for (var i = 0; i < summarydata.length; i++) {
    diameterArray.push(summarydata[i].diameter)
    massArray.push(summarydata[i].mass)
    energyArray.push(summarydata[i].energy)
    desArray.push(summarydata[i].des)
    ipArray.push(summarydata[i].ip)
  }

  console.log(diameterArray, massArray, energyArray, desArray, ipArray)

  var bubbletrace = {
    mode: 'markers',
    marker: { 
      size: diameterArray,
      color: ipArray
      //hovertext: //tbd

    },
    x: massArray,
    y: energyArray
    //
    // text: hovertext,
    // orientation: 'h'
  }

  //come back to do var bubblelayout

  var bubbledata = [bubbletrace];

  Plotly.newPlot("bubble", bubbledata);

// Gauge chart for Torino scale //

var gaugedata = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: summarydata.filter(desFinder).ip,
    title: { text: "Predictd Probability of Impact" },
    type: "indicator",
    mode: "gauge+number+delta",
    delta: { reference: 380 },
    gauge: {
      axis: { range: [null, 1] },
      steps: [
        { range: [0, 250], color: "lightgray" },
        { range: [250, 400], color: "gray" }
      ],
      threshold: {
        line: { color: "red", width: 4 },
        thickness: 0.75,
        value: 490
      }
    }
  }
];

var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };

Plotly.newPlot('gauge', gaugedata, layout);

}

bubblechart(initialDes);



async function fbMap() {
  
// Perform a GET request to the query URL/
const response = await fetch ("/fireball")
const data = await response.json()

  // Creating the map object
  const myMap = L.map("map", {
    center: [37.09024, -95.712891],
    zoom: 3.5
    // layers: [streetMap, quakeMarkers]
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap); 
  

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
  for(let i = 0; i < data.length; i++ ) {
      let fireballs = data[i];
      // let location = quake.properties.place;
      let date = new Date(fireballs.date);
      let lat = fireballs.latitude
      let lon = fireballs.longitude
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

// fbMap();


document.querySelector("#selDataset").addEventListener("change", event => {
  // Create a custom function to return a specific id's data
  // function changedDes(dictionary) {
  // return dictionary.des == event.target.value;
  // }    
    
  // // Initialize an empty array for the sample's data
  // let filteredSummary = data.samples.filter(changedDes);
  // let filteredCad = data.metadata.filter(changedDes);
  // let filteredData =
  // console.log(filteredMetadata)
  // console.log(filteredIDData)

  //Gauge, Velocity/Distance, Metadata, Table
  createdropdown(event.target.value);
  stackedplot(event.target.value);
  bubblechart(event.target.value);

});
// main();
