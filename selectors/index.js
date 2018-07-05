Object.defineProperty(exports,"__esModule",{value:true});
var getUser=exports.getUser=function(){function getUser(state){return state.login.user.d2lUser;}return getUser;}();

var isLoggedIn=exports.isLoggedIn=function(){function isLoggedIn(state){return state.login.isLoggedIn;}return isLoggedIn;}();

var failedLogIn=exports.failedLogIn=function(){function failedLogIn(state){return state.login.logInError;}return failedLogIn;}();

var getD2LToken=exports.getD2LToken=function(){function getD2LToken(state){return state.login.user.d2l?state.login.user.d2l.authenticatedUrl:null;}return getD2LToken;}();

var getMapping=exports.getMapping=function(){function getMapping(state){return state.mapping;}return getMapping;}();

var getCourses=exports.getCourses=function(){function getCourses(state){return state.course.courses;}return getCourses;}();

var getPhaseIResults=exports.getPhaseIResults=function(){function getPhaseIResults(state){return state.result.phaseIResults;}return getPhaseIResults;}();

var getPhaseIIResults=exports.getPhaseIIResults=function(){function getPhaseIIResults(state){return state.result.phaseIIResults;}return getPhaseIIResults;}();

var isInstructorApp=exports.isInstructorApp=function(){function isInstructorApp(){return window.location.hostname.indexOf('instructor')>-1;}return isInstructorApp;}();