function chunks(data,length){
	
	let data2 = data.filter((e,index)=>index<=data.length-length)
	return data2.reduce((acc,current,index)=>[...acc,data.slice(index,index+length)],[])

}
function sma(data,length,func){
	let slices = chunks(data,length)
	console.log(slices[0])
	return slices.map(slice=>slice.reduce((acc,elem)=>acc+func(elem)/length,0))
}
module.exports = {chunks,sma}