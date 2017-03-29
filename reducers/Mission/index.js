Object.defineProperty(exports,"__esModule",{value:true});exports.missionConfig=undefined;var _typeof=typeof Symbol==="function"&&typeof(typeof Symbol==='function'?Symbol.iterator:'@@iterator')==="symbol"?function(obj){return typeof obj;}:function(obj){return obj&&typeof Symbol==="function"&&obj.constructor===Symbol&&obj!==(typeof Symbol==='function'?Symbol.prototype:'@@prototype')?"symbol":typeof obj;};exports['default']=































missionReducer;var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _selectors=require('../../selectors');var _selectMission=require('./selectMission');var _getMissions=require('./getMissions');var _selectOpenMission=require('./selectOpenMission');var _selectClosedMission=require('./selectClosedMission');var _submitResponse=require('./submitResponse');var _showAnswer=require('./showAnswer');var _createMission=require('../edit-mission/createMission');var _updateMission=require('../edit-mission/updateMission');var _deleteMission=require('../edit-mission/deleteMission');var _getStudentResult=require('../Result/getStudentResult');var _selectDirective=require('./selectDirective');var _selectTarget=require('./selectTarget');var _selectChoice=require('./selectChoice');var _selectCourse=require('../Course/selectCourse');var _logOutUser=require('../Login/logOutUser');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var initialState={currentDirectiveIndex:0};function missionReducer(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:initialState;var action=arguments[1];var

































target;var



















































target;var































target;var _ret=function(){switch(action.type){case _getMissions.GET_MISSIONS_OPTIMISTIC:return{v:_lodash2['default'].assign({},state,{currentMission:null,missions:[],isGetMissionsInProgress:true})};case _getMissions.RECEIVE_MISSIONS:return{v:_lodash2['default'].assign({},state,{missions:action.missions,isGetMissionsInProgress:false,currentMission:null})};case _selectCourse.SELECT_COURSE:return{v:_lodash2['default'].assign({},state,{missions:null})};case _selectMission.SELECT_MISSION:return{v:_lodash2['default'].assign({},state,{currentMission:action.mission,currentDirectiveIndex:0})};case _selectOpenMission.CREATE_TAKE_MISSION_OPTIMISTIC:return{v:_lodash2['default'].assign({},state,{currentMission:action.mission,isGetMissionInProgress:true})};case _selectOpenMission.RECEIVE_CREATE_TAKE_MISSION:if(action.mission&&action.mission.questions[0]&&action.mission.questions[0][0]){target=action.mission.questions[0][0][0];}return{v:_lodash2['default'].assign({},state,{currentMission:action.mission,currentDirectiveIndex:0,currentTarget:target,isGetMissionInProgress:false})};case _createMission.RECEIVE_CREATE_MISSION:return{v:_lodash2['default'].assign({},state,{currentMission:action.mission,missions:_lodash2['default'].compact(_lodash2['default'].concat(action.mission,state.missions))})};case _createMission.RECEIVE_CREATE_MISSIONS:var newMissions=_lodash2['default'].compact(action.missions);var newMissionIds=_lodash2['default'].map(newMissions,'id');var followsFromMissions=newMissions[0]?newMissions[0].followsFromMissions:[];var allMissions=_lodash2['default'].concat(newMissions,state.missions);return{v:_lodash2['default'].assign({},state,{missions:_lodash2['default'].map(allMissions,function(mission){if(followsFromMissions.indexOf(mission.id)>-1){return _lodash2['default'].assign({},mission,{leadsToMissions:newMissionIds});}return mission;}),currentMission:_lodash2['default'].assign({},_lodash2['default'].find(state.missions,{id:followsFromMissions[0]}),{leadsToMissions:newMissionIds})})};case _deleteMission.RECEIVE_DELETE_MISSION:return{v:_lodash2['default'].assign({},state,{currentMission:null,missions:_lodash2['default'].filter(state.missions,function(m){return m.id!==action.mission.id;})})};case _selectDirective.SELECT_DIRECTIVE:var currentMission=state.currentMission;if(currentMission&&currentMission.questions[0]&&currentMission.questions[0][0]){target=currentMission.questions[action.directiveIndex][0][0];}return{v:_lodash2['default'].assign({},state,{currentDirectiveIndex:action.directiveIndex,currentTarget:target,selectedChoiceId:null})};case _selectTarget.SELECT_TARGET:return{v:_lodash2['default'].assign({},state,{currentTarget:action.target,questionListHeight:0,selectedChoiceId:null})};case _selectClosedMission.GET_CLOSED_MISSION_OPTIMISTIC:return{v:_lodash2['default'].assign({},state,{currentMission:action.mission,currentDirectiveIndex:0,currentTarget:null,isGetMissionInProgress:true})};case _selectClosedMission.RECEIVE_CLOSED_MISSION:var mission=_lodash2['default'].assign({},action.mission,{questions:action.questions});
if(mission.questions&&mission.questions[0]&&mission.questions[0][0]){
target=mission.questions[0][0][0];
}

return{v:_lodash2['default'].assign({},state,{
currentMission:mission,
currentDirectiveIndex:0,
currentTarget:target,
isGetMissionInProgress:false})};


case _submitResponse.SUBMIT_RESPONSE_OPTIMISTIC:
return{v:_lodash2['default'].assign({},state,{
isInProgressSubmitChoice:true,
selectedChoiceId:null})};


case _showAnswer.SHOW_ANSWER_OPTIMISTIC:
return{v:_lodash2['default'].assign({},state,{
isInProgressShowAnswer:true,
selectedChoiceId:null})};


case _submitResponse.RECEIVE_SUBMIT_RESPONSE:
return{v:_lodash2['default'].assign({},state,{
isInProgressSubmitChoice:false,
currentMission:_lodash2['default'].assign({},state.currentMission,{
questions:_lodash2['default'].map(state.currentMission.questions,function(section){
return _lodash2['default'].map(section,function(targetRoute){
var needsUpdate=void 0;
var route=_lodash2['default'].map(targetRoute,function(q){
if(q.instanceId===action.responseResult.question.instanceId){
needsUpdate=true;
return _lodash2['default'].assign({},action.responseResult.question,{
responded:true});

}

return q;
});

if(needsUpdate&&action.responseResult.nextQuestion){
route.push(action.responseResult.nextQuestion);
}

return route;
});
})})})};



case _selectChoice.SELECT_CHOICE:
return{v:_lodash2['default'].assign({},state,{
selectedChoiceId:action.choiceId})};


case _logOutUser.LOG_OUT:
return{v:_lodash2['default'].assign({},state,{
currentMission:null,
missions:null,
isGetMissionsInProgress:false})};


case _updateMission.RECEIVE_UPDATE_MISSION:
return{v:_lodash2['default'].assign({},state,{
missions:_lodash2['default'].map(state.missions,function(m){
if(m.id===action.mission.id){
return action.mission;
}

return m;
}),
currentMission:action.mission})};


case _getStudentResult.GET_STUDENT_RESULT_SUCCESS:
return{v:_lodash2['default'].assign({},state,{
currentMission:_lodash2['default'].assign({},action.mission,{
questions:action.questions})})};



default:
return{v:state};}}();if((typeof _ret==='undefined'?'undefined':_typeof(_ret))==="object")return _ret.v;

}

var missionConfig=exports.missionConfig={
PHASE_I_MISSION_TYPE:'PHASE_I_MISSION_TYPE',
PHASE_II_MISSION_TYPE:'PHASE_II_MISSION_TYPE'};