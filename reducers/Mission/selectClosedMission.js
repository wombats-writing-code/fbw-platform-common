Object.defineProperty(exports,"__esModule",{value:true});exports.GET_CLOSED_MISSION_OPTIMISTIC=exports.RECEIVE_CLOSED_MISSION=undefined;exports.















receiveClosedMission=receiveClosedMission;exports.



getClosedMissionOptimistic=getClosedMissionOptimistic;exports.



selectClosedMission=selectClosedMission;var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _axios=require('axios');var _axios2=_interopRequireDefault(_axios);var _q=require('q');var _q2=_interopRequireDefault(_q);var _utilities=require('../../utilities');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var RECEIVE_CLOSED_MISSION=exports.RECEIVE_CLOSED_MISSION='RECEIVE_CLOSED_MISSION';var GET_CLOSED_MISSION_OPTIMISTIC=exports.GET_CLOSED_MISSION_OPTIMISTIC='GET_CLOSED_MISSION_OPTIMISTIC';function receiveClosedMission(mission,questions){return{type:RECEIVE_CLOSED_MISSION,mission:mission,questions:questions};}function getClosedMissionOptimistic(mission){return{type:GET_CLOSED_MISSION_OPTIMISTIC,mission:mission};}function selectClosedMission(data){
return function(dispatch){

dispatch(getClosedMissionOptimistic(data.mission));



return(0,_axios2['default'])({
url:(0,_utilities.getDomain)()+'/l4/results?missionId='+data.mission._id+'&userId='+data.user.Identifier+'&reconstruction=true',
headers:{
'x-fbw-user':data.user.Identifier}}).


then(function(res){
dispatch(receiveClosedMission(data.mission,res.data));
return res.data;
});
};
}