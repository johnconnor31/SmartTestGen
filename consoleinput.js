var reader=require('readline');
var ir= reader.createInterface(process.stdin,process.stdout);
ir.setPrompt('enter a value');
ir.prompt();
ir.on('line',function(line){
	console.log(line);
	ir.setPrompt('enter a value');
ir.prompt();
})