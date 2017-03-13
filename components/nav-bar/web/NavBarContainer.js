Object.defineProperty(exports,"__esModule",{value:true});var _reactRedux=require('react-redux');
var _NavBar=require('./NavBar');var _NavBar2=_interopRequireDefault(_NavBar);

var _logOutUser=require('../../../reducers/Login/logOutUser');
var _selectors=require('../../../selectors');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}

var mapStateToProps=function(){function mapStateToProps(state,ownProps){
return{
isVisitor:state.login.isVisitor,
user:(0,_selectors.getUser)(state),
missions:state.mission?state.mission.missions:null};

}return mapStateToProps;}();

var mapDispatchToProps=function(){function mapDispatchToProps(dispatch,ownProps){
return{
logout:function(){function logout(data){return dispatch((0,_logOutUser.logOutUser)());}return logout;}()};

}return mapDispatchToProps;}();exports['default']=

(0,_reactRedux.connect)(mapStateToProps,mapDispatchToProps)(_NavBar2['default']);