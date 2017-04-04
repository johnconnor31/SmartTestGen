var excel= require('exceljs');

var wb= new excel.Workbook();

var ws= wb.addWorksheet('checking');
var columns=[];
// console.log(ws);
function writeValues(vals){
	// console.log(ws.columns);
	ws.addRow(vals);
	// console.log(ws.rows);
	wb.xlsx.writeFile('abc.xlsx').then(function(){
		console.log('excel printed');	
	});
}
function writeHeader(vals){
	vals.map(function(val,i){
		columns.push({header:val.Name,key:val.Name,width:val.Name.length});

	});
	 ws.columns=columns;
	 
	

}

module.exports.wh=writeHeader;
module.exports.wv=writeValues;