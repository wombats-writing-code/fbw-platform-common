Object.defineProperty(exports,"__esModule",{value:true});exports.RECEIVE_UPDATE_MISSIONS=exports.UPDATE_MISSIONS_OPTIMISTIC=exports.RECEIVE_UPDATE_MISSION=exports.UPDATE_MISSION_OPTIMISTIC=undefined;exports.










receiveUpdateMission=receiveUpdateMission;exports.



updateMissionOptimistic=updateMissionOptimistic;exports.



receiveUpdateMissions=receiveUpdateMissions;exports.



updateMissionsOptimistic=updateMissionsOptimistic;exports.



updateMission=updateMission;exports.























updateMissions=updateMissions;var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _axios=require('axios');var _axios2=_interopRequireDefault(_axios);var _utilities=require('../../utilities');var _time=require('../../utilities/time');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var UPDATE_MISSION_OPTIMISTIC=exports.UPDATE_MISSION_OPTIMISTIC='UPDATE_MISSION_OPTIMISTIC';var RECEIVE_UPDATE_MISSION=exports.RECEIVE_UPDATE_MISSION='RECEIVE_UPDATE_MISSION';var UPDATE_MISSIONS_OPTIMISTIC=exports.UPDATE_MISSIONS_OPTIMISTIC='UPDATE_MISSIONS_OPTIMISTIC';var RECEIVE_UPDATE_MISSIONS=exports.RECEIVE_UPDATE_MISSIONS='RECEIVE_UPDATE_MISSIONS';function receiveUpdateMission(mission){return{type:RECEIVE_UPDATE_MISSION,mission:mission};}function updateMissionOptimistic(mission){return{type:UPDATE_MISSION_OPTIMISTIC,mission:mission};}function receiveUpdateMissions(missions){return{type:RECEIVE_UPDATE_MISSIONS,missions:missions};}function updateMissionsOptimistic(missions){return{type:UPDATE_MISSIONS_OPTIMISTIC,missions:missions};}function updateMission(mission,user){return function(dispatch){dispatch(updateMissionOptimistic());return(0,_axios2['default'])({method:'PUT',url:(0,_utilities.getDomain)()+'/l4/missions/'+mission.id+'/',data:{mission:mission},headers:{'x-fbw-user':user.Identifier}}).then(function(res){dispatch(receiveUpdateMission(res.data));return res.data;})['catch'](function(error){console.log('error updating mission',error);});};}function updateMissions(missions,user){
return function(dispatch){
dispatch(updateMissionsOptimistic());

return(0,_axios2['default'])({
method:'PUT',
url:(0,_utilities.getDomain)()+'/l4/missions-bulk/',
data:{
missions:missions},

headers:{
'x-fbw-user':user.Identifier}}).


then(function(res){
dispatch(receiveUpdateMissions(res.data));
return res.data;
})['catch'](
function(error){
console.log('error updating missions',error);
});
};
}