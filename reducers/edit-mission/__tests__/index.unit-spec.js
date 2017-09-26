var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _moment=require('moment');var _moment2=_interopRequireDefault(_moment);


var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);
var _reduxMockStore=require('redux-mock-store');var _reduxMockStore2=_interopRequireDefault(_reduxMockStore);




var _createMission=require('../createMission');
var _deleteMission=require('../deleteMission');
var _updateMission=require('../updateMission');
var _index=require('../index');var _index2=_interopRequireDefault(_index);
var _editMission=require('../editMission');
var _clickAddMission=require('../clickAddMission');
var _clickEditMission=require('../clickEditMission');







var _updateMissionForm=require('../updateMissionForm');




var _Mission=require('../../Mission');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}require('moment-timezone');var middlewares=[_reduxThunk2['default']];var mockStore=(0,_reduxMockStore2['default'])(middlewares);var should=require('should');


describe('edit-mission reducer',function(){

it('should update state upon the CREATE_MISSIONS_OPTIMISTIC action',function(){
var newState=(0,_index2['default'])({},{
type:_createMission.CREATE_MISSIONS_OPTIMISTIC,
mission:{displayName:'foo'}});


newState.isCreateMissionInProgress.displayName.should.eql('foo');
});

it('should update state upon the RECEIVE_CREATE_MISSION action',function(){
var newState=(0,_index2['default'])({},{
type:_createMission.RECEIVE_CREATE_MISSION,
mission:{displayName:'foo'}});


newState.newMission.displayName.should.eql('');
newState.isCreateMissionInProgress.should.eql(false);
});

it('should update state upon the RECEIVE_CREATE_MISSIONS action',function(){
var newState=(0,_index2['default'])({},{
type:_createMission.RECEIVE_CREATE_MISSIONS,
missions:[{displayName:'foo'},{displayName:'bar'}]});


newState.newMission.displayName.should.eql('');
newState.isCreateMissionInProgress.should.eql(false);
});

it('should update state upon the RECEIVE_UPDATE_MISSION action',function(){
var newState=(0,_index2['default'])({},{
type:_updateMission.RECEIVE_UPDATE_MISSION,
missions:[{displayName:'foo'}]});



newState.newMission.displayName.should.eql('');
newState.isUpdateMissionInProgress.should.eql(false);
newState.isEditMissionInProgress.should.eql(false);
});

it('should update state upon the RECEIVE_DELETE_MISSION action',function(){
var newState=(0,_index2['default'])({},{
type:_deleteMission.RECEIVE_DELETE_MISSION,
mission:{displayName:'foo'}});


newState.isDeleteMissionInProgress.should.eql(false);
});

it('should update state upon the CHANGE_MISSION_NAME action',function(){
var newState=(0,_index2['default'])({},{
type:_updateMissionForm.CHANGE_MISSION_NAME,
value:'wowza'});


newState.newMission.displayName.should.eql('wowza');
});

it('should update state upon the CHANGE_MISSION_TYPE action',function(){
var newState=(0,_index2['default'])({},{
type:_updateMissionForm.CHANGE_MISSION_TYPE,
missionType:_Mission.missionConfig.PHASE_II_MISSION_TYPE});


newState.newMission.type.should.eql(_Mission.missionConfig.PHASE_II_MISSION_TYPE);
newState.newMission.displayName.should.eql('');
newState.newMission.description.should.eql('');

});

it('should update state upon the CHANGE_MISSION_START action',function(){
var datetime=(0,_moment2['default'])();
var newState=(0,_index2['default'])({},{
type:_updateMissionForm.CHANGE_MISSION_START,
datetime:datetime});


newState.newMission.startTime.should.eql(datetime);
});

it('should update state upon the CHANGE_MISSION_END action',function(){
var datetime=(0,_moment2['default'])();
var newState=(0,_index2['default'])({},{
type:_updateMissionForm.CHANGE_MISSION_END,
datetime:datetime});


newState.newMission.deadline.should.eql(datetime);
});

it('should update state upon the SELECT_MODULE action',function(){
var newState=(0,_index2['default'])({},{
type:_updateMissionForm.SELECT_MODULE,
module:{name:'foo'}});


newState.selectedModule.should.eql({name:'foo'});
});

it('should update state upon the CHANGE_OUTCOME_SEARCH action',function(){
var newState=(0,_index2['default'])({},{
type:_updateMissionForm.CHANGE_OUTCOME_SEARCH,
query:'calculate'});


newState.outcomeQuery.should.eql('calculate');
});

it('should update state upon the TOGGLE_OUTCOME action',function(){
var toggleOnState=(0,_index2['default'])({
newMission:{
goals:[2]}},

{
type:_updateMissionForm.TOGGLE_OUTCOME,
outcome:{id:1}});


var toggleOffState=(0,_index2['default'])({
newMission:{
goals:[1,2]}},

{
type:_updateMissionForm.TOGGLE_OUTCOME,
outcome:{id:1}});


toggleOnState.newMission.goals.should.eql([2,1]);
toggleOffState.newMission.goals.should.eql([2]);
});

it('should update the state upon the CHANGE_FOLLOWS_FROM_MISSIONS action',function(){
var newState=(0,_index2['default'])({
newMission:{
followsFromMissions:[18,20]}},

{
type:_updateMissionForm.CHANGE_FOLLOWS_FROM_MISSIONS,
missions:[
{
id:1,
displayName:'foo'},

{
id:2,
displayName:'bar'}]});




newState.newMission.followsFromMissions.should.eql([1,2]);
});

it('should update the state upon the EDIT_MISSION action',function(){
var newState=(0,_index2['default'])({},{
type:_editMission.EDIT_MISSION,
mission:{
displayName:'foo'}});



newState.newMission.displayName.should.eql('foo');
});

it('should update the state upon the CLICK_ADD_MISSION action',function(){
var newState=(0,_index2['default'])({},{
type:_clickAddMission.CLICK_ADD_MISSION});


should.not.exist(newState.newMission.type);
newState.newMission.displayName.should.eql('');
newState.newMission.goals.should.eql([]);
});

it('should update the state upon the CLICK_EDIT_MISSION action',function(){
var newState=(0,_index2['default'])({},{
type:_clickEditMission.CLICK_EDIT_MISSION,
mission:{
displayName:'foo'}});



newState.newMission.displayName.should.eql('foo');
newState.isEditMissionInProgress.should.eql(true);
});

it('should update the state upon the CANCEL_EDIT_MISSION action',function(){
var newState=(0,_index2['default'])({},{
type:_clickEditMission.CANCEL_EDIT_MISSION});



newState.isEditMissionInProgress.should.eql(false);
});

it('should update state upon the MOVE_OUTCOME_UP action',function(){
var unusedGoal=(0,_index2['default'])({
newMission:{
goals:[2]}},

{
type:_updateMissionForm.MOVE_OUTCOME_UP,
outcome:{id:1}});


unusedGoal.newMission.goals.should.eql([2]);

var firstGoal=(0,_index2['default'])({
newMission:{
goals:[1,2]}},

{
type:_updateMissionForm.MOVE_OUTCOME_UP,
outcome:{id:1}});


firstGoal.newMission.goals.should.eql([1,2]);

var secondGoal=(0,_index2['default'])({
newMission:{
goals:[1,2]}},

{
type:_updateMissionForm.MOVE_OUTCOME_UP,
outcome:{id:2}});


secondGoal.newMission.goals.should.eql([2,1]);

var thirdGoal=(0,_index2['default'])({
newMission:{
goals:[1,2,3]}},

{
type:_updateMissionForm.MOVE_OUTCOME_UP,
outcome:{id:3}});


thirdGoal.newMission.goals.should.eql([1,3,2]);
});

it('should update state upon the MOVE_OUTCOME_DOWN action',function(){
var unusedGoal=(0,_index2['default'])({
newMission:{
goals:[2]}},

{
type:_updateMissionForm.MOVE_OUTCOME_DOWN,
outcome:{id:1}});


unusedGoal.newMission.goals.should.eql([2]);

var firstGoal=(0,_index2['default'])({
newMission:{
goals:[1,2]}},

{
type:_updateMissionForm.MOVE_OUTCOME_DOWN,
outcome:{id:1}});


firstGoal.newMission.goals.should.eql([2,1]);

var secondGoal=(0,_index2['default'])({
newMission:{
goals:[1,2]}},

{
type:_updateMissionForm.MOVE_OUTCOME_DOWN,
outcome:{id:2}});


secondGoal.newMission.goals.should.eql([1,2]);

var thirdGoal=(0,_index2['default'])({
newMission:{
goals:[1,2,3]}},

{
type:_updateMissionForm.MOVE_OUTCOME_DOWN,
outcome:{id:1}});


thirdGoal.newMission.goals.should.eql([2,1,3]);
});
});