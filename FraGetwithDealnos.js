var xmlParser = require('xml2js');
var fs2= require('fs');
var fs1= require('fs');
var fs3= require('fs');
var dealnos;
var xmltocopy;
// var xmlBuilder= new xmlParser.Builder();
var inDirectory='C:\\Users\\ssingire\\Desktop\\issues\\DDT\\Sairam_withDealno\\fra\\getDealnos';
var outDirectory='C:\\Users\\ssingire\\Desktop\\issues\\DDT\\Sairam_withDealno\\fra\\getDealnos\\out';
fs2.readFile(inDirectory+'/frrfformload.xml',function xmlRead(err,str){
	xmltocopy= str.toString();
});
fs1.readFile(inDirectory+'/dealnos.txt',function dealnosRead(err,str){
	// console.log(str.toString());
	str= str.toString();
	// console.log(str);
	dealnos = str.split('\r\n');
	dealnos.map(function(val,i){
		// console.log(val);
		var outXml=xmltocopy.replace(/(False%)\d+/,'$1'+val.trim());
		fs3.writeFile(outDirectory+'\\'+val+'.xml',outXml,function(err){
			console.log(err);
		});
	});
	// console.log(xmltocopy.replace(/(False%)\d+/,'$1'+'sairam'));
});
// console.log(xmltocopy);
// console.log(dealnos);
// fs2.readfile(inDirectory+'frrfformload.xml',function(err,fileList){
// 		 // console.log(fileList);
// 		var dealno;
// 		fileList.map(function(fileName){
// 			console.log(fileName);
// 			fs2.readFile(inDirectory+'\\'+fileName,function(err,str){
// 				// console.log(str);
// 				xmlParser.parseString(str,function(err,xmlObj){
// 					if(xmlObj){
// 				// xmlObj.UITestCaseStepData.UIRequest[0].OpicsPlusRequest[0].Message[0].Screens[0].Screen[3].DE1[0].H_Value1[0].DEALNO=dealno;
// 				// console.log(xmlObj.UITestCaseStepData.UIRequest[0].OpicsPlusRequest[0].Message[0].CALLANDNOTICE[0].DEAL[0].DETHEADER[0].MOVENO);
// 				// console.log(xmlObj.UITestCaseStepData.UIRequest[0].OpicsPlusRequest[0].Message[0].CALLANDNOTICE[0].DEAL[0].DWDEAL[0].MOVENO);
// 				// xmlObj.UITestCaseStepData.UIRequest[0].OpicsPlusRequest[0].Message[0].CALLANDNOTICE[0].DEAL[0].DWDEAL[0].ACCOUNTNO=dealno;
// 							templateFieldArray= xmlObj;
// 				// console.log(xmlObj.UITestCaseStepData.UIRequest[0].OpicsPlusRequest[0].Message[0].Screens[0].Screen[3].DE1[0].H_Value1[0].DEALNO);
// 				xmlObj.UITestCaseStepData.UIRequest[0].OpicsPlusRequest[0].Message[0].Screens[0].Screen[3].DE1[0].H_Value1[0].DEALNO=dealno;
				
// 				var xml=xmlBuilder.buildObject(xmlObj);
// 				fs3.writeFile(outDirectory+'\\'+fileName,xml,function(err){
// 					console.log(err);
// 				});
// 				dealno++;
// 			}
// 				});
			
// 			});
// 	});
// });
