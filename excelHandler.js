var excel= require('exceljs');
var wb= new excel.Workbook();

var ws= wb.addWorksheet('checking');
var columns=[];
// console.log(ws);
function writeValues(excelRows){
	console.log(excelRows.length);
	excelRows.map(function(row,i){
		// console.log(row[0]);
		
			// console.log(row);
	 ws.addRow(row);
	
	});	
	// console.log(ws.rows);
	wb.xlsx.writeFile('D:\\TCGen\\SmartTestGen_new\\TcGenerated.xlsx').then(function(){
		console.log('excel printed');	
	});
}
function writeHeader(vals){
	vals.map(function(val,i){
		columns.push({header:val.Name,width:20});
	});
	 ws.columns=columns;
	 console.log(ws.rows);
	 wb.xlsx.writeFile('TcGenerated.xlsx').then(function(){
		console.log('excel printed. Check TcGenerated.xlsx in your folder');	
	});
	

}

module.exports.writeHeader=writeHeader;
module.exports.writeValues=writeValues;