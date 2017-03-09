Object.defineProperty(exports,"__esModule",{value:true});var _reactRedux=require('react-redux');
var _GuestCallback=require('./web/GuestCallback');var _GuestCallback2=_interopRequireDefault(_GuestCallback);

var _authenticateGuest2=require('../../reducers/Login/authenticateGuest');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}

var mapStateToProps=function(){function mapStateToProps(state,ownProps){
return{};

}return mapStateToProps;}();

var mapDispatchToProps=function(){function mapDispatchToProps(dispatch,ownProps){
return{
authenticateGuest:function(){function authenticateGuest(){return dispatch((0,_authenticateGuest2.authenticateGuest)());}return authenticateGuest;}()};

}return mapDispatchToProps;}();exports['default']=


(0,_reactRedux.connect)(mapStateToProps,mapDispatchToProps)(_GuestCallback2['default']);