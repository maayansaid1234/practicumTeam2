const {readCSVFileSync}=require("../../../../CSV/readCSVSync")
const fs=require('fs');

const calcMin=(arr,func)=>{

const arrMin = arr.reduce((acc, val, index) => {
      if (index !== 0 && index < arr.length - 1)       
          if (func(arr[index - 1]) > func(val) && func(arr[index + 1]) > func(val))             
              return [...acc, { Date: val.Date, Value: func(val), Type: "Min" ,Index:index}];
    return acc; }, []);
    
 
let minPoints=[];
minPoints.push({ Date: arr[0].Date, Value: func(arr[0]), Type: "Min",Index:0})
minPoints.push(...arrMin)
minPoints.push({ Date: arr[arr.length-1].Date, Value: func(arr[arr.length-1]), Type: "Min",Index:arr.length-1 })

return minPoints;
}











const calcMax=(arr,func)=>
{
    // מערך שפלים ופסגות
    const arrMax = arr.reduce((acc, val, index) => {
          if (index !== 0 && index < arr.length - 1) 
              if (func(arr[index - 1]) < func(val) && func(arr[index + 1]) < func(val)) 
                  return [...acc, { Date: val.Date, Value: func(val), Type: "Max",Index:index }];
                 return acc;}, []);
  
       
      
    let maxPoints=[]
    maxPoints.push({ Date: arr[0].Date, Value: func(arr[0]), Type: "Max",Index:0 })
    maxPoints.push(...arrMax)
    maxPoints.push({ Date: arr[arr.length-1].Date, Value: func(arr[arr.length-1]), Type: "Max",Index:arr.length-1 })
       
    return maxPoints;
}
    

const writeFileExtremes=(arr,type,path)=>{
    
    let jsonFile=fs.writeFileSync(`${path}/${type}.json`,
    JSON.stringify(arr));
}

const createFilesExtremes=(arr,symbol,func)=>
{
    let directory=fs.mkdirSync(`extremes/${symbol}`);
    writeFileExtremes(calcMax(arr,func),"max",`extremes/${symbol}`);
    writeFileExtremes(calcMin(arr,func),"min",`extremes/${symbol}`);
}

let symbol='A'
let arr=readCSVFileSync(`../../${symbol}.csv`);
createFilesExtremes(arr,symbol,a=>a.Close);





