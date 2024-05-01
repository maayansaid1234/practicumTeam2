const {Candle} = require('./DTO/Candle.js')


let dec = function(constructor){
	console.log("CTOR",constructor)
}

class Foo{
	method(){
		console.log("Here is my method")
	}
}

let foo = new Foo()
foo.method()

let c = new Candle(100,120,150,99,100000)

c.show()