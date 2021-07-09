let veryAnon = function (n) {
  if (typeof n === "number"){
    return n * 3;
  } else if (typeof n === "string") {
    return "ARRR!";
  } else {
    return n;
  }
};
console.log(veryAnon(["a"]));

arr = ['Elocution', 21, 'Clean teeth', 100];
console.log(arr.map(veryAnon));


/// PART 2 ///
function checkFuel(level) {
  if (level > 100000){
    return 'green';
  } else if (level > 50000){
    return 'yellow';
  } else {
    return 'red';
  }
}

function holdStatus(arr){
  if (arr.length < 7) {
    return `Spaces available: ${7-arr.length}.`;
  } else if (arr.length > 7){
    return `Over capacity by ${arr.length-7} items.`;
  } else {
    return "Full";
  }
}

let fuelLevel = 200000;
let cargoHold = ['meal kits', 'space suits', 'first-aid kit', 'satellite', 'gold', 'water', 'AE-35 unit'];

console.log("Fuel level: " + checkFuel(fuelLevel));
console.log("Hold status: " + holdStatus(cargoHold));

//hack into the shuttle code and steal supplies.

function storeExcessFuel (excessFuel, fuelLevel) {
  return fuelLevel - excessFuel;
}

let getExcessFuel = function (fuelLevel) {
  greenLimit = 100_001;
  totalFueltoSave = fuelLevel - greenLimit;
  // console.log(totalFueltoSave);
  return totalFueltoSave;
};



let excessFuel = getExcessFuel(fuelLevel);


fuelLevel = storeExcessFuel(excessFuel, fuelLevel);
console.log(fuelLevel)

console.log(checkFuel(fuelLevel));