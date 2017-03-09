



var _index=require('../course/index');var chai=require('chai');var path=require('path');chai.should();

describe('course selectors',function(){

it('should select the current selected course from the courses',function(){
var result=(0,_index.getCurrentCourse)({
course:{
currentCourse:{id:'my course'},
courses:[{id:'foo',displayName:'bar'}]}});



result.should.be.eql({id:'my course'});
});

it('should get the class roster',function(){
var result=(0,_index.getRoster)({
course:{
roster:[{name:'foo'}]}});


result.length.should.be.eql(1);
});

});