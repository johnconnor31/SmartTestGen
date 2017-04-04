var fs= require('fs');
fs.readFile('points.txt',function(err,data){
	if(!err)
		reflection(data.toString());
});
var px,py,qx,qy;
var diff1,diff2;
var ptArr=[];
function reflection(data){
	console.log(data.toString());
	var inArr= data.split('\n');
	inArr.forEach(function(points,i){
		if(i!=0)
			{
				ptArr=points.split(' ');
				px=parseInt(ptArr[0]);
				py=parseInt(ptArr[1]);
				qx=parseInt(ptArr[2]);
				qy=parseInt(ptArr[3]);
				
				console.log(2*qx-px,2*qy-py);
			}
	});



}