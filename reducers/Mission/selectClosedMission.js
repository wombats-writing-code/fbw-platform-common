Object.defineProperty(exports,"__esModule",{value:true});exports.GET_USER_MISSION_RESULTS_OPTIMISTIC=exports.RECEIVE_GET_USER_MISSION_RESULTS=undefined;exports.















receiveGetUserMissionResults=receiveGetUserMissionResults;exports.



getUserMissionResultsOptimistic=getUserMissionResultsOptimistic;exports.



selectClosedMission=selectClosedMission;var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _axios=require('axios');var _axios2=_interopRequireDefault(_axios);var _q=require('q');var _q2=_interopRequireDefault(_q);var _utilities=require('../../utilities');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var RECEIVE_GET_USER_MISSION_RESULTS=exports.RECEIVE_GET_USER_MISSION_RESULTS='RECEIVE_GET_USER_MISSION_RESULTS';var GET_USER_MISSION_RESULTS_OPTIMISTIC=exports.GET_USER_MISSION_RESULTS_OPTIMISTIC='GET_USER_MISSION_RESULTS_OPTIMISTIC';function receiveGetUserMissionResults(mission,resultsExistForUser){return{type:RECEIVE_GET_USER_MISSION_RESULTS,mission:mission,resultsExistForUser:resultsExistForUser};}function getUserMissionResultsOptimistic(mission){return{type:GET_USER_MISSION_RESULTS_OPTIMISTIC,mission:mission};}function selectClosedMission(data){
return function(dispatch){






dispatch(getUserMissionResultsOptimistic(data.mission));

var options={
url:(0,_utilities.getDomain)()+'/middleman/banks/'+data.bankId+'/offereds/'+data.mission.assessmentOfferedId+'/results',
headers:{
'x-fbw-username':data.username}};



var resultSections=void 0;
return(0,_axios2['default'])(options).
then(function(response){
resultSections=response.data;

return _q2['default'].when(convertImagePaths(resultSections));
}).
then(function(questionsWithImages){


dispatch(receiveGetUserMissionResults(questionsWithImages,true));

return questionsWithImages;
})['catch'](
function(error){


dispatch(receiveGetUserMissionResults(null,false));
});
};
}