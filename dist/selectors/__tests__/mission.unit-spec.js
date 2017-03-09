




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


});