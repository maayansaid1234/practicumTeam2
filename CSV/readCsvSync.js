//
const fs = require('fs');
const csv = require('csv-parser');

function readCSVFileSync(filePath) {
    try {
        
        const fileData = fs.readFileSync(filePath, 'utf8');
		let [first,...rest] = fileData.split("\n")
		rest = rest.filter(row=>row!="")
		let  ret = rest.map(row=>row.split(",").reduce((acc,field,index)=>{return{...acc,[first.split(",")[index]]:index==0?new Date(field):parseInt(field)}},{}))
		
		return ret
		
    } catch (error) {
        // Handle errors
        console.error('Error reading CSV file synchronously:', error);
        throw error;
    }
}


module.exports = {readCSVFileSync}
