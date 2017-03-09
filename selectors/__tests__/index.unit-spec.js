




var _index=require('../index');var chai=require('chai');var path=require('path');chai.should();



describe('selectors',function(){

it('should get the d2l user from state',function(){
var user=(0,_index.getUser)({
login:{
user:{
d2lUser:{
Identifier:'foo'},

authenticatedUrl:'bar'}}});




user.Identifier.should.eql('foo');
});




it('should get the mapping from state',function(){
var mockState={
mapping:{
outcomes:[],
modules:[],
relationships:[]}};



var result=(0,_index.getMapping)(mockState);
result.outcomes.should.be.a('array');
result.modules.should.be.a('array');
result.relationships.should.be.a('array');
});






});