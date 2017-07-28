




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


});