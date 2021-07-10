const chalk = require('chalk');

// 11.10.1. Practice Your Skills/////////////////
/*
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
*/
//////////////////////////////////////////////////
/// PART 2 ///////////Raid a Shuttle//////////////

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

//------ ADJUST THESE VARIABLES FOR PROGRAM TESTING ------///
let fuelLevel = 200_000;
// Uncomment for a "safer" inspection & comment out cargoArray
// let cargoArray = ['meal kits', 'space suits', 'first-aid kit', 'satellite', 'gold', 'water', 'AE-35 unit'];
let cargoArray = ["railguns", "torpedoes", "black composite stealthTech", "medical supplies", "meal kits", "space suits", "first-aid kit"];

console.log("Fuel level: " + checkFuel(fuelLevel));
console.log("Hold status: " + holdStatus(cargoArray));

/////// FUEL TANK INSPECTION ////////
///
let fuelTanks = {
  "main": 1,
  "reserveTank": 2
}

let inspectFuelLevels = function (fuelLevel) {
  if (checkFuel(fuelLevel) === "green") {
    return fuelLevel - 100_001;
  } else if (checkFuel(fuelLevel) === "yellow") {
    return fuelLevel - 50_001;
  } else {
    return fuelLevel;
  }
};

function storeExcessFuel (fuelLevel, excessFuel) {
  let reserveTank = excessFuel;
  let adjustedFuelTank = fuelLevel - excessFuel;
  return [adjustedFuelTank, reserveTank];
}

function updateFuelTanks (fuelTanks, fuelAmountsToStore) {
  let i = 0;
  for (tank in fuelTanks) {
    fuelTanks[tank] = fuelAmountsToStore[i];
    i++;
  }
}



console.log(chalk.black.bold.bgYellowBright("\n\nEmergency LCSA [Launch Code Space Administration] Inspection.\n"));
console.log(chalk.underline.yellowBright(`Scanning for Safe Fuel Levels.`));

let excessFuelFound = inspectFuelLevels(fuelLevel);
if (excessFuelFound === fuelLevel) {
  // console.log("good here");
  console.log(chalk.greenBright("\nShuttle Fuel at Appropriate LCSA Standards.\n"))
  excessFuelFound = 0; 
} else {
  console.log(chalk.underline.red(`\nExcess Fuel Detected in the Main Tank!`));
  console.log(`Correcting proper fuel amounts to LCSA regulation levels...\n`);
}

// Finds the proper amounts of fuel per tank //
let fuelAmountsToStore = storeExcessFuel(fuelLevel, excessFuelFound);

// Updates fuel tanks with agency standard fuel quantity //
updateFuelTanks(fuelTanks, fuelAmountsToStore);


////////////////////////////////
/////// CARGO HOLD INSPECTION 

let containmentCrate = []; // for "saving" items
let scanForContaminants = function (item) {
  if (item.includes("stealth")) {
    containmentCrate.push(item);
    return "contamination found!";
  } else if (item.includes("gun")){
    containmentCrate.push(item);
    return "contamination found!";
  }
}

let inspectCargo = function (cargoArray) {
  let contaminationCount = 0;
  for (let i = 0; i < cargoArray.length; i++){
    item = cargoArray[i];
    if (scanForContaminants(item) === "contamination found!") {
      console.log(chalk.red(`Contamination Found!`));
      console.log(`Isolating \(${item}\) for Decontamination...`);
      console.log(`Decontamination complete! Returning ${item} into cargo hold.\n`);
      contaminationCount++;
      cargoArray.splice(cargoArray.indexOf(cargoArray[i]), 1, item+"-ish looking item");
    }
  }
  return contaminationCount;
};


console.log(chalk.underline.yellowBright(`Scanning for Contamination in the Cargo Hold.`));
let contaminationReport = inspectCargo(cargoArray);
if (contaminationReport === 0) {
  console.log(chalk.greenBright(`\nCargo Hold is within LCSA Regulation Standards.\n`));
}

// console.log(cargoArray);
// console.log(containmentCrate);


console.log(chalk.black.bold.bgGreenBright(`Inspection Complete.\n`));
// console.log(containmentCrate);
console.log("Fuel level: " + checkFuel(fuelLevel));
console.log("Hold status: " + holdStatus(cargoArray));

// LCSA Oversight Console (uncomment next comment if authorized)
console.log(irs(fuelTanks["reserveTank"], containmentCrate));

function irs (takenFuel, weaponsHaul) {
  if ((weaponsHaul.length === 0) || (takenFuel === 0)) {
    return "Mission failed.";
  } else {
    return chalk.blueBright(`\nRaided ${takenFuel}kg of fuel from the tanks, and stole \(${weaponsHaul[0]}\) and \(${weaponsHaul[1]}\) from the cargo hold.\n\n Mission Accomplished.`);
  }
  
}
