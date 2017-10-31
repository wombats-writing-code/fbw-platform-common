


var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);
var _reduxMockStore=require('redux-mock-store');var _reduxMockStore2=_interopRequireDefault(_reduxMockStore);


var _nock=require('nock');var _nock2=_interopRequireDefault(_nock);

var _index=require('../index');var _index2=_interopRequireDefault(_index);

var _selectOpenMission=require('../selectOpenMission');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var should=require('should');var _=require('lodash');var Q=require('q');var middlewares=[_reduxThunk2['default']];var mockStore=(0,_reduxMockStore2['default'])(middlewares);

describe('selectOpenMission',function(){
afterEach(function(){
_nock2['default'].cleanAll();
});

it('should call selectOpenMission and receive a mission with array of array of array of questions',function(done){
(0,_nock2['default'])('http://localhost:8888').
post('/l4/missions/58a302bcf36d2837a7c8042e').
reply(200,{
_id:'58a302bcf36d2837a7c8042e',
goals:['1','2'],
questions:[['bar'],['foo']]});


var store=mockStore({});

store.dispatch((0,_selectOpenMission.selectOpenMission)({
user:{
Identifier:1145645,
token:'123'},

mission:{
_id:'58a302bcf36d2837a7c8042e'},

course:{
Id:'1744153'}})).


then(function(res){
var mission=res;
var actions=store.getActions();
actions[0].type.should.eql(_selectOpenMission.CREATE_TAKE_MISSION_OPTIMISTIC);
actions[1].type.should.eql(_selectOpenMission.RECEIVE_CREATE_TAKE_MISSION);
actions[1].mission._id.should.eql('58a302bcf36d2837a7c8042e');





mission._id.should.be.eql('58a302bcf36d2837a7c8042e');
mission.goals.length.should.be.eql(2);
mission.questions.length.should.be.eql(2);

done();
});
});

});