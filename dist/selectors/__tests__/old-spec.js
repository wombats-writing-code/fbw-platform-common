




var _index=require('../index.js');var chai=require('chai');var path=require('path');chai.should();



var targetQuestion={
displayName:{
text:"2"}};



var notTargetQuestion={
displayName:{
text:"2.2"}};



var noMagicNumberQuestion={
displayName:{
text:"hi there"}};



var noNameQuestion={
displayName:{
text:""}};



describe('selectors',function(){
it('should say this question is a Target',function(){
var result=(0,_index.isTarget)(targetQuestion);
result.should.equal(true);
});
});