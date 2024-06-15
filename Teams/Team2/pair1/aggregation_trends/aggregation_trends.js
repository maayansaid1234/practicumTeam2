const getArrTrendsBySymbolAndType = require("../trend_improve/trendTask");


const aggregation_trends=(trends)=>{
   const start=trends[0]
   const end=trends[trends.length-1]
   const trend=start.startValue>end.endValue?"down":"up"
   return {
      
    startValue:start.startValue,
    startIndex:start.startIndex,
    startDate:start.startDate,
    endValue:end.endValue,
    endIndex:end.endIndex,
    endDate:end.endDate,
    trend,
    percentile:end.endValue/start.startValue,
    slope:(end.endValue-start.startValue)/(end.endIndex-start.startIndex),
   }

}

let symbol = 'A';
let type="min";
console.log(aggregation_trends(getArrTrendsBySymbolAndType(symbol,type)));
