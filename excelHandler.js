var excel= require('exceljs');

var wb= new excel.Workbook();

var ws= wb.addWorksheet('checking');
var columns=[];
// console.log(ws);
function writeValues(excelRows){
	// console.log(ws.columns);
	excelRows.map(function(row,i){
		// console.log(row[0]);
	 ws.addRow(row);
	});	
	// console.log(ws.rows);
	wb.xlsx.writeFile('TcGenerated.xlsx').then(function(){
		console.log('excel printed');	
	});
}
function writeHeader(vals){
	vals.map(function(val,i){
		columns.push({header:val.Name,width:20});
	});
	 ws.columns=columns;
	 wb.xlsx.writeFile('TcGenerated.xlsx').then(function(){
		console.log('excel printed');	
	});
	

}

module.exports.wh=writeHeader;
module.exports.wv=writeValues;