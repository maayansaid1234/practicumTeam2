const fetch1 = require('node-fetch');
const { DOMParser } = require('xmldom');


async function loadXMLDoc(url) {
    try {
        const response = await fetch1(url);
        const data = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, 'text/xml');
        return parseXML(xmlDoc);
    } catch (error) {
        console.error('Error loading XML:', error);
    }
}

function parseXML(xml) {
    let arrPatterns=[]
     root = xml.documentElement;
   // console.log(root.nodeName);

    let triangles = root.getElementsByTagName('tw-triangle');
    for (let i = 0; i < triangles.length; i++) {
        var triangle = triangles[i];
        //console.log("Triangle " + (i + 1) + " (" + (triangle.getAttribute('close') ? 'close' : 'open') + ")");

        let patterns = triangle.getElementsByTagName('tw-pattern');
        
        for (  let j = 0; j < 3; j++) {
         
            var pattern = patterns[j];
         //   console.log("  Pattern " + (j + 1));

            var trendDates = pattern.getElementsByTagName('tw-trend-dates')[0];

            var highs = trendDates.getElementsByTagName('tw-highs')[0];
         //   console.log("    Highs: " + (highs.getAttribute('down') ? 'down' : 'up'));

            var lows = trendDates.getElementsByTagName('tw-lows')[0];
          //  console.log("    Lows: " + (lows.getAttribute('up') ? 'up' : 'down'));

          

            var minLowUpRelation = trendDates.getElementsByTagName('tw-min-low-up-relation')[0];
            if (minLowUpRelation) {
               // console.log("    Min Low Up Relation: " + minLowUpRelation.textContent);
            }

            var minUpLowRelation = trendDates.getElementsByTagName('tw-min-up-low-relation')[0];
            if (minUpLowRelation) {
                //console.log("    Min Up Low Relation: " + minUpLowRelation.textContent);
            }

            arrPatterns.push({
                "triangle":i+1,
                "pattern":j+1,
                "Highs":  highs.getAttribute('down') ? 'down' : 'up',
                "Lows" : lows.getAttribute('up') ? 'up' : 'down',
                "Min Low Up Relation" :minLowUpRelation?.textContent,
                "Min Up Low Relation " : minUpLowRelation?.textContent
            });
        }
       
    }
   
  return arrPatterns;
  
}




  //let res= await loadXMLDoc('http://127.0.0.1:5500/Teams/Team2/pair1/learn_xml/triangles.html');
  
  

module.exports=loadXMLDoc;
