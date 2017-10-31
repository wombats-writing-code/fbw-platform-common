Object.defineProperty(exports,"__esModule",{value:true});exports.DELETE_MISSION_OPTIMISTIC=exports.RECEIVE_DELETE_MISSION=undefined;exports.










receiveDeleteMission=receiveDeleteMission;exports.



deleteMissionOptimistic=deleteMissionOptimistic;exports.



deleteMission=deleteMission;var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);require('lodash');var _axios=require('axios');var _axios2=_interopRequireDefault(_axios);var _utilities=require('../../utilities');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var RECEIVE_DELETE_MISSION=exports.RECEIVE_DELETE_MISSION='RECEIVE_DELETE_MISSION';var DELETE_MISSION_OPTIMISTIC=exports.DELETE_MISSION_OPTIMISTIC='DELETE_MISSION_OPTIMISTIC';function receiveDeleteMission(mission){return{type:RECEIVE_DELETE_MISSION,mission:mission};}function deleteMissionOptimistic(data){return{type:DELETE_MISSION_OPTIMISTIC,data:data};}function deleteMission(mission,user){
if(!mission){
throw TypeError('whole mission object must be provided to deleteMission');
}

if(!user){
throw TypeError('user object must be provided to deleteMission');
}

return function(dispatch){
dispatch(deleteMissionOptimistic(mission));

return(0,_axios2['default'])({
method:'DELETE',
url:(0,_utilities.getDomain)()+'/l4/missions/'+mission.id,
headers:{
'x-fbw-user':user.Identifier,
'x-fbw-token':user.token}}).


then(function(results){
dispatch(receiveDeleteMission(mission));
return mission;
})['catch'](
function(error){
console.log('error deleting mission',error);
return error;
});
};
}