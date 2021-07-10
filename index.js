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

let fuelLevel = 50_000;
let cargoHold = ['meal kits', 'space suits', 'first-aid kit', 'satellite', 'gold', 'water', 'AE-35 unit'];

console.log("Fuel level: " + checkFuel(fuelLevel));
console.log("Hold status: " + holdStatus(cargoHold));

//

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
const chalk = require('chalk');

let excessFuelFound = inspectFuelLevels(fuelLevel);
console.log(chalk.black.bold.bgYellowBright("\n\nEmergency LCSA [Launch Code Space Administration] Inspection."));
if (excessFuelFound === fuelLevel) {
  // console.log("good here");
  console.log(chalk.greenBright("\nShuttle Fuel at Appropriate LCSA Standards.\n"))
} else {
  console.log(chalk.underline.red(`\nExcess Fuel Detected in the Main Tank!`));
  console.log(`Correcting proper fuel amounts to LCSA standards...\n`);
}

// Finds the proper amounts of fuel per tank
let fuelAmountsToStore = storeExcessFuel(fuelLevel, excessFuelFound);
// Updates fuel tanks with agency standard fuel quantity
updateFuelTanks(fuelTanks, fuelAmountsToStore);

// console.log(fuelTanks); // LCSA Oversight Console (uncomment if authorized)



let containmentCrate = [];
let scanForContaminants = function (item) {
  if (item.includes("stealth")) {
    containmentCrate.push(item);
    return "contamination found!";
  } else if (item.includes("gun")){
    containmentCrate.push(item);
    return "contamination found!";
  }
}
let cargoArray = ["rail", "torpedoes", "black comp", "medical supplies"];
// let cargoArray = ["railguns", "torpedoes", "black composite stealthTech", "medical supplies"];



/*
  Next section, 
  Create new Title for Scanning Cargo Hold 
  if contamination found, run xray prompts
  else "Cargo Hold is displaying levels of ___ at LCSA levels"
            ^^^ needs some work


*/







console.log(chalk.underline.red(`Corruption Detected in Cargo Hold!`));
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
  // console.log(chalk.red(`(${contaminationCount}) Contaminations Found!`));
};

inspectCargo(cargoArray);
// console.log(cargoArray);
// console.log(containmentCrate);


console.log(chalk.black.bold.bgGreenBright(`Inspection Complete.`));