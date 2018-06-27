Object.defineProperty(exports,"__esModule",{value:true});exports['default']=













loginReducer;var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _authenticateD2L=require('./authenticateD2L');var _authenticateGuest=require('./authenticateGuest');var _registerUser=require('./registerUser');var _loginGuest=require('./loginGuest');var _logOutUser=require('./logOutUser');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var initialState=stampNullUser();function loginReducer(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:initialState;var action=arguments[1];
switch(action.type){

case _authenticateGuest.RECEIVE_AUTHENTICATE_GUEST:
case _authenticateD2L.RECEIVE_AUTHENTICATE_D2L:
case _loginGuest.RECEIVE_LOGIN_GUEST:
return _lodash2['default'].assign({},state,{
user:_lodash2['default'].assign({},state.user,{
authenticatedUrl:action.data.url,
d2lUser:action.data.d2lUser}),

isLoggedIn:true});


case _logOutUser.LOG_OUT:
return _lodash2['default'].assign({},stampNullUser());

case _authenticateD2L.FAILED_AUTHENTICATE_D2L:
case _authenticateGuest.FAILED_AUTHENTICATE_GUEST:
return _lodash2['default'].assign({},state,{
isLoggedIn:false,
logInError:true});


case _registerUser.FAILED_REGISTER_USER:
return _lodash2['default'].assign({},state,{
isLoggedIn:false,
logInError:true,
errorMessage:'Username exists'});


case _loginGuest.FAILED_LOGIN_GUEST:
return _lodash2['default'].assign({},state,{
isLoggedIn:false,
logInError:true,
errorMessage:'Failed login'});


case _registerUser.REGISTER_USER_OPTIMISTIC:
case _loginGuest.LOGIN_GUEST_OPTIMISTIC:
return _lodash2['default'].assign({},state,{
isLoggedIn:false,
logInError:false,
errorMessage:null});


case _registerUser.RECEIVE_REGISTER_USER:
return _lodash2['default'].assign({},state,{
user:action.user});


default:
return state;}

}

function stampNullUser(){
return{
user:{},

isLoggedIn:false,
logInError:false,
isLoginInProgress:false};

}