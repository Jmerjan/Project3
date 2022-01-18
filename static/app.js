
// async function main(){


// function createdropdown(){
// const response = fetch //("/summary route")//

// // creating dropdown menu
// var dropdown= document.getElementById("selDataset"); 
// //make sure variable in html is same

// //create a for loop to get all the ids for dropdown
// for(var id = 0; id < summary.des.length; id++) {
//     // var id_demographics=names[id];
//     var descriptor = summary.des[id];
//     var info= document.createElement("option");
//     info.textContent=descriptor;
//     info.value=descriptor;
//     dropdown.appendChild(info);
//     // console.log(info)
//     // console.log(id_demographics)
// }
// // panel dropdown info
// var PANEL=document.getElementById("sample-metadata")
// PANEL.innerHTML=""

// // get initial ID 
// var

// for (let [key, value] of Object.entries(result)){
//   console.log(`${key.toUpperCase()}: ${value}`);
//   PANEL.append(`${key.toUpperCase()}: ${value} \n`)
// }
// } 

// https://plotly.com/python/

// Chart 1 // Stacked plot of distance/velocity (y axis) over time (x axis)

async function stackedplot() {
  const response = await fetch ("/stackedplot");
  const caddata_response = await response.json();
  console.log(caddata_response)
  
//   var distancetrace= {
//     type: 'scatter',
//     //from CAD Data CD
//     x: 
//     // y = dist from CAD 
//     y: 
//     //
//     // text: hovertext,
//     // orientation: 'h'
// }
// var velocitytrace= {
//   type: 'scatter',
//   // from Cad Data CD
//   x: ,
//   // from CAD Data Route
//   y: ,
//   // text: hovertext,
//   // orientation: 'h'
// }

// var scatterdata= [velocitytrace, distancetrace]
// var layout = {
//     title: 'Top 10 OTUs',
//     grid: {
//       rows:2,
//       column:1,
//       pattern: "independent",
//       //roworder
//     },
    
//     yaxis: {
//       autorange: true,
//     },
//     xaxis: {
//       autorange: true,
//     },
//   };

//   Plotly.newPlot("scatter", scatterdata, layout);

}
stackedplot();
// function bubblechart(){
// // Chart 2 // Bubble Chart (maybe 3-d) size, distance, 
// //energy level, diameter to dictate size

// const response1= await fetch (//from summary);
// const summarydata = await response1.json();

// var bubbletrace= {
//   mode: 'markers',
//   marker: { 
//     size: //summary-->diameter,
//     color: //summary-->ip (probability of impact)
//     //hovertext: //tbd

//   }
//   //from Summary get mass for X axis 
//   x: 
//   // from Summary get energy
//   y: 
//   //
//   // text: hovertext,
//   // orientation: 'h'
// }

// //come back to do var bubblelayout

// var bubbledata= [bubbletrace];

// Plotly.newPlot("bubblle", bubbledata, layout);

//Gauge chart for Torino scale //

// var gaugedata = [
//   {
//     domain: { x: [0, 1], y: [0, 1] },
//     value: 450,
//     title: { text: "Speed" },
//     type: "indicator",
//     mode: "gauge+number+delta",
//     delta: { reference: 380 },
//     gauge: {
//       axis: { range: [null, 500] },
//       steps: [
//         { range: [0, 250], color: "lightgray" },
//         { range: [250, 400], color: "gray" }
//       ],
//       threshold: {
//         line: { color: "red", width: 4 },
//         thickness: 0.75,
//         value: 490
//       }
//     }
//   }
// ];

// var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
// Plotly.newPlot('myDiv', data, layout);
  

// }



function fireball(){
// Fireball chart / map which places markers where fireballs have reached the atmosphere

var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

var baseMaps = {
  "Street Map": street,
  "Topographic Map": topo
};

var overlayMaps= {
  Earthquakes: earthquakelayer
}
var myMap = L.map("map", {
  center: [
    37.09, -95.71
  ],
  zoom: 5,
  layers: [street, earthquakelayer]
});

L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(myMap);


}


// wait to do the option changed function
async function optionChanged(){
  //creating the selector variable for the dropdown
  var select = document.getElementById('selDataset');
  var value = select.options[select.selectedIndex].value;
  console.log(value); 
  createmetadata(value);
  createplots(value);
  
}
// } 

// main();
// connection to initial function