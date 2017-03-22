var fs= require('fs');
var xml2js= require('xml2js');

var xmlParser= new xml2js.Parser({explicitArray:false});

fs.readFile('fra.xml',function(err,str){
	console.log(err);
	// console.log(str);
	xmlParser.parseString(str,function(err,xmlObj){
		console.log(xmlObj.messages.note[1].heading);
	})
});