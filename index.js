const excelDealer= require('./excelHandler.js');
var os = require('os');
var rl = require('readline');
var fs= require('fs');
var xml2js= require('xml2js');
var currField=0;
var xmlParser= new xml2js.Parser({explicitArray:false});
var templateFieldArray;
var inputHeader,inputLeg;
var vals=[],header=[],basicScenario=[],currentTC=[];
var noOfCases=-1;
fs.readFile('D:\\TCGen\\SmartTestGen_new\\CapFloorLeg_template.xml',function(err,str){
	// console.log(err);
	// console.log(str);
	xmlParser.parseString(str,function(err,xmlObj){
		// console.log(xmlObj);
		templateFieldArray= xmlObj.grid.rows.row;
	})
});


fs.readFile('D:\\TCGen\\SmartTestGen_new\\capsandFloors_input.xml','UTF8',function(err,str){

	// console.log(err);
	// console.log(str);
	xmlParser.parseString(str,function(err,xmlObj){
		// console.log(err);
		// console.log(xmlObj.OpicsPlusRequest.Message.Screens.Screen[4].CPFLLEG);
		inputLeg=xmlObj.OpicsPlusRequest.Message.Screens.Screen[4].CPFLLEG.H_Value1;
		inputHeader = xmlObj.OpicsPlusRequest.Message.Screens.Screen[4].CPFLHEADER.H_Value1;
		// console.log(inputParams);

		// generateCases(function(err){
		// 	console.log('\n validation Test Cases are generated');
		// 	console.log('\nYou can create functional test cases: Enter the following way.\n');
		// 	console.log('Enter xmltag1 [space] value1 [space] xmltag2 [space] value2 and so on....');
		// 	console.log('and press Enter at the end');
		// });
		generateFunctionalTCs();
	
	});
});
function generateFunctionalTCs(){
		// console.log(templateFieldArray);
		for(var key in inputHeader)
		if(inputHeader.hasOwnProperty(key)&& inputHeader[key]!=='' &&inputHeader[key]!=='\r\n')
		{	
			// console.log(key,inputHeader[key]);
			basicScenario.push(inputHeader[key]);
		}

		for(var key in inputLeg)
		if(inputLeg.hasOwnProperty(key)&& inputLeg[key]!=='')
			basicScenario.push(inputLeg[key]);

		// console.log(basicScenario);

		
		

}
function generateCases(callBack){
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
	callBack();

}



function updateTC(TC,xmlTag,val){
	var pos=0;
	for(var key in inputParams){
		if(xmlTag.toUpperCase() === key.toUpperCase())
		{
			// console.log(key.toString());
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
	if(line.length==0){
		console.log('Type \'end\' and press Enter if finished.Else,continue entering test cases\n');	
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
		for(var i=0;i<inputArr.length-1;i+=2)
		{
			tagName=inputArr[i];
			value=inputArr[i+1];
			updateTC(currentTC,tagName,value);
		}
	noOfCases++;
	vals[noOfCases]=[];
	currentTC.unshift("FRA_TC_000"+noOfCases);
	vals[noOfCases]=currentTC;
	console.log('Type \'end\' and press Enter if finished.Else,continue entering test cases\n');	

}

});