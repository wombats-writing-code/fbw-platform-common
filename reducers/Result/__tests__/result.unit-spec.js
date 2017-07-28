



var _index=require('../index');var _index2=_interopRequireDefault(_index);

var _getResults=require('../getResults');
var _getStudentResult=require('../getStudentResult');
var _createMission=require('../../edit-mission/createMission');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var chai=require('chai');var should=require('should');chai.should();

describe('result reducer',function(){

it('should update results and progress in state upon RECEIVE_RESULTS results',function(){
var newState=(0,_index2['default'])({},{
type:_getResults.RECEIVE_RESULTS,
results:[
{name:'baz',mission:'1'},
{name:'foo',mission:'1'}]});



newState.resultsByMission['1'][0].name.should.be.eql('baz');
newState.resultsByMission['1'][1].name.should.be.eql('foo');
newState.isGetResultsInProgress.should.be.eql(false);
});

it('should update the current result state upon GET_STUDENT_RESULT',function(){
var newState=(0,_index2['default'])({},{
type:_getStudentResult.GET_STUDENT_RESULT_SUCCESS,
student:'batman',
mission:{displayName:'foo'},
questions:[1,2]});


newState.currentStudent.should.eql('batman');
newState.currentMission.displayName.should.eql('foo');
newState.currentMission.questions.should.eql([1,2]);
newState.isGetStudentResultInProgress.should.eql(false);
});

it('should update the dictionary of results state upon RECEIVE_DELETE_MISSION',function(){
var newState=(0,_index2['default'])({
resultsByMission:{
foo:['1','2','3'],
bar:['another','series','of','records']}},

{
type:_createMission.RECEIVE_DELETE_MISSION,
mission:{id:'foo'}});


should.not.exist(newState.resultsByMission['foo']);
newState.resultsByMission['bar'].should.eql(['another','series','of','records']);
});

});