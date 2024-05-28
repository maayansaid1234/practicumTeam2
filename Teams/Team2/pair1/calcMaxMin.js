const {readCSVFileSync}=require("../../../CSV/readCSVSync")
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
  
let minPoints=[],maxPoints=[]
// שפלים
minPoints.push({ Date: arr[0].Date, Value: func(arr[0]), Type: "Min" })
minPoints.push(...(arrMaxMin.filter(val=>val.Type=="Min")))
minPoints.push({ Date: arr[arr.length-1].Date, Value: func(arr[arr.length-1]), Type: "Min" })

// פסגות
maxPoints.push({ Date: arr[0].Date, Value: func(arr[0]), Type: "Max" })
maxPoints.push(...(arrMaxMin.filter(val=>val.Type=="Max")))
maxPoints.push({ Date: arr[arr.length-1].Date, Value: func(arr[arr.length-1]), Type: "Max" })
   


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
module.exports=calcMaxMin;

let symbol='A'
let arr=readCSVFileSync(`../${symbol}.csv`);
console.log(calcMaxMin(arr,symbol,a=>a.Close));




