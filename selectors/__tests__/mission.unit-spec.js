




var _mission=require('../mission');var chai=require('chai');var path=require('path');chai.should();var sectionQuestions=require('./section-questions.json');


describe('mission selectors',function(){

it('should return the targets of a given section',function(done){
var result=(0,_mission.getSectionTargets)([],0);

result.should.be.eql([]);

done();
});

it('should say a route is navigated given the target',function(done){
var result=(0,_mission.isTargetRouteNavigated)(sectionQuestions[0],sectionQuestions);

result.should.be.eql(true);

done();
});

it('should say a route is navigated given the single target',function(done){
var result=(0,_mission.isTargetRouteNavigated)([
{
name:'foo',
responded:true}],

sectionQuestions);

result.should.be.eql(true);

done();
});

it('should say the given target is the last target in the section',function(done){
var section=[
[],
[],
[
{id:'1'},
{id:'2'}]];


var target=section[2][0];
var result=(0,_mission.isLastTargetInRoute)(target,section);

result.should.be.eql(true);

done();
});

it('should return the questions when target is the first in the list',function(){
var section=[
[{
id:'1',
referenceNumber:'1'},
{
id:'2',
referenceNumber:'1.2'}],

[{
id:'3',
referenceNumber:'2'}]];


var target={
id:'1'};

var questions=(0,_mission.getRouteQuestions)(section,target);
questions.should.be.eql(section[0]);
});

it('should return the questions when target is not the first in the list',function(){
var section=[
[{
id:'1',
referenceNumber:'1.1'},
{
id:'2',
referenceNumber:'1'}],

[{
id:'3',
referenceNumber:'2'}]];


var target={
id:'2'};

var questions=(0,_mission.getRouteQuestions)(section,target);

questions.should.be.eql([{
id:'2',
referenceNumber:'1'},
{
id:'1',
referenceNumber:'1.1'}]);

});
});