const cheerio = require('cheerio')
const fs = require('fs') 

const parsingTrianglesHtml=()=>{


var data = fs.readFileSync("./triangles.html","utf-8")
var $ = cheerio.load(data)
var patternsArr=[] 
var closePatterns  = $('tw-triangle[close] tw-pattern tw-trend-dates')

closePatterns.each((index,pattern)=>{
	
	let  trendHighs = pattern.childNodes.find(n=>n.name=="tw-highs")
	let  trendLows = pattern.childNodes.find(n=>n.name=="tw-lows")
  let  upLowRelation = pattern.childNodes.find(n=>n.name=="tw-min-low-up-relation")
  
  patternsArr.push(
    {triangleType:"closed",
      highs:trendHighs.attributes[0].name,
      lows:trendLows.attributes[0].name,
      upLowRelation:upLowRelation?.children?.find(n => n.type == "text")?.data
      }

  )


}	
)




var openPatterns  = $('tw-triangle[open] tw-pattern tw-trend-dates')

openPatterns.each((index,pattern)=>{
	
	let  trendHighs = pattern.childNodes.find(n=>n.name=="tw-highs")
	let  trendLows = pattern.childNodes.find(n=>n.name=="tw-lows")
  let  upLowRelation = pattern.childNodes.find(n=>n.name=="tw-min-low-up-relation")
  patternsArr.push(
    {triangleType:"open",
      highs:trendHighs.attributes[0].name,
      lows:trendLows.attributes[0].name,
      upLowRelation:upLowRelation?.children?.find(n => n.type == "text")?.data
      ,}

  )

}	
)

return (patternsArr)
}

module.exports=parsingTrianglesHtml;


