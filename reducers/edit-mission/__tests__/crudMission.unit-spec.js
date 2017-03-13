var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _moment=require('moment');var _moment2=_interopRequireDefault(_moment);
var _q=require('q');var _q2=_interopRequireDefault(_q);
var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);
var _reduxMockStore=require('redux-mock-store');var _reduxMockStore2=_interopRequireDefault(_reduxMockStore);



var _nock=require('nock');var _nock2=_interopRequireDefault(_nock);


var _createMission=require('../createMission');



var _updateMission=require('../updateMission');



var _deleteMission=require('../deleteMission');
var _Mission=require('../../Mission');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var middlewares=[_reduxThunk2['default']];var mockStore=(0,_reduxMockStore2['default'])(middlewares);var should=require('should');



var user={
Identifier:1145644};


describe('createMission, deleteMission actions',function(){

afterEach(function(){
_nock2['default'].cleanAll();
});

var testMission=void 0;
it('should create a phase 1 mission upon calling createMission',function(done){
var store=mockStore({});
var mission={
displayName:'platform unit test',
type:_Mission.missionConfig.PHASE_I_MISSION_TYPE,
startTime:(0,_moment2['default'])(),
deadline:(0,_moment2['default'])().add(7,'d'),
goals:[1,2,3]};


var course={
Id:"1724986"};


(0,_nock2['default'])('http://localhost:8888').
post('/l4/missions/').
reply(200,mission);


store.dispatch((0,_createMission.createMission)(mission,course,user)).
then(function(res){
var actions=store.getActions();
actions.length.should.eql(2);
actions[0].type.should.eql(_createMission.CREATE_MISSION_OPTIMISTIC);
actions[1].type.should.eql(_createMission.RECEIVE_CREATE_MISSION);
actions[1].mission.displayName.should.eql('platform unit test');

testMission=actions[1].mission;
testMission.id=actions[1].mission._id;

done();
})['catch'](
function(err){
console.log(err);
done();
});
});

it('should update a mission upon calling updateMission',function(done){
var store=mockStore({});
var mission={
id:'12345678',
displayName:'updated platform unit test',
type:_Mission.missionConfig.PHASE_I_MISSION_TYPE,
startTime:(0,_moment2['default'])(),
deadline:(0,_moment2['default'])().add(7,'d'),
goals:[1,2,3]};


var course={
Id:"1724986"};


(0,_nock2['default'])('http://localhost:8888').
put('/l4/missions/12345678/').
reply(200,mission);


store.dispatch((0,_updateMission.updateMission)(mission,user)).
then(function(res){
var actions=store.getActions();
actions.length.should.eql(2);
actions[0].type.should.eql(_updateMission.UPDATE_MISSION_OPTIMISTIC);
actions[1].type.should.eql(_updateMission.RECEIVE_UPDATE_MISSION);
actions[1].mission.displayName.should.eql('updated platform unit test');

done();
})['catch'](
function(err){
console.log(err);
done();
});
});

var phase2Missions=void 0;
it('should create an array of phase 2 missions upon calling createMissions',function(done){
(0,_nock2['default'])('http://localhost:8888').
post('/l4/missions-bulk/').
reply(200,['mission1','mission2']);

var store=mockStore({});
var missions=[
{
displayName:'crud phase 2 platform unit test',
description:'for nutter',
type:_Mission.missionConfig.PHASE_II_MISSION_TYPE,
startTime:(0,_moment2['default'])(),
deadline:(0,_moment2['default'])().add(7,'d'),
goals:[1,2],
userId:1145644},

{
displayName:'crud phase 2 platform unit test',
description:'for shea',
type:_Mission.missionConfig.PHASE_II_MISSION_TYPE,
startTime:(0,_moment2['default'])(),
deadline:(0,_moment2['default'])().add(7,'d'),
goals:[1],
userId:1145645}];



var course={
Id:"1724986"};


store.dispatch((0,_createMission.createMissions)(missions,course,user)).
then(function(res){
var actions=store.getActions();
actions.length.should.eql(2);
actions[0].type.should.eql(_createMission.CREATE_MISSIONS_OPTIMISTIC);
actions[1].type.should.eql(_createMission.RECEIVE_CREATE_MISSIONS);
actions[1].missions.length.should.eql(missions.length);

phase2Missions=actions[1].missions;

done();
})['catch'](
function(err){
console.log(err);
done();
});
});

it('should update the newly-created phase II missions',function(done){
var missions=[
{name:'foo'},
{name:'bar'}];


(0,_nock2['default'])('http://localhost:8888').
post('/l4/missions-bulk/').
reply(200,missions);

var store=mockStore({});

store.dispatch((0,_updateMission.updateMissions)(missions,user)).
then(function(res){
var actions=store.getActions();
actions.length.should.eql(2);
actions[0].type.should.eql(_updateMission.UPDATE_MISSIONS_OPTIMISTIC);
actions[1].type.should.eql(_updateMission.RECEIVE_UPDATE_MISSIONS);
actions[1].missions.length.should.eql(missions.length);

done();
})['catch'](
function(err){
console.log(err);
done();
});
});

it('should delete a mission upon calling deleteMission',function(done){
var mission={id:'bar'};

(0,_nock2['default'])('http://localhost:8888')['delete']('/l4/missions/bar').

reply(200,mission);

var store=mockStore({});

store.dispatch((0,_deleteMission.deleteMission)(mission,user)).
then(function(res){
var actions=store.getActions();
actions.length.should.eql(2);
actions[1].mission.id.should.eql('bar');

done();
})['catch'](
function(err){
console.log(err);
done();
});
});

});