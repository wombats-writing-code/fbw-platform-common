Object.defineProperty(exports,"__esModule",{value:true});var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _reactRedux=require('react-redux');
var _GuestCallback=require('./web/GuestCallback');var _GuestCallback2=_interopRequireDefault(_GuestCallback);

var _authenticateGuest2=require('../../reducers/Login/authenticateGuest');
var _selectors=require('../../selectors');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}

var mapStateToProps=function(){function mapStateToProps(state,ownProps){
return{
failedLogIn:(0,_selectors.failedLogIn)(state)};

}return mapStateToProps;}();

var mapDispatchToProps=function(){function mapDispatchToProps(dispatch,ownProps){
return{
authenticateGuest:function(){function authenticateGuest(credentials,name){return dispatch((0,_authenticateGuest2.authenticateGuest)(credentials,name));}return authenticateGuest;}()};

}return mapDispatchToProps;}();

var provider=function(){function provider(component,credentials){
var mergeProps=function(){function mergeProps(stateProps,dispatchProps,ownProps){
return _lodash2['default'].assign({},stateProps,dispatchProps,ownProps,{
credentials:credentials});

}return mergeProps;}();

return(0,_reactRedux.connect)(mapStateToProps,mapDispatchToProps,mergeProps)(component);
}return provider;}();exports['default']=

provider;