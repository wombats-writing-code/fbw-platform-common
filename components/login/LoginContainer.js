Object.defineProperty(exports,"__esModule",{value:true});
var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _reactRedux=require('react-redux');

var _d2lutils=require('../../d2lutils');
var _authenticateD2L2=require('../../reducers/Login/authenticateD2L');
var _login=require('../../selectors/login');

var _authenticateGuest=require('../../reducers/Login/authenticateGuest');

var _logOutUser=require('../../reducers/Login/logOutUser');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}


var mapStateToProps=function(){function mapStateToProps(state,ownProps){


return{
d2lUserIdentifer:(0,_login.getD2LUserIdentifier)(state)};

}return mapStateToProps;}();

var mapDispatchToProps=function(){function mapDispatchToProps(dispatch,ownProps){
return{
logout:function(){function logout(){return dispatch((0,_logOutUser.logOutUser)());}return logout;}(),
authenticateD2L:function(){function authenticateD2L(D2LConfig,url){return dispatch((0,_authenticateD2L2.authenticateD2L)(D2LConfig,url));}return authenticateD2L;}()};

}return mapDispatchToProps;}();

var provider=function(){function provider(component,D2LConfig){
var mergeProps=function(){function mergeProps(stateProps,dispatchProps,ownProps){
return _lodash2['default'].assign({},stateProps,dispatchProps,ownProps,{
guestAuthenticationUrl:(0,_authenticateGuest.getGuestAuthenticationUrl)(),
authenticationUrl:(0,_d2lutils.getAuthenticationUrl)(D2LConfig),
D2LConfig:D2LConfig});

}return mergeProps;}();
return(0,_reactRedux.connect)(mapStateToProps,mapDispatchToProps,mergeProps)(component);
}return provider;}();exports['default']=

provider;