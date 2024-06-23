const aggregation_trends = require("../aggregation_trends/aggregation_trends");
let parsingTrianglesHtml = require("./parsingTrianglesHtml");
const getArrTrendsBySymbolAndType=require("../trend_improve/trendTask")




const recognizeTrianglePatterns = (TrendLows,
    TrendHighs,arrPatterns) => 
{

   for (let index = 0; index < arrPatterns.length; index++)
   {
    const pattern = arrPatterns[index];
    if(pattern.highs==TrendHighs.trend&&pattern.lows==TrendLows.trend){
        if(pattern.highs==pattern.lows) // up=up  down down
        {
            
              if(TrendHighs.slope>TrendLows.slope&&pattern.triangleType=="open")
              {
                return pattern;
              }
              if(TrendHighs.slope<TrendLows.slope&&pattern.triangleType=="closed")
                {
                  return pattern;
                }
          
        }
    else{
        return pattern;
    }
    }
    
   }
            

}







const func =  (symbol,startDate,endDate) => {
    const trendsFromMaxPoints = getArrTrendsBySymbolAndType(symbol,"max");
    const trendsFromMinPoints = getArrTrendsBySymbolAndType(symbol,"min");
    const trendFromMaxPoints=aggregation_trends(trendsFromMaxPoints,endDate,startDate)
    const trendFromMinPoints=aggregation_trends(trendsFromMinPoints,endDate,startDate)
        const arrPatterns =  parsingTrianglesHtml()
     console.log(recognizeTrianglePatterns(trendFromMinPoints, trendFromMaxPoints
            ,  arrPatterns))
    }

let symbol = 'A'
let startDate='1/20/2023 12:00:00 AM'
let endDate='1/27/2023 12:00:00 AM'
func(symbol,startDate,endDate);