Object.defineProperty(exports,"__esModule",{value:true});exports.RECEIVE_CREATE_MISSIONS=exports.CREATE_MISSIONS_OPTIMISTIC=exports.RECEIVE_CREATE_MISSION=exports.CREATE_MISSION_OPTIMISTIC=undefined;exports.














receiveCreateMission=receiveCreateMission;exports.



createMissionOptimistic=createMissionOptimistic;exports.



createMissionsOptimistic=createMissionsOptimistic;exports.




receiveCreateMissions=receiveCreateMissions;exports.




createMission=createMission;exports.











createMissions=createMissions;exports.






















_createMission=_createMission;var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _axios=require('axios');var _axios2=_interopRequireDefault(_axios);var _q=require('q');var _q2=_interopRequireDefault(_q);var _utilities=require('../../utilities');var _time=require('../../utilities/time');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var CREATE_MISSION_OPTIMISTIC=exports.CREATE_MISSION_OPTIMISTIC='CREATE_MISSION_OPTIMISTIC';var RECEIVE_CREATE_MISSION=exports.RECEIVE_CREATE_MISSION='RECEIVE_CREATE_MISSION';var CREATE_MISSIONS_OPTIMISTIC=exports.CREATE_MISSIONS_OPTIMISTIC='CREATE_MISSIONS_OPTIMISTIC';var RECEIVE_CREATE_MISSIONS=exports.RECEIVE_CREATE_MISSIONS='RECEIVE_CREATE_MISSIONS';function receiveCreateMission(mission){return{type:RECEIVE_CREATE_MISSION,mission:mission};}function createMissionOptimistic(){return{type:CREATE_MISSION_OPTIMISTIC};}function createMissionsOptimistic(){return{type:CREATE_MISSIONS_OPTIMISTIC};}function receiveCreateMissions(missions){return{type:RECEIVE_CREATE_MISSIONS,missions:missions};}function createMission(mission,course,user){return function(dispatch){dispatch(createMissionOptimistic());return _createMission(mission,course,user).then(function(mission){dispatch(receiveCreateMission(mission));return mission;});};}function createMissions(missions,course,user){return function(dispatch){dispatch(createMissionsOptimistic());return(0,_axios2['default'])({method:'POST',url:(0,_utilities.getDomain)()+'/l4/missions-bulk/',data:{missions:missions,courseId:course.Id||course.Identifier},headers:{'x-fbw-user':user.Identifier}}).then(function(res){dispatch(receiveCreateMissions(res.data));return res.data;});};}function _createMission(mission,course,user){
if(!mission){
throw new TypeError('mission object must be provided to createMission');
}

if(!course){
throw new TypeError('course object must be provided to createMission');
}

if(!user){
throw new TypeError('course object must be provided to createMission');
}

return(0,_axios2['default'])({
data:{
mission:{
displayName:mission.displayName,
description:mission.description,
type:mission.type,
startTime:mission.startTime,
deadline:mission.deadline,
goals:mission.goals,
followsFromMissions:mission.followsFromMissions},

courseId:course.Id||course.Identifier},

method:'POST',
url:(0,_utilities.getDomain)()+'/l4/missions/',
headers:{
'x-fbw-user':user.Identifier}}).


then(function(response){
return response.data;
})['catch'](
function(error){
console.log('error creating mission',error);
return error;
});
}