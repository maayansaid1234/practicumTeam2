 
const aggregation_trends=(trends,endDate,startDate)=>{
   const start=trends[0]
   const end=trends[trends.length-1]
   let trend;
   let slope =(end.endValue-start.startValue)/(end.endIndex-start.startIndex)
   if(slope<1)
   { // shuffle
      trend="up"

   }
   else{
     trend=start.startValue>end.endValue?"down":"up"
   }
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


module.exports=aggregation_trends;
