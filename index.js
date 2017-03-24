var fs= require('fs');
var xml2js= require('xml2js');

var xmlParser= new xml2js.Parser({explicitArray:false});
var iParser= new xml2js.Parser({explicitArray:false});
var templateFields;
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
	templateFields.map(function(field){
		console.log(field);
		
	})

}

function writeToExcel(vals){
	console.log(vals);
}