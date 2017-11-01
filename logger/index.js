Object.defineProperty(exports,"__esModule",{value:true});
var _getMissions=require('../reducers/Mission/getMissions');
var _selectOpenMission=require('../reducers/Mission/selectOpenMission');
var _selectDirective=require('../reducers/Mission/selectDirective');
var _selectTarget=require('../reducers/Mission/selectTarget');
var _logOutUser=require('../reducers/Login/logOutUser');
var _authenticateD2L=require('../reducers/Login/authenticateD2L');

var _login=require('../selectors/login');
var _course=require('../selectors/course');

var logger=function(){function logger(store){return function(next){return function(action){
if(window.ga){
var state=store.getState();
var course=(0,_course.getCurrentCourse)(state);
var userIdentifier=(0,_login.getD2LUserIdentifier)(state);



switch(action.type){
case _authenticateD2L.RECEIVE_AUTHENTICATE_D2L:
ga('set','userId',action.data.d2lUser.Identifier);
break;

case _getMissions.RECEIVE_MISSIONS:
try{
ga('send',{
hitType:'event',
eventAction:action.type,
eventCategory:course.name||course.displayName,
eventValue:userIdentifier});

}catch(e){
console.log(e);
}
break;

case _selectOpenMission.RECEIVE_CREATE_TAKE_MISSION:
try{
ga('send',{
hitType:'event',
eventAction:action.type,
eventCategory:state.mission.currentMission.displayName,
eventValue:userIdentifier});

}catch(e){
console.log(e);
}
break;

case _selectDirective.SELECT_DIRECTIVE:
try{
ga('send',{
hitType:'event',
eventAction:action.type,
eventCategory:action.directiveIndex,
eventValue:userIdentifier});

}catch(e){
console.log(e);
}
break;

case _selectTarget.SELECT_TARGET:
try{
ga('send',{
hitType:'event',
eventAction:action.type,
eventCategory:action.target.itemId,
eventValue:userIdentifier});

}catch(e){
console.log(e);
}
break;

case _logOutUser.LOG_OUT:
try{
ga('send',{
hitType:'event',
eventAction:action.type,
eventCategory:state.mission.currentMission?state.mission.currentMission.displayName:'',
eventValue:userIdentifier});

}catch(e){
console.log(e);
}
break;}

}


next(action);
};};}return logger;}();exports['default']=


logger;