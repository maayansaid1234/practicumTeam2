const fs = require("fs");





// const trendTask = (arr,x,symbol) => {

   
//     let start = arr[0], end = arr[0];
//     let currentTrend=""
   
//     const arrTrends = arr.reduce((acc, val) => {
       
//         const smallerByX = (end.Value) * (1-(x / 100))
//         const biggerByX = (end.Value) * (1+(x / 100)) 
//         if ( val.Value < smallerByX) //down
//         { 
//             if (currentTrend!= "down") {
//                 if(currentTrend!="")
//                 acc.push({
//                     startDate: start.Date,
//                     startValue: start.Value,
//                     endDate: end.Date,
//                     endValue: end.Value,
//                     trendDuration:calcDays(start.Date,end.Date,symbol),
//                     trend: currentTrend,
//                     percentile: (end.Value / start.Value) * 100
//                 });
//             currentTrend = "down";
//             start=end; 
//             } 
                    
         
//         } 
//         else {
//             if(val.Value>biggerByX) //up
//             {
//                 if (currentTrend != "up") {
//                     if(currentTrend!="")
//                     acc.push({
//                         startDate: start.Date,
//                         startValue: start.Value,
//                         endDate: end.Date,
//                         endValue: end.Value,
//                         trendDuration:calcDays(start.Date,end.Date,symbol),
//                         trend:currentTrend,
//                         percentile: (end.Value / start.Value) * 100
//                     });
//                    currentTrend="up" 
//                    start=end
//                 }
//             }
//            else {

//             //shuffle
          
//                 if (currentTrend != "shuffle") {
//                     if(currentTrend!="")
//                     acc.push({
//                         startDate: start.Date,
//                         startValue: start.Value,
//                         endDate: end.Date,
//                         endValue: end.Value,
//                         trendDuration:calcDays(start.Date,end.Date,symbol),
//                         trend: currentTrend,
//                         percentile: (end.Value / start.Value) * 100
//                     });
//                   currentTrend="shuffle" 
//                    start=end 
//                 }
//            }
           
//         } 

//         end = val;
//         return acc
     
//     }  , []);   
        
//     return arrTrends;
// }
    

const trendTask = (arr) => {

   
    let start = arr[0], end = arr[0];
    let currentTrend=""
   
    const arrTrends = arr.reduce((acc, val) => {
       
      
        if ( val.Value<end.Value ) //down
        { 
            if (currentTrend!= "down") {
                if(currentTrend!="")
                acc.push({
                    startDate: start.Date,
                    startValue: start.Value,
                    startIndex:start.Index,
                    endDate: end.Date,
                    endValue: end.Value,
                    endIndex:end.Index,
                    slope:(end.Value-start.Value)/(end.Index-start.Index), 
                    trend: currentTrend,
                    percentile: (end.Value / start.Value)
                });
            currentTrend = "down";
            start=end; 
            } 
                    
         
        } 
        else {
               
                if (currentTrend != "up") {
                    if(currentTrend!="")
                    acc.push({
                        startDate: start.Date,
                    startValue: start.Value,
                    startIndex:start.Index,
                    endDate: end.Date,
                    endValue: end.Value,
                    endIndex:end.Index,
                    slope:(end.Value-start.Value)/(end.Index-start.Index), 
                    trend: currentTrend,
                    percentile: (end.Value / start.Value) 
                    });
                   currentTrend="up" 
                   start=end
                }
            }
         
        end = val;
        return acc
     
    }  , []);   
        
    return arrTrends;
}


let symbol = 'A'
let arrMax = fs.readFileSync(`../extremes_improve/extremes/${symbol}/max.json`);
let arrMin = fs.readFileSync(`../extremes_improve/extremes/${symbol}/min.json`);
arrMax = JSON.parse(arrMax);
arrMin = JSON.parse(arrMin);
const trendsFromMaxPoints= trendTask(arrMax);   
const trendsFromMinPoints=trendTask(arrMin);  
console.log(trendsFromMaxPoints)
    