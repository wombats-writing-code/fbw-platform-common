Object.defineProperty(exports,"__esModule",{value:true});var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _reactRedux=require('react-redux');

var _mission=require('../../selectors/mission');
var _selectTarget=require('../../reducers/Mission/selectTarget');
var _selectors=require('../../selectors');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}


var mapStateToProps=function(){function mapStateToProps(state,ownProps){


var mission=ownProps.mission||state.mission.currentMission;

return{
currentDirectiveIndex:state.mission.currentDirectiveIndex,
currentTarget:state.mission.currentTarget,
currentMissionSections:mission.questions,
targets:(0,_mission.getSectionTargets)(mission.questions,state.mission.currentDirectiveIndex),
outcomes:(0,_selectors.getMapping)(state).outcomes?(0,_selectors.getMapping)(state).outcomes:[]};

}return mapStateToProps;}();

var mapDispatchToProps=function(){function mapDispatchToProps(dispatch,ownProps){
return{
onSelectTarget:function(){function onSelectTarget(data){return dispatch((0,_selectTarget.selectTarget)(data));}return onSelectTarget;}()};

}return mapDispatchToProps;}();

var provider=function(){function provider(component){
return(0,_reactRedux.connect)(mapStateToProps,mapDispatchToProps)(component);
}return provider;}();exports['default']=

provider;