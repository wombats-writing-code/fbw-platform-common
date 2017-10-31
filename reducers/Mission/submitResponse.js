Object.defineProperty(exports,"__esModule",{value:true});exports.RECEIVE_SUBMIT_RESPONSE=exports.SUBMIT_RESPONSE_OPTIMISTIC=undefined;exports.
















receiveSubmitResponse=receiveSubmitResponse;exports.



submitResponseOptimistic=submitResponseOptimistic;exports.



submitResponse=submitResponse;var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _axios=require('axios');var _axios2=_interopRequireDefault(_axios);var _utilities=require('../../utilities');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var SUBMIT_RESPONSE_OPTIMISTIC=exports.SUBMIT_RESPONSE_OPTIMISTIC='SUBMIT_RESPONSE_OPTIMISTIC';var RECEIVE_SUBMIT_RESPONSE=exports.RECEIVE_SUBMIT_RESPONSE='RECEIVE_SUBMIT_RESPONSE';function receiveSubmitResponse(responseResult){return{type:RECEIVE_SUBMIT_RESPONSE,responseResult:responseResult};}function submitResponseOptimistic(data){return{type:SUBMIT_RESPONSE_OPTIMISTIC,data:data};}function submitResponse(data){

return function(dispatch){
_validate(data);
dispatch(submitResponseOptimistic());

var options={
url:(0,_utilities.getDomain)()+'/l4/respond',
method:'POST',
data:{
choice:data.choice,
question:data.question,
responseHistory:data.responseHistory,
missionId:data.mission._id},

headers:{
'x-fbw-user':data.user.Identifier,
'x-fbw-token':data.user.token}};



return(0,_axios2['default'])(options).
then(function(res){
dispatch(receiveSubmitResponse(res.data));
return res.data;
})['catch'](
function(error){
console.log('error submitting response',error);
});
};
}

function _validate(data){
if(!data.mission){
throw new TypeError('mission must be provided');
}

if(!data.responseHistory){
throw new TypeError('responseHistory must be an array of the route\'s questions');
}

if(!data.question){
throw new TypeError('question must be non-null');
}

if(!data.choice){
throw new TypeError('choice must be non-null');
}

if(!data.user){
throw new TypeError('user must be non-null');
}
}