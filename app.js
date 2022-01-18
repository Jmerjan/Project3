
async function main(){
const response = /////////
const data = await response.json()
console.log(data)

// creating dropdown menu
var dropdown= document.getElementById("selDataset"); //make sure variable in html is same

//create a for loop to get all the ids for dropdown
for(var id = 0; id < names.length; id++) {
    var id_demographics=names[id];
    var info= document.createElement("option");
    info.textContent=id_demographics;
    info.value=id_demographics;
    dropdown.appendChild(info);
    // console.log(info)
    // console.log(id_demographics)
}
// panel dropdown info
var PANEL=document.getElementById("sample-metadata")
PANEL.innerHTML=""

for(let [key, value] of Object.entries(result)){
  console.log(`${key.toUpperCase()}: ${value}`);
  PANEL.append(`${key.toUpperCase()}: ${value} \n`)
}

// https://plotly.com/python/

// Chart 1 // Stacked plot of distance/velocity (y axis) over time (x axis)


// Chart 2 // Bubble Chart (maybe 3-d) size, distance, energy level, diameter to dictate size

// Chart 3 // Torino scale for danger

// Fireball chart / map which places markers where fireballs have reached the atmosphere




}