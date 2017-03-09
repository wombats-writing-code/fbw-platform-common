Object.defineProperty(exports,"__esModule",{value:true});exports.RECEIVE_RESULTS=exports.GET_RESULTS_OPTIMISTIC=undefined;exports.












receiveResults=receiveResults;exports.



getResultsOptimistic=getResultsOptimistic;exports.









getResults=getResults;exports.


























getResultsBulk=getResultsBulk;var _axios=require('axios');var _axios2=_interopRequireDefault(_axios);var _q=require('q');var _q2=_interopRequireDefault(_q);var _utilities=require('../../utilities');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var GET_RESULTS_OPTIMISTIC=exports.GET_RESULTS_OPTIMISTIC='GET_RESULTS_OPTIMISTIC';var RECEIVE_RESULTS=exports.RECEIVE_RESULTS='RECEIVE_RESULTS';function receiveResults(results){return{type:RECEIVE_RESULTS,results:results};}function getResultsOptimistic(results){return{type:GET_RESULTS_OPTIMISTIC,results:results};}function getResults(data){if(!data.mission){throw new TypeError('getResults must be provided a mission object');}if(!data.user){throw new TypeError('getResults must be provided a user field');}return function(dispatch){dispatch(getResultsOptimistic());return _getResults(data.mission.id,data.user).then(function(results){dispatch(receiveResults(results.data));return results.data;})['catch'](function(error){console.log('error getting mission results',error);});};}function getResultsBulk(data){
var getResultsPromises=_.map(data.missions,function(id){return _getResults(id,data.user);});

return function(dispatch){
dispatch(getResultsOptimistic());

return _q2['default'].all(getResultsPromises).
then(function(res){
dispatch(receiveResults(_.flatten(_.map(res,'data'))));
return res.data;
})['catch'](
function(error){
console.log('error getting mission results bulk',error);
});
};

}


function _getResults(missionId,user){
return(0,_axios2['default'])({
url:(0,_utilities.getDomain)()+'/l4/results?missionId='+missionId,
headers:{
'x-fbw-user':user.Identifier}});


}