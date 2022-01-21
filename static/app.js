
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
  const response = await fetch ("/Cad");
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

  var kmDistArray = distArray.map(dist => dist * 1.496e8)

  var distancetrace = {
    x: cdArray,
    y: kmDistArray,
    type: 'scatter',
    name: 'Distance from Earth'
  };

  var velocitytrace = {
    x: cdArray,
    y: velArray,
    xaxis: 'x2',
    yaxis: 'y2',
    type: 'scatter',
    name: 'Velocity with respect to Earth'
  };

  var scatterdata = [distancetrace, velocitytrace];

  var layout = {
      title: 'Distance, Velocity vs Date',
      grid: {
        rows: 2,
        columns: 1,
        pattern: "independent",
        roworder: "bottom to top",
      },
      
      xaxis: {
        autorange: true,
        title: {
          text: 'Date',
        }
      },

      xaxis2: {
        visible: false,
      },

      yaxis: {
        autorange: true,
        title: {
          text: 'Distance (km)',
        }
      },

      yaxis2: {
        autorange: true,
        title: {
          text: 'Velocity (km/s)',
        }
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

  var textArray = [];
  for (var i = 0; i < diameterArray.length; i++) {
    var objectText = `Object: ${diameterArray[i]} <br>Mass (kg): ${massArray[i]} <br>Diameter (km): ${diameterArray[i]} <br>Energy (MT): ${energyArray[i]} <br>Probability: ${ipArray[i]}`
    textArray.push(objectText)
  }

  console.log(diameterArray, massArray, energyArray, desArray, ipArray)
  // units mass - kg, energy = mt Megatons of TNT, diameter = km, 16 kilotons Hiroshima bomb, 16 kilotons .016 MT
  var bubbletrace = {
    mode: 'markers',
    text: textArray,
    marker: { 
      size: diameterArray.map(di => di*1000),
      color: ipArray,
    },
    x: massArray,
    y: energyArray
  }

  var mappedIpArray = ipArray.map(prob => parseInt(prob))
  console.log(mappedIpArray)
  console.log(Math.max(parseInt(mappedIpArray)))
  var bubblelayout = {
    title: 'Object Energy vs Mass',
    shapes: [
    {
        type: 'line',
        xref: 'paper',
        x0: 0,
        y0: .016,
        x1: 1,
        y1: .016,
        line:{
            color: 'rgb(255, 0, 0)',
            width: 2,
            dash:'dot'
        }
    }
    ],
    xaxis: {
      title: {
        text: 'Mass (kg)',
      }
    },
    yaxis: {
      title: {
        text: 'Energy (MT, Megatons of TNT)',
      }
    },

    annotations: [
      {
        x: 8e7,
        y: .016,
        xref: 'x',
        yref: 'y',
        text: 'Power of Hiroshima Bomb: 16 KT',
        showarrow: true,
        arrowhead: 3,
        ax: 0,
        ay: -40
      }
    ]
}

  var bubbledata = [bubbletrace];

  Plotly.newPlot("bubble", bubbledata, bubblelayout);

// Gauge chart for Torino scale //

var gaugedata = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    value: summarydata.filter(desFinder)[0].ip,
    title: { text: "Predicted Probability of Impact" },
    type: "indicator",
    mode: "gauge+number+delta",
    delta: { reference: 1 },
    gauge: {
      axis: { range: [null, 5e-5] },
      threshold: {
        'line': {'color': "red", 'width': 4},
        'thickness': 0.75,
        'value': 5e-5}
    }
  }
];

var layout = { width: 450, height: 450, margin: { t: 0, b: 0 } };

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
  

  // var fbIcon = L.icon({
  //     iconUrl: 'images/fireball.png',
  //     // shadowUrl: 'leaf-shadow.png',
  //     iconSize:     [38, 95], // size of the icon
  //     // shadowSize:   [50, 64], // size of the shadow
  //     iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
  //     // shadowAnchor: [4, 62],  // the same for the shadow
  //     popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
  // });

  const fbMarkers = [];
  //iterate through data to grab details
  for(let i = 0; i < data.length; i++ ) {
      let fireballs = data[i];
      // let location = quake.properties.place;
      let date = new Date(fireballs.date);
      let latitude = fireballs.latitude
      let longitude = fireballs.longitude
      // define the markers
      let fbMarker = L.circleMarker([latitude, longitude], {
      colorOpacity:1,
      color: "black",
      weight: 1,   
      fillOpacity: 1,
      // fillColor: color, 
      radius: 5
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

fbMap();


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
