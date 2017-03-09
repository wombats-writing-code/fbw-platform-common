Object.defineProperty(exports,"__esModule",{value:true});var _reactRedux=require('react-redux');
var _D2LCallback=require('./web/D2LCallback');var _D2LCallback2=_interopRequireDefault(_D2LCallback);

var _authenticateD2L2=require('../../reducers/Login/authenticateD2L');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}

var mapStateToProps=function(){function mapStateToProps(state,ownProps){
return{};

}return mapStateToProps;}();

var mapDispatchToProps=function(){function mapDispatchToProps(dispatch,ownProps){
return{
authenticateD2L:function(){function authenticateD2L(credentials,optionalUrl){
dispatch((0,_authenticateD2L2.authenticateD2L)(credentials,optionalUrl));






}return authenticateD2L;}()};




}return mapDispatchToProps;}();




var provider=function(){function provider(component,credentials){
var mergeProps=function(){function mergeProps(stateProps,dispatchProps,ownProps){
return _.assign({},stateProps,dispatchProps,ownProps,{
credentials:credentials});

}return mergeProps;}();

return(0,_reactRedux.connect)(mapStateToProps,mapDispatchToProps,mergeProps)(component);
}return provider;}();exports['default']=

provider;