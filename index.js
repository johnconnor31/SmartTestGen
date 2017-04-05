const excelDealer= require('./excelHandler.js');
var fs= require('fs');
var xml2js= require('xml2js');
var currField=0;
var xmlParser= new xml2js.Parser({explicitArray:false});
var iParser= new xml2js.Parser({explicitArray:false});
var templateFields;
var vals=[],header=[],basicScenario=[];

fs.readFile('DealEntry.xml',function(err,str){
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
	// console.log(templateFields);
	for(var key in inputParams)
		if(inputParams.hasOwnProperty(key))
			header.push({
				Name:key,
			});


	excelDealer.wh(header);
}
// 	var tagName;
// 	var noOfCases=0;
// 	var options;

// 	for(var key in inputParams)
// 		if(inputParams.hasOwnProperty(key))
// 			basicScenario.push(inputParams[key]);



// 	templateFields.map(function(field,i){
// 		console.log(field.$.xmlTag);
// 		if(field.cells!=undefined)
// 			if(field.cells["cell"].comboBox!=undefined)
// 					if(field.cells["cell"].comboBox["comboBoxItem"]!=undefined)
// 		 console.log(field.$.xmlTag,field.cells["cell"].comboBox["comboBoxItem"][0]);
// 		tagName=field.$.xmlTag;
// 		options=[];

// 		if(field.cells!=undefined)
// 			if(field.cells["cell"].comboBox!=undefined)
// 				if(field1.cells["cell"].comboBox["comboBoxItem"]!=undefined)
// 					{
// 						options=field1.cells["cell"].comboBox["comboBoxItem"];
// 				}


// 		if(options!=[])
// 			{


// 			}
// 		else
// 			{
// 				vals[noOfCases-1].push()

// 			}

// }
// else

// {}	// vals.


				
			
// 		});
// 	});
	
// 	 // excelDealer.wv(vals);

// }

// // function writeToExcel(vals){
// // 	// console.log(vals);
// // 	excelDealer.wh(vals);
// // }
