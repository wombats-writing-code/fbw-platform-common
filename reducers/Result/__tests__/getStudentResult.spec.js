









var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);
var _reduxMockStore=require('redux-mock-store');var _reduxMockStore2=_interopRequireDefault(_reduxMockStore);



var _getStudentResult=require('../getStudentResult');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var chai=require('chai');var should=require('should');chai.should();chai.should();var _=require('lodash');var Q=require('q');var nock=require('nock');var middlewares=[_reduxThunk2['default']];var mockStore=(0,_reduxMockStore2['default'])(middlewares);

describe('getResults',function(){
afterEach(function(){
nock.cleanAll();
});

it('should call getResults and receive a list of records for a user',function(done){
var USER={
Identifier:1145645};


var MISSION={
id:'fooMission'};


nock('http://localhost:8888').
get('/l4/results?missionId='+MISSION.id+'&reconstruction=true&userId='+USER.Identifier).
reply(200,['1','2']);

var store=mockStore({});

store.dispatch((0,_getStudentResult.getStudentResult)({
student:USER,
mission:MISSION,
user:USER})).

then(function(res){


var actions=store.getActions();
actions.length.should.eql(2);
actions[0].type.should.eql(_getStudentResult.GET_STUDENT_RESULT_OPTIMISTIC);
actions[0].student.should.eql(USER);
actions[0].mission.should.eql(MISSION);

actions[1].type.should.eql(_getStudentResult.GET_STUDENT_RESULT_SUCCESS);
actions[1].student.should.eql(USER);
actions[1].mission.should.eql(MISSION);
actions[1].questions.should.eql(['1','2']);

done();
});
});
});