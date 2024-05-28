const fs = require("fs");
const calcDays=require("./calcDaysBetween2Dates")

let symbol = 'A'
let arrMax = fs.readFileSync(`./${symbol}/max.json`);
arrMax = JSON.parse(arrMax);
console.log(arrMax);
console.log(trendTask(arrMax, 5,symbol));


const trendTask = (arr, x,symbol) => {

   
    let start = arr[0], end = arr[0];
    let currentTrend=""
   
    const arrTrends = arr.reduce((acc, val) => {
       
        const smallerByX = (end.Value) * (1-(x / 100))
        const biggerByX = (end.Value) * (1+(x / 100)) 
        if ( val.Value < smallerByX) //down
        { 
            if (currentTrend!= "down") {
                if(currentTrend!="")
                acc.push({
                    startDate: start.Date,
                    startValue: start.Value,
                    endDate: end.Date,
                    endValue: end.Value,
                    trendDuration:calcDays(start.Date,end.Date,symbol),
                    trend: currentTrend,
                    percentile: (end.Value / start.Value) * 100
                });
            currentTrend = "down";
            start=end; 
            } 
                    
         
        } 
        else {
            if(val.Value>biggerByX) //up
            {
                if (currentTrend != "up") {
                    if(currentTrend!="")
                    acc.push({
                        startDate: start.Date,
                        startValue: start.Value,
                        endDate: end.Date,
                        endValue: end.Value,
                        trendDuration:calcDays(start.Date,end.Date,symbol),
                        trend:currentTrend,
                        percentile: (end.Value / start.Value) * 100
                    });
                   currentTrend="up" 
                   start=end
                }
            }
           else {

            //shuffle
          
                if (currentTrend != "shuffle") {
                    if(currentTrend!="")
                    acc.push({
                        startDate: start.Date,
                        startValue: start.Value,
                        endDate: end.Date,
                        endValue: end.Value,
                        trendDuration:calcDays(start.Date,end.Date,symbol),
                        trend: currentTrend,
                        percentile: (end.Value / start.Value) * 100
                    });
                  currentTrend="shuffle" 
                   start=end 
                }
           }
           
        } 

        end = val;
        return acc
     
    }  , []);   
        
    return arrTrends;
}
    

    
    