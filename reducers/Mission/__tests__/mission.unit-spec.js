var _index=require('../index');var _index2=_interopRequireDefault(_index);







var _getMissions=require('../getMissions');
var _selectDirective=require('../selectDirective');
var _selectTarget=require('../selectTarget');
var _submitResponse=require('../submitResponse');
var _selectOpenMission=require('../selectOpenMission');
var _selectClosedMission=require('../selectClosedMission');

var _createMission=require('../../edit-mission/createMission');
var _deleteMission=require('../../edit-mission/deleteMission');
var _logOutUser=require('../../Login/logOutUser');

var _getStudentResult=require('../../Result/getStudentResult');
var _resetDashboardMission=require('../resetDashboardMission');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var chai=require('chai');var should=require('should');chai.should();var _=require('lodash');


describe('mission reducer',function(){
it('should update the missions in state upon RECEIVE_MISSIONS',function(){
var newState=(0,_index2['default'])([],{
type:_getMissions.RECEIVE_MISSIONS,
missions:['foo','bar']});


newState.missions.should.eql(['foo','bar']);
newState.isGetMissionsInProgress.should.eql(false);
});

it('should update the selected currentDirectiveIndex in state upon SELECT_DIRECTIVE',function(){
var newState=(0,_index2['default'])([],{
type:_selectDirective.SELECT_DIRECTIVE,
directiveIndex:3});


newState.currentDirectiveIndex.should.eql(3);

should.not.exist(newState.selectedChoiceId);
});

it('should update the selected currentTarget in state upon SELECT_TARGET',function(){
var target={name:'foo'};
var newState=(0,_index2['default'])([],{
type:_selectTarget.SELECT_TARGET,
target:target});


newState.currentTarget.should.eql(target);
should.not.exist(newState.selectedChoiceId);
});

it('should optimistically update state upon RECEIVE_CREATE_TAKE_MISSION_OPTIMISTIC',function(){
var newState=(0,_index2['default'])([],{
type:_selectOpenMission.CREATE_TAKE_MISSION_OPTIMISTIC,
mission:{name:'baz'}});


newState.currentMission.should.eql({name:'baz'});
newState.isGetMissionInProgress.should.eql(true);
});

it('should update state upon RECEIVE_CREATE_TAKE_MISSION',function(){
var newState=(0,_index2['default'])([],{
type:_selectOpenMission.RECEIVE_CREATE_TAKE_MISSION,
mission:{
name:'superman',
questions:[
[
['foo']]]}});





newState.currentMission.name.should.eql('superman');
newState.currentTarget.should.eql('foo');
newState.isGetMissionInProgress.should.eql(false);
});

it('should update state upon RECEIVE_CLOSED_MISSION',function(){
var newState=(0,_index2['default'])([],{
type:_selectClosedMission.RECEIVE_CLOSED_MISSION,
mission:{
name:'superman'},

questions:[
[
['foo']]]});




newState.currentMission.name.should.eql('superman');
newState.currentDirectiveIndex.should.eql(0);
newState.currentTarget.should.eql('foo');
newState.isGetMissionInProgress.should.eql(false);
});

it('should update the questions in state upon RECEIVE_SUBMIT_RESPONSE',function(){
var newState=(0,_index2['default'])({
currentMission:{
questions:[

[
[{instanceId:'0'}]],


[
[{instanceId:'12'},{instanceId:'1'}],
[{instanceId:'9'},{instanceId:'3'}]]]}},



{
type:_submitResponse.RECEIVE_SUBMIT_RESPONSE,
responseResult:{
question:{
instanceId:'1',
solution:'foo',
feedback:'bar',
response:{
isCorrect:false,
choice:{
id:'foo'}}}}});








newState.currentMission.questions[1][0][1].solution.should.eql('foo');
newState.currentMission.questions[1][0][1].feedback.should.eql('bar');
newState.currentMission.questions[1][0][1].responded.should.eql(true);
newState.currentMission.questions[1][0][1].response.isCorrect.should.eql(false);
newState.currentMission.questions[1][0][1].response.choice.should.be.a('object');

});

it('should update missions in state upon RECEIVE_DELETE_MISSION',function(){
var newState=(0,_index2['default'])({
missions:[
{id:'foo'},
{
id:'bar',
leadsToMissions:['foo']}],


currentMission:{
id:'superman',
leadsToMissions:['foo','bar']}},

{
type:_deleteMission.RECEIVE_DELETE_MISSION,
mission:{
id:'foo'}});



newState.missions.length.should.eql(1);
newState.missions[0].id.should.be.eql('bar');
newState.missions[0].leadsToMissions.should.eql([]);
newState.currentMission.leadsToMissions.should.eql(['bar']);
});

it('should update state upon RECEIVE_CREATE_MISSION action',function(){
var newState=(0,_index2['default'])({},{
type:_createMission.RECEIVE_CREATE_MISSION,
mission:{
name:'foo'}});



newState.missions.length.should.eql(1);
newState.currentMission.name.should.be.eql('foo');
});

it('should update state upon RECEIVE_CREATE_MISSIONS action',function(){
var newState=(0,_index2['default'])({
missions:[
{id:'1'},
{id:'2'}]},

{
type:_createMission.RECEIVE_CREATE_MISSIONS,
missions:[
{id:'foo',followsFromMissions:['1','2']},
{id:'baz',followsFromMissions:['1','2']},
{id:'bar',followsFromMissions:['1','2']}]});



_.find(newState.missions,{id:'1'}).leadsToMissions.should.be.eql(['foo','baz','bar']);
_.find(newState.missions,{id:'2'}).leadsToMissions.should.be.eql(['foo','baz','bar']);
newState.missions.length.should.eql(5);
newState.currentMission.leadsToMissions.should.be.eql(['foo','baz','bar']);
});

it('should update the current result state upon GET_STUDENT_RESULT_SUCCESS',function(){
var newState=(0,_index2['default'])({},{
type:_getStudentResult.GET_STUDENT_RESULT_SUCCESS,
student:'batman',
mission:{displayName:'foo'},
questions:[1,2]});


newState.currentMission.displayName.should.eql('foo');
newState.currentMission.questions.should.eql([1,2]);
});

it('should clear everything in this part of mission state upon LOG_OUT',function(){
var newState=(0,_index2['default'])({
missions:[],
currentMission:{name:'foo'},
isGetMissionsInProgress:true},
{
type:_logOutUser.LOG_OUT});


should.not.exist(newState.missions);
should.not.exist(newState.currentMission);
newState.isGetMissionsInProgress.should.eql(false);
});

it('should keep currentMission as phase when call RESET_DASHBOARD_MISSION',function(){
var originalMission={
name:'foo',
_id:123,
type:_index.missionConfig.PHASE_I_MISSION_TYPE};

var newState=(0,_index2['default'])({
missions:[{
_id:321,
type:_index.missionConfig.PHASE_II_MISSION_TYPE,
followsFromMissions:[123]}],

currentMission:originalMission},
{
type:_resetDashboardMission.RESET_DASHBOARD_MISSION,
mission:originalMission});


newState.currentMission.should.eql(originalMission);
});

it('should find the followsFrom phase I on RESET_DASHBOARD_MISSION, when currentMission is phase II',function(){
var originalMission={
name:'foo',
_id:123,
type:_index.missionConfig.PHASE_I_MISSION_TYPE};

var phaseIIMission={
_id:124,
type:_index.missionConfig.PHASE_II_MISSION_TYPE,
followsFromMissions:[123]};

var newState=(0,_index2['default'])({
missions:[{
_id:125,
type:_index.missionConfig.PHASE_I_MISSION_TYPE},

originalMission,phaseIIMission],
currentMission:phaseIIMission},
{
type:_resetDashboardMission.RESET_DASHBOARD_MISSION,
mission:phaseIIMission});


newState.currentMission.should.eql(originalMission);
});

it('should do nothing on RESET_DASHBOARD_MISSION, when currentMission is undefined',function(){
var originalMission={
name:'foo',
_id:123,
type:_index.missionConfig.PHASE_I_MISSION_TYPE};

var phaseIIMission={
_id:124,
type:_index.missionConfig.PHASE_II_MISSION_TYPE,
followsFromMissions:[123]};

var newState=(0,_index2['default'])({
missions:[{
_id:125,
type:_index.missionConfig.PHASE_I_MISSION_TYPE},

originalMission,phaseIIMission],
currentMission:phaseIIMission},
{
type:_resetDashboardMission.RESET_DASHBOARD_MISSION,
mission:null});


newState.currentMission.should.eql(phaseIIMission);
});
});