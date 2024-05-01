const fs = require('fs');
const csv = require('csv-parser');
const {Ticker} = require('./DTO/Candle')
const {chunks,sma} = require('./Calculations/sma.js');
const { readCSVFileSync } = require('./CSV/readCsvSync.js');

// Path to your CSV file
let ticker = new Ticker("MSFT","../StockMagic")
/*ticker.getData$().
subscribe
(
	data=>console.log(data)
)*/
let data = readCSVFileSync("../StockMagic/MSFT.csv")
data = data.reverse()

let smaClose = sma(data,20,(elem)=>elem.Close)
let smaVolume = sma(data,20,(elem)=>elem.Volume)

let s = smaClose.map((s1,index)=>[s1,smaVolume[index]])
console.log("====>>>")
console.log(s)




