const { readCSVFileSync } = require("../../../CSV/readCsvSync");
const fs=require('fs');

const calcMaxMin=(arr,symbol,func)=>{
// מערך שפלים ופסגות
const arrMaxMin = arr.reduce((acc, val, index) => {
      if (index !== 0 && index < arr.length - 1) {
          if (func(arr[index - 1]) > func(val) && func(arr[index + 1]) > func(val)) {
              return [...acc, { Date: val.Date, Value: func(val), Type: "Min" }];
          } else if (func(arr[index - 1]) < func(val) && func(arr[index + 1]) < func(val)) {
              return [...acc, { Date: val.Date, Value: func(val), Type: "Max" }];
          }
      }
      return acc;
  }, []);
  

// שפלים
const minPoints=arrMaxMin.filter(val=>val.Type=="Min")

// פסגות
const maxPoints=arrMaxMin.filter(val=>val.Type=="Max")
   


//יצירת תיקיה לכל מניה
let directory=fs.mkdirSync(symbol);

// יצירת קובץ שפלים
let minJsonFile=fs.writeFileSync(`${symbol}/min.json`,
JSON.stringify(minPoints));

// יצירת קובץ פסגות
let maxJsonFile=fs.writeFileSync(`${symbol}/max.json`,
JSON.stringify(maxPoints));
return arrMaxMin;
}

let symbol='A'
let arr=readCSVFileSync(`../${symbol}.csv`);
console.log(calcMaxMin(arr,symbol,a=>a.Close));





