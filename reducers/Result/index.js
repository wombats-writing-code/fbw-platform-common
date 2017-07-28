Object.defineProperty(exports,"__esModule",{value:true});exports['default']=










resultReducer;var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _getResults=require('./getResults');var _getStudentResult=require('./getStudentResult');var _createMission=require('../edit-mission/createMission');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}var initialState={};function resultReducer(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:initialState;var action=arguments[1];
switch(action.type){

case _getResults.GET_RESULTS_OPTIMISTIC:
return _lodash2['default'].assign({},state,{
isGetResultsInProgress:true});


case _getResults.RECEIVE_RESULTS:
var groupedByMission=_lodash2['default'].groupBy(action.results,'mission');

return _lodash2['default'].assign({},state,{
resultsByMission:_lodash2['default'].assign({},state.resultsByMission,groupedByMission),
isGetResultsInProgress:false});


case _getStudentResult.GET_STUDENT_RESULT_OPTIMISTIC:
return _lodash2['default'].assign({},state,{
isGetStudentResultInProgress:true,
currentMission:null});


case _getStudentResult.GET_STUDENT_RESULT_SUCCESS:
return _lodash2['default'].assign({},state,{
currentStudent:action.student,
currentMission:_lodash2['default'].assign({},action.mission,{
questions:action.questions}),

isGetStudentResultInProgress:false});


case _createMission.CREATE_MISSION_OPTIMISTIC:
return _lodash2['default'].assign({},state,{
results:null});


case _createMission.RECEIVE_DELETE_MISSION:
console.log('update resultsByMission',action.mission.id);

return _lodash2['default'].assign({},state,{
resultsByMission:_lodash2['default'].assign({},state.resultsByMission,_defineProperty({},
action.mission.id,undefined))});




default:
return state;}

}