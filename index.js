const excelDealer= require('./excelHandler.js');
var fs= require('fs');
var xml2js= require('xml2js');
var currField=0;
var xmlParser= new xml2js.Parser({explicitArray:false});
var iParser= new xml2js.Parser({explicitArray:false});
var templateFields;
var vals=[],header=[];
fs.readFile('fra1.xml',function(err,str){
	console.log(err);
	// console.log(str);
	xmlParser.parseString(str,function(err,xmlObj){
		// console.log(xmlObj.grid.rows.row);
		templateFields= xmlObj.grid.rows.row;
	})
});


fs.readFile('inputFields.xml',function(err,str){
	console.log(err);
	// console.log(str);
	iParser.parseString(str,function(err,xmlObj){
		// console.log(xmlObj.OpicsPlusRequest.Header.Message.Screens.Screen[3].DE.H_Value1);
		generateCases(xmlObj.OpicsPlusRequest.Header.Message.Screens.Screen[3].DE.H_Value1);
	})
});

function generateCases(inputParams){
	console.log(templateFields.length);
	console.log(inputParams);
	templateFields.map(function(field,i){
		// console.log(field.$.xmlTag);
		// console.log(i);
		header.push({
			Name:field.$.xmlTag,
		});


	})
	excelDealer.wh(header);
	var tagName;
	templateFields.map(function(field,i){
		tagName=field.$.xmlTag;
		vals.push(inputParams[tagName]);	
		});
	
	 excelDealer.wv(vals);

}

// function writeToExcel(vals){
// 	// console.log(vals);
// 	excelDealer.wh(vals);
// }