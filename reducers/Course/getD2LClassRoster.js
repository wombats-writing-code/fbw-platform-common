Object.defineProperty(exports,"__esModule",{value:true});exports.GET_D2L_CLASS_ROSTER_OPTIMISTIC=exports.RECEIVE_D2L_CLASS_ROSTER=undefined;exports.












receiveD2LClassRoster=receiveD2LClassRoster;exports.



getD2LClassRosterOptimistic=getD2LClassRosterOptimistic;exports.



getD2LClassRoster=getD2LClassRoster;exports.





































_getFbWUsers=_getFbWUsers;var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _q=require('q');var _q2=_interopRequireDefault(_q);var _axios=require('axios');var _axios2=_interopRequireDefault(_axios);var _utilities=require('../../utilities');var _getD2LClassRosterHelper=require('./_getD2LClassRosterHelper');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var RECEIVE_D2L_CLASS_ROSTER=exports.RECEIVE_D2L_CLASS_ROSTER='RECEIVE_D2L_CLASS_ROSTER';var GET_D2L_CLASS_ROSTER_OPTIMISTIC=exports.GET_D2L_CLASS_ROSTER_OPTIMISTIC='GET_D2L_CLASS_ROSTER_OPTIMISTIC';function receiveD2LClassRoster(roster){return{type:RECEIVE_D2L_CLASS_ROSTER,roster:roster};}function getD2LClassRosterOptimistic(){return{type:GET_D2L_CLASS_ROSTER_OPTIMISTIC};}function getD2LClassRoster(data){if(!data.D2LConfig){throw new TypeError('data must have a D2LConfig object');}if(!data.url){throw new TypeError('data must have a url string that is the d2l authenticatedUrl');}if(!data.courseId){throw new TypeError('data must have the course Identifier of the course');}return function(dispatch){dispatch(getD2LClassRosterOptimistic());var roster=void 0;return _q2['default'].when((0,_getD2LClassRosterHelper.classRoster)(data.D2LConfig,data.url,data.courseId)).then(function(res){roster=res;return _q2['default'].when(_getFbWUsers(data.user));}).then(function(response){var users=response;var rosterWithIds=_lodash2['default'].filter(_lodash2['default'].map(roster,function(person){return _lodash2['default'].assign({},_lodash2['default'].find(users,{Identifier:person.Identifier}));}),'id');console.log('rosterWithIds',rosterWithIds);dispatch(receiveD2LClassRoster(rosterWithIds));return rosterWithIds;});};}function _getFbWUsers(userObject){
return(0,_axios2['default'])({
url:(0,_utilities.getDomain)()+'/l4/users',
headers:{
'x-fbw-user':userObject.Identifier}}).


then(function(res){

return res.data;
})['catch'](
function(err){return console.log('err in _getFbWUsers');});
}