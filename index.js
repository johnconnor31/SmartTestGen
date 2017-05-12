const excelDealer= require('./excelHandler.js');
var os = require('os');
var rl = require('readline');
var fs= require('fs');
var xml2js= require('xml2js');
var currField=0;
var xmlParser= new xml2js.Parser({explicitArray:false});
var templateFieldArray;
var inputParams;
var vals=[],header=[],basicScenario=[],currentTC=[];
var noOfCases=-1;
fs.readFile('DealEntry.xml',function(err,str){
	// console.log(err);
	// console.log(str);
	xmlParser.parseString(str,function(err,xmlObj){
		// console.log(xmlObj.grid.rows.row);
		templateFieldArray= xmlObj.grid.rows.row;
	})
});


fs.readFile('inputFields.xml',function(err,str){
	console.log(err);
	// console.log(str);
	xmlParser.parseString(str,function(err,xmlObj){
		// console.log(xmlObj.OpicsPlusRequest.Header.Message.Screens.Screen[3].DE.H_Value1);
		inputParams=xmlObj.OpicsPlusRequest.Header.Message.Screens.Screen[3].DE.H_Value1;
		// console.log(inputParams);
		generateCases();
	
	})
});
function generateCases(){
	// console.log(templateFields);
	writeHeader();
	var tagName;
	var options;

	for(var key in inputParams)
		if(inputParams.hasOwnProperty(key))
			basicScenario.push(inputParams[key]);

		
		
	templateFieldArray.map(function(field,i){
	
		tagName=field.$.xmlTag;
		options=getOptions(field);

		if(options.length==0)
			{	
				
				generateTC(tagName,"");
				generateTC(tagName,"$#%#");
				generateTC(tagName,"23432");

			}
			else if(options['$']!=undefined)
				generateTC(tagName,options['$'].value.toString());
			else 
				options.map(function(option,i){
					generateTC(tagName,option['$'].value);
				});
			
			// console.log(vals);
		});


}



function updateTC(TC,xmlTag,val){
	var pos=0;
	for(var key in inputParams){
		if(xmlTag.toUpperCase() === key.toUpperCase())
		{
			console.log(key.toString());
			TC[pos]=val;
		}
		else
			pos++;
	
	}
	// console.log(TC);

}
function writeHeader(){
	header.push({Name:"Test Description"});
	for(var key in inputParams)
		if(inputParams.hasOwnProperty(key))
			header.push({
				Name:key,
			});

	excelDealer.writeHeader(header);
}
function getOptions(field){
	if(field.cells!=undefined)
			if(field.cells["cell"].comboBox!=undefined)
				if(field.cells["cell"].comboBox["comboBoxItem"]!=undefined)
					{
						return field.cells["cell"].comboBox["comboBoxItem"];
				}
				return [];
}
function generateTC(tagName,value)
{
    var	currentTC= basicScenario.slice(0);
	updateTC(currentTC,tagName,value);
	noOfCases++;
	vals[noOfCases]=[];
	currentTC.unshift("FRA_TC_000"+noOfCases);
	vals[noOfCases]=currentTC;
}
var iReader= rl.createInterface(process.stdin,process.stdout);
iReader.on('line',function(line){
	if(line.length==0)
	{
	console.log('enter'+line);
	iReader.setPrompt('type end if finished.else,enter values\n');
	iReader.prompt();
}
	else if(line.toString().indexOf('end',0)==0)
	{
		iReader.close();
		excelDealer.writeValues(vals);
	}
	else
	{	
		console.log('valid'+line);
		var tagName,value;
		var inputs= line.toString();
		var inputArr= line.split(' ');
		var	currentTC= basicScenario.slice(0);
		for(var i=0;i<inputArr.length-1;i++)
		{
			tagName=inputArr[i];
			value=inputArr[i+1];
			updateTC(currentTC,tagName,value);
		}
	noOfCases++;
	vals[noOfCases]=[];
	currentTC.unshift("FRA_TC_000"+noOfCases);
	vals[noOfCases]=currentTC;
}
	
	
});
