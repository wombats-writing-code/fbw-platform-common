Object.defineProperty(exports,"__esModule",{value:true});exports.RECEIVE_SHOW_ANSWER=exports.SHOW_ANSWER_OPTIMISTIC=undefined;exports.
















receiveShowAnswer=receiveShowAnswer;exports.



showAnswerOptimistic=showAnswerOptimistic;exports.



showAnswer=showAnswer;var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _axios=require('axios');var _axios2=_interopRequireDefault(_axios);var _utilities=require('../../utilities');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var SHOW_ANSWER_OPTIMISTIC=exports.SHOW_ANSWER_OPTIMISTIC='SHOW_ANSWER_OPTIMISTIC';var RECEIVE_SHOW_ANSWER=exports.RECEIVE_SHOW_ANSWER='RECEIVE_SHOW_ANSWER';function receiveShowAnswer(response){return{type:RECEIVE_SHOW_ANSWER,response:response};}function showAnswerOptimistic(data){return{type:SHOW_ANSWER_OPTIMISTIC,data:data};}function showAnswer(data){

return function(dispatch){
dispatch(showAnswerOptimistic());

var options={
url:(0,_utilities.getDomain)()+'/middleman/banks/'+data.bankId+'/takens/'+data.section.id+'/questions/'+data.questionId+'/surrender',
method:'POST',
headers:{
'x-fbw-username':data.username}};



return(0,_axios2['default'])(options).
then(function(results){


var response=results.data;
response.showAnswer=true;
response.questionId=data.questionId;
response.choiceIds=[data.choiceId];
return convertImagePaths(response);
}).
then(function(convertedResponse){

dispatch(receiveShowAnswer(convertedResponse));
return convertedResponse;
})['catch'](
function(error){
console.log('error submitting show answer',error);
});
};
}