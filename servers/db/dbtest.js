var problemdb = require('./problem');

//problemdb.set("cdcd",{ ab: 'c', d: 23, c: [ 4545 ], _key: 'aa' })
// problemdb.remove("ID_1446081789181");
// problemdb.get("ID_1446081789181",function  (argument) {
// 	console.log(argument);
// });
problemdb.compact();
// problemdb.each( function (argument) {
// 	console.log(argument);
// });
// problemdb.dump();
// problemdb.remove("ID_1446081005055");
// problemdb.compact();
// problemdb.remove("cdcd");
// problemdb.each(function (argument) {
// 	console.log(argument)
// });
// problemdb.set("fdef",{a: { 	kd:{jk:23},af:[2,3,4,2,[23,12,{aa:"asfds"}]]},	cd: 21, });
// problemdb.all( function (argument) {
// 	console.log(argument);
// })



//console.log(problemdb);
// var i=0;
// problemdb.filter(3,function  (obj,key) {
// 	console.log(obj,key);
// 	return (i++)%2==0;
// },function  (argument) {
// 	console.log(argument);
// });