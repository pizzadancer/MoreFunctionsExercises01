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

// DECLARATIONS
let containmentCrate = []; // for "saving" items

let fuelTanks = {
  "main": 1,
  "reserveTank": 2
}

//------ ADJUST THESE VARIABLES FOR PROGRAM TESTING ------///
let fuelLevel = 200_000;
// Uncomment for a "safer" inspection & comment out second cargoArray
// let cargoArray = ['meal kits', 'space suits', 'first-aid kit', 'satellite', 'gold', 'water', 'AE-35 unit'];
let cargoArray = ["railguns", "torpedoes", "black composite stealthTech", "medical supplies", "meal kits", "space suits", "first-aid kit"];


// FUNCTIONS
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

let inspectFuelLevels = function (fuelLevel) {
  if (checkFuel(fuelLevel) === "green") {
    return fuelLevel - 100_001;
  } else if (checkFuel(fuelLevel) === "yellow") {
    return fuelLevel - 50_001;
  } else {
    return fuelLevel;
  }
};

function storeFuel (fuelLevel, excessFuel) {
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

console.log("Fuel level: " + checkFuel(fuelLevel));
console.log("Hold status: " + holdStatus(cargoArray));
updateFuelTanks(fuelTanks, [fuelLevel, 0]);


//// PROGRAM START ////
console.log(chalk.black.bold.bgYellowBright("\n\nEmergency LCSA [Launch Code Space Administration] Inspection.\n"));

/////// FUEL TANK INSPECTION ////////
// Fuel Inspection: Will check fuel levels to see if fuel levels are in a "safe" range for the ship to have in the main tank
// If: unsafe levels detected, store the excessFuel in the reserveTank
// else: inspection passed!
console.log(chalk.underline.yellowBright(`Scanning for Safe Fuel Levels.`));
console.log(fuelTanks);

let excessFuelAmount = inspectFuelLevels(fuelLevel);

// IF: fuelLevel is no different after the inspection as before.
if (excessFuelAmount === fuelLevel) {
  // console.log("good here");
  console.log(chalk.greenBright("\nShuttle Fuel at Appropriate LCSA Standards.\n"))
  excessFuelAmount = 0; 
} else {
  console.log(chalk.underline.red(`\nExcess Fuel Detected in the Main Tank!`));
  console.log(`Correcting proper fuel amounts to LCSA regulation levels...`);
}

// Finds the proper amounts of fuel per tank //
let fuelAmountsToStore = storeFuel(fuelLevel, excessFuelAmount);

// Updates fuel tanks with agency standard fuel quantity //
updateFuelTanks(fuelTanks, fuelAmountsToStore);
console.log(fuelTanks);


////////////////////////////////
/////// CARGO HOLD INSPECTION 
// Cargo Inspection: Will scan all items in cargo hold with Xrays, 
//  If: contamination found, quarantine item briefly for decontamination before returning it to the cargo hold "unchanged"
//  Else: inspection passed


console.log(chalk.underline.yellowBright(`\nScanning for Contamination in the Cargo Hold.`));
console.log(cargoArray);
let contaminationReport = inspectCargo(cargoArray);

// If there are no "contaminated" objects
if (contaminationReport === 0) {
  console.log(chalk.greenBright(`\nCargo Hold is within LCSA Regulation Standards.\n`));
}
console.log(cargoArray);
console.log(chalk.black.bold.bgGreenBright(`Inspection Complete.\n`));

// console.log(containmentCrate);
console.log("Fuel level: " + checkFuel(fuelLevel));
console.log("Hold status: " + holdStatus(cargoArray));



// LCSA Oversight Console 
// IRS: Catalogues the fuel and items that were examined through the inspections
console.log(irs(fuelTanks["reserveTank"], containmentCrate)); 

function irs (takenFuel, weaponsHaul) {
  console.log(chalk.underline.blueBright("\nPirate Report"));
  let stolen;
  if ((weaponsHaul.length === 0) && (takenFuel === 0)) {
    return chalk.red("\nNo loot from this trip.\nMission failed.");
  } else {
    if (weaponsHaul.length === 0) {
      stolen = "nothing";
    } else {
      stolen = `\(${weaponsHaul[0]}\) and \(${weaponsHaul[1]}\)`;
    }
    return chalk.blueBright(`\nRaided ${takenFuel} kg of fuel from the tanks, and stole ${stolen} from the cargo hold.\n\nMission Accomplished!`);
  }
  
}
