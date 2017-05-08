const excelDealer= require('./excelHandler.js');
var fs= require('fs');
var xml2js= require('xml2js');
var currField=0;
var xmlParser= new xml2js.Parser({explicitArray:false});
var templateFieldArray;
var inputParams;
var vals=[],header=[],basicScenario=[],currentTC=[];

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
		generateCases(inputParams);
	
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

	var tagName;
	var noOfCases=-1;
	var options;

	for(var key in inputParams)
		if(inputParams.hasOwnProperty(key))
			basicScenario.push(inputParams[key]);

		
		
	templateFieldArray.map(function(field,i){
		// console.log(field.$.xmlTag);
		// if(field.cells!=undefined)
		// 	if(field.cells["cell"].comboBox!=undefined)
		// 			if(field.cells["cell"].comboBox["comboBoxItem"]!=undefined)
		//  console.log(field.$.xmlTag,field.cells["cell"].comboBox["comboBoxItem"][0]);
		tagName=field.$.xmlTag;
		options=[];

		if(field.cells!=undefined)
			if(field.cells["cell"].comboBox!=undefined)
				if(field.cells["cell"].comboBox["comboBoxItem"]!=undefined)
					{
						options=field.cells["cell"].comboBox["comboBoxItem"];
				}

		if(options.length==0)
			{	
				currentTC= basicScenario.slice(0);
				updateTC(currentTC,tagName,"");
				noOfCases++;
				vals[noOfCases]=[];
				vals[noOfCases]=currentTC;

				currentTC= basicScenario.slice(0);
				noOfCases++;
				vals[noOfCases]=[];
				updateTC(currentTC,tagName,"$#%#");
				vals[noOfCases]=currentTC;

				currentTC= basicScenario.slice(0);
				noOfCases++;
				vals[noOfCases]=[];
				updateTC(currentTC,tagName,"234232");
				vals[noOfCases]=currentTC;

			}
			else if(options['$']!=undefined)
			{
				currentTC= basicScenario.slice(0);
					noOfCases++;
					vals[noOfCases]=[];
					updateTC(currentTC,tagName,options['$'].value.toString());
					vals[noOfCases]=currentTC;

			}
			else {
				options.map(function(option,i){
					currentTC= basicScenario.slice(0);
					noOfCases++;
					vals[noOfCases]=[];
					updateTC(currentTC,tagName,option['$'].value);
					vals[noOfCases]=currentTC;
				});
			}
			// console.log(vals);


		});
	
	  excelDealer.wv(vals);

}



function updateTC(TC,xmlTag,val){
	var pos=0;
	for(var key in inputParams){
		if(xmlTag === key)
		{
			console.log(key.toString());
			TC[pos]={value:val,color:'blue'};
		}
		else
			pos++;
	
	}
	console.log(TC);

}