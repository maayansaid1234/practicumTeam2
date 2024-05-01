const fs = require('fs');
const csv = require('csv-parser');
const { Observable} = require('rxjs');
const { readCSVFileSync } = require('../CSV/readCsvSync');


class Candle{
	constructor(Date,Open,High,Low,Close,Volume){
		this.Open = Open
		this.Close = Close
		this.Low = Low
		this.High = High
		this.Volume = Volume 
		}
	show(){
		console.log("Candle",this.close)
	}

}
class Something{
	foo(){
		console.log("Somthing")
	}
}

class Ticker{
	constructor(ticker,path){
		this.ticker = ticker
		this.path = path 
	}
	readData(csvFilePath){

			return readCSVFileSync(csvFilePath)
		}
		
	getData$(){
		

		return new Observable(observer=>observer.next(this.readData(this.path+"/"+this.ticker+".csv")))
	

	}
}
module.exports = {Candle,Something,Ticker};


