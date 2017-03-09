
var path=require('path');



var __karmaWebpackManifest__=[];



var testsContext=require.context(path.resolve(__dirname,"../components"),true,/__tests__$/);

function inManifest(path){
return __karmaWebpackManifest__.indexOf(path)>=0;
}

var runnable=testsContext.keys().filter(inManifest);

console.log(testsContext.keys());
console.log('runnable',runnable);


if(!runnable.length){
runnable=testsContext.keys();
}

runnable.forEach(testsContext);