Object.defineProperty(exports,"__esModule",{value:true});exports['default']=























courseReducer;var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _selectCourse=require('./selectCourse');var _getItems=require('./getItems');var _getD2LClassRoster=require('./getD2LClassRoster');var _authenticateD2L=require('../Login/authenticateD2L');var _authenticateGuest=require('../Login/authenticateGuest');var _logOutUser=require('../Login/logOutUser');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var initialState={courses:[],currentCourse:null};function courseReducer(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:initialState;var action=arguments[1];
switch(action.type){
case _selectCourse.SELECT_COURSE:
return _lodash2['default'].assign({},state,{
currentCourse:action.course});


case _getItems.RECEIVE_ITEMS:
return _lodash2['default'].assign({},state,{
items:action.items});


case _authenticateGuest.RECEIVE_AUTHENTICATE_GUEST:
case _authenticateD2L.RECEIVE_AUTHENTICATE_D2L:

return _lodash2['default'].assign({},state,{
courses:action.data.courses});


case _getD2LClassRoster.GET_D2L_CLASS_ROSTER_OPTIMISTIC:
return _lodash2['default'].assign({},state,{
isGetRosterInProgress:true,
roster:[]});


case _getD2LClassRoster.RECEIVE_D2L_CLASS_ROSTER:
return _lodash2['default'].assign({},state,{
isGetRosterInProgress:false,
roster:action.roster});


case _logOutUser.LOG_OUT:
return _lodash2['default'].assign({},state,{
courses:[],
currentCourse:null,
items:null,
isGetRosterInProgress:false});


default:
return state;}

}