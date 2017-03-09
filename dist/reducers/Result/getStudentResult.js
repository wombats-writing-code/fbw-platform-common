Object.defineProperty(exports,"__esModule",{value:true});exports.GET_STUDENT_RESULT_SUCCESS=exports.GET_STUDENT_RESULT_OPTIMISTIC=undefined;exports.












getStudentResult=getStudentResult;var _axios=require('axios');var _axios2=_interopRequireDefault(_axios);var _utilities=require('../../utilities');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var GET_STUDENT_RESULT_OPTIMISTIC=exports.GET_STUDENT_RESULT_OPTIMISTIC='GET_STUDENT_RESULT_OPTIMISTIC';var GET_STUDENT_RESULT_SUCCESS=exports.GET_STUDENT_RESULT_SUCCESS='GET_STUDENT_RESULT_SUCCESS';function getStudentResultOptimistic(student,mission){return{type:GET_STUDENT_RESULT_OPTIMISTIC,student:student,mission:mission};}function getStudentResultSuccess(student,mission,questions){return{type:GET_STUDENT_RESULT_SUCCESS,student:student,mission:mission,questions:questions};}function getStudentResult(student,mission,user){
if(!student){
throw new Error('A student must be provided.');
}

return function(dispatch){
dispatch(getStudentResultOptimistic(student,mission));

return(0,_axios2['default'])({
url:(0,_utilities.getDomain)()+'/l4/results?missionId='+mission.id+'&reconstruction=true&userId='+student.Identifier,
headers:{
'x-fbw-user':user.Identifier}}).


then(function(res){
dispatch(getStudentResultSuccess(student,mission,res.data));
return res.data;
});
};
}