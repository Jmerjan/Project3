
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
      var des = data[i].des;
      var info = document.createElement("option");
      info.textContent = des;
      info.value = des;
      dropdown.appendChild(info);
  }

  var result = data.filter(desFinder)

  var rowHead = document.createElement("tr");
  var rowValue = document.createElement("tr");

  for (let key of Object.keys(result[0])) {
    var tHead = document.createElement("th");
    tHead.textContent = key;
    rowHead.append(tHead)
  }

  for (let value of Object.values(result[0])) {
  var td = document.createElement("td");
  td.textContent = value;
  rowValue.append(td)
  }

  const metaDataTable = document.querySelector("#metadatatable");
  metaDataTable.innerHTML = "";
  metaDataTable.append(rowHead)
  metaDataTable.append(rowValue)
} 

createdropdown(initialDes);

// Chart 1 // Stacked plot of distance/velocity (y axis) over time (x axis)

async function stackedplot(descriptor) {
  const response = await fetch ("/Cad");
  const caddata = await response.json();
  console.log(caddata)
      
  function desFinder(dictionary) {
    return dictionary.des == descriptor;
    }

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

// Chart 2 // Bubble Chart size, distance, 
//energy level, diameter to dictate size

async function bubblechart(descriptor) {

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

async function sentryTable(descriptor) {

  const response = await fetch ("/sentry")
  const data = await response.json()

  function desFinder(dictionary) {
    return dictionary.des == descriptor;
    }

  var sentryData = data.filter(desFinder)
  console.log(sentryData)

  const sentryTable = document.querySelector("#sentrydata");
  sentryTable.innerHTML = "";
  var rowHead = document.createElement("tr");

  for (let key of Object.keys(sentryData[0])) {
    var tHead = document.createElement("th");
    tHead.textContent = key;
    rowHead.append(tHead)
  }

  sentryTable.append(rowHead)

  for (let i = 0; i < sentryData.length; i++) {
    var rowValue = document.createElement("tr");
    for (let value of Object.values(sentryData[i])) {
      // var rowValue = document.createElement("tr");
      var td = document.createElement("td");
      td.textContent = value;
      rowValue.append(td)
    }
    sentryTable.append(rowValue)
  }
  } 

sentryTable(initialDes);

document.querySelector("#selDataset").addEventListener("change", event => {
  //Gauge, Velocity/Distance, Metadata, Table
  createdropdown(event.target.value);
  stackedplot(event.target.value);
  bubblechart(event.target.value);
  sentryTable(event.target.value);
});
