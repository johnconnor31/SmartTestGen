var xmlParser = require('xml2js');
var fs2= require('fs');
var fs1= require('fs');
var fs3= require('fs');

var xmlBuilder= new xmlParser.Builder();
var inDirectory='\\\\Blrd016\\opx44\\OPXTEST\\OPXSVR\\ApplicationServiceRest\\WepApiTestCases\\OTC\\OTC WORKING_merin\\';
var outDirectory='\\\\Blrd016\\opx44\\OPXTEST\\OPXSVR\\ApplicationServiceRest\\WepApiTestCases\\OTC\\OTC WORKING_merin - out\\';
fs1.readdir(inDirectory,function(err,fileList){
		 console.log(fileList);
		var dealno=1000740;
		fileList.map(function(fileName){
			console.log(fileName);
			fs2.readFile(inDirectory+'\\'+fileName,function(err,str){
				// console.log(str);
				xmlParser.parseString(str,function(err,xmlObj){
					if(xmlObj){
				// xmlObj.UITestCaseStepData.UIRequest[0].OpicsPlusRequest[0].Message[0].Screens[0].Screen[3].DE1[0].H_Value1[0].DEALNO=dealno;
				// console.log(xmlObj.UITestCaseStepData.UIRequest[0].OpicsPlusRequest[0].Message[0].CALLANDNOTICE[0].DEAL[0].DETHEADER[0].MOVENO);
				// console.log(xmlObj.UITestCaseStepData.UIRequest[0].OpicsPlusRequest[0].Message[0].CALLANDNOTICE[0].DEAL[0].DWDEAL[0].MOVENO);
				// xmlObj.UITestCaseStepData.UIRequest[0].OpicsPlusRequest[0].Message[0].CALLANDNOTICE[0].DEAL[0].DWDEAL[0].ACCOUNTNO=dealno;
							templateFieldArray= xmlObj;
				// console.log(xmlObj.UITestCaseStepData.UIRequest[0].OpicsPlusRequest[0].Message[0].Screens[0].Screen[3].DE1[0].H_Value1[0].DEALNO);
				xmlObj.UITestCaseStepData.UIRequest[0].OpicsPlusRequest[0].Message[0].Screens[0].Screen[3].DE1[0].H_Value1[0].DEALNO=dealno;
				
				var xml=xmlBuilder.buildObject(xmlObj);
				fs3.writeFile(outDirectory+'\\'+fileName,xml,function(err){
					console.log(err);
				});
				dealno++;
			}
				});
			
			});
	});
});
