Object.defineProperty(exports,"__esModule",{value:true});var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _reactRedux=require('react-redux');

var _selectors=require('../../selectors');
var _mission=require('../../selectors/mission');
var _setQuestionListHeight=require('../../reducers/Mission/setQuestionListHeight');

var _selectDirective=require('../../reducers/Mission/selectDirective');
var _selectTarget=require('../../reducers/Mission/selectTarget');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}


var mapStateToProps=function(){function mapStateToProps(state,ownProps){


var mission=ownProps.mission||state.mission.currentMission;
var section=mission?mission.questions[state.mission.currentDirectiveIndex]:null;

return{
currentPath:state.location.pathname,
mission:mission,
isLastTarget:mission?(0,_mission.isLastTargetInRoute)(state.mission.currentTarget,section):null,
currentTarget:state.mission.currentTarget,
questions:(0,_mission.getRouteQuestions)(section,state.mission.currentTarget),
outcomes:(0,_selectors.getMapping)(state).outcomes,
isInProgressSubmitChoice:state.mission.isInProgressSubmitChoice?state.mission.isInProgressSubmitChoice:false};

}return mapStateToProps;}();

var mapDispatchToProps=function(){function mapDispatchToProps(dispatch,ownProps){
return{
onSetListViewHeight:function(){function onSetListViewHeight(data){return dispatch((0,_setQuestionListHeight.setQuestionListHeight)(data));}return onSetListViewHeight;}()};






















}return mapDispatchToProps;}();

var provider=function(){function provider(component){
return(0,_reactRedux.connect)(mapStateToProps,mapDispatchToProps)(component);
}return provider;}();exports['default']=

provider;