var fs= require('fs');
var xml2js_reader = require('xml2js');
var xml2jsparser = new xml2js_reader.Parser();
fs.readFile('Fra.xml', function (err, res){
    // console.log(res.toString());
 	xml2jsparser.parseString(res.toString(),function(err1,res1){
    // use .text() to get the content of a node: 
    console.log( res1.grid.rows[0].row[0]);
 });
});