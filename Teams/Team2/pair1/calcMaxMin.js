const { readCSVFileSync } = require("../../../CSV/readCsvSync");
const fs=require('fs');

let symbol='XTNT'

let arr=readCSVFileSync(`../${symbol}.csv`);
console.log(arr)
let mins=[];
let maxs=[];


// שפלים
for (let index = 1; index < arr.length-1; index++) {
   if(arr[index-1].close>arr[index].close&&
    arr[index+1].close>arr[index].close)

{
    mins.push(arr[index]);
}
}

// פסגות
for (let index = 1; index < arr.length-1; index++) {
    if(arr[index-1].close<arr[index].close&&
     arr[index+1].close<arr[index].close)
 
 {
     maxs.push(arr[index]);
 }
 }

//יצירת תיקיה לכל מניה
let directory=fs.mkdirSync(symbol);

// יצירת קובץ שפלים
let minJsonFile=fs.writeFileSync(`${symbol}/min.json`,
JSON.stringify(mins));

// יצירת קובץ פסגות
let maxJsonFile=fs.writeFileSync(`${symbol}/max.json`,
JSON.stringify(maxs));