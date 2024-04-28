require('@babel/register')({
    presets: ['@babel/preset-env'],
    plugins: [
        ["@babel/plugin-proposal-decorators", { "legacy": true }],
        ["@babel/plugin-proposal-class-properties", { "loose": true }]
    ]
});

let dec = function(constructor){
	console.log("CTOR",constructor)
}
@dec
class Foo{
	method(){
		console.log("Here is my method")
	}
}

let foo = new Foo()
foo.method()