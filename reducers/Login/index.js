Object.defineProperty(exports,"__esModule",{value:true});exports['default']=
















loginReducer;var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _authenticateD2L=require('./authenticateD2L');var _authenticateGuest=require('./authenticateGuest');var _registerUser=require('./registerUser');var _loginGuest=require('./loginGuest');var _resetPassword=require('./resetPassword');var _setNewPassword=require('./setNewPassword');var _resendVerificationEmail=require('./resendVerificationEmail');var _logOutUser=require('./logOutUser');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var initialState=stampNullUser();function loginReducer(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:initialState;var action=arguments[1];
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
failedRegisterUser:true,
errorMessage:action.error.response.data.indexOf('unverified')>-1?
'Username registered but unverified':
'Username exists. Did you forget your password?'});


case _loginGuest.FAILED_LOGIN_GUEST:
return _lodash2['default'].assign({},state,{
isLoggedIn:false,
logInError:true,
errorMessage:'Failed login'});


case _resetPassword.RESET_PASSWORD_OPTIMISTIC:
return _lodash2['default'].assign({},state,{
sendingEmail:true,
sentEmail:false,
resetPasswordFailed:false});


case _resetPassword.RECEIVE_RESET_PASSWORD:
return _lodash2['default'].assign({},state,{
sendingEmail:false,
sentEmail:true,
resetPasswordFailed:false});


case _resetPassword.FAILED_RESET_PASSWORD:
return _lodash2['default'].assign({},state,{
sendingEmail:false,
sentEmail:true,
resetPasswordFailed:true});


case _setNewPassword.SET_NEW_PASSWORD_OPTIMISTIC:
return _lodash2['default'].assign({},state,{
setNewPasswordFailed:false,
setNewPasswordDone:false});


case _setNewPassword.RECEIVE_SET_NEW_PASSWORD:
return _lodash2['default'].assign({},state,{
setNewPasswordDone:true});


case _setNewPassword.FAILED_SET_NEW_PASSWORD:
return _lodash2['default'].assign({},state,{
setNewPasswordFailed:true});


case _resendVerificationEmail.RESEND_VERIFICATION_EMAIL_OPTIMISTIC:
return _lodash2['default'].assign({},state,{
sendingEmail:true,
sentEmail:false,
resendVerificationEmailFailed:false});


case _resendVerificationEmail.RECEIVE_RESEND_VERIFICATION_EMAIL:
return _lodash2['default'].assign({},state,{
sendingEmail:false,
sentEmail:true,
resendVerificationEmailFailed:false});


case _resendVerificationEmail.FAILED_RESEND_VERIFICATION_EMAIL:
return _lodash2['default'].assign({},state,{
sendingEmail:false,
resendVerificationEmailFailed:true});


case _registerUser.REGISTER_USER_OPTIMISTIC:
return _lodash2['default'].assign({},state,{
isLoggedIn:false,
logInError:false,
failedRegisterUser:false,
errorMessage:null});


case _loginGuest.LOGIN_GUEST_OPTIMISTIC:
return _lodash2['default'].assign({},state,{
isLoggedIn:false,
logInError:false,
errorMessage:null});


case _registerUser.RECEIVE_REGISTER_USER:
return _lodash2['default'].assign({},state,{
user:action.user,
emailVerificationRequired:true});


default:
return state;}

}

function stampNullUser(){
return{
user:{},

isLoggedIn:false,
logInError:false,
isLoginInProgress:false,
emailVerificationRequired:false};

}