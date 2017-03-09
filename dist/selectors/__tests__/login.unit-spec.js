


var _index=require('../login/index');var chai=require('chai');chai.should();

describe('login selectors',function(){

it('should get the displayName of a d2l object',function(){
var result=(0,_index.getD2LDisplayName)({
"DisplayName":"Butter, Peanut",
"Username":null});


result.should.be.eql('Peanut Butter');
});


it('should get the displayName of another d2l object',function(){
var result=(0,_index.getD2LDisplayName)({
"FirstName":"foo",
"LastName":"bar"});


result.should.be.eql('foo bar');
});

it('should get the Identifier of a d2l object',function(){
var result=(0,_index.getD2LUserIdentifier)({
"Identifier":"192051",
"ProfileIdentifier":"QKGjIK9TtN"});


result.should.eql("192051");
});
});