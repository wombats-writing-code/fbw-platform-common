Object.defineProperty(exports,"__esModule",{value:true});var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _reactRedux=require('react-redux');

var _mission=require('../../selectors/mission');
var _selectChoice=require('../../reducers/Mission/selectChoice');
var _submitResponse=require('../../reducers/Mission/submitResponse');
var _showAnswer=require('../../reducers/Mission/showAnswer');
var _selectors=require('../../selectors/');
var _course=require('../../selectors/course');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}

var mapStateToProps=function(){function mapStateToProps(state,ownProps){

var mission=state.mission.currentMission;

return{

mission:mission,
routeQuestions:mission?(0,_mission.getRouteQuestions)(mission.questions[state.mission.currentDirectiveIndex],state.mission.currentTarget):null,
isInProgressSubmitChoice:state.mission.isInProgressSubmitChoice?state.mission.isInProgressSubmitChoice:false,
isInProgressShowAnswer:state.mission.isInProgressShowAnswer?state.mission.isInProgressShowAnswer:false,
user:(0,_selectors.getUser)(state)};

}return mapStateToProps;}();

var mapDispatchToProps=function(){function mapDispatchToProps(dispatch,ownProps){
return{
onSelectChoice:function(){function onSelectChoice(data){return dispatch((0,_selectChoice.selectChoice)(data));}return onSelectChoice;}(),
onSubmitResponse:function(){function onSubmitResponse(data){return dispatch((0,_submitResponse.submitResponse)(data));}return onSubmitResponse;}(),
onShowAnswer:function(){function onShowAnswer(data){return dispatch((0,_showAnswer.showAnswer)(data));}return onShowAnswer;}()};

}return mapDispatchToProps;}();

var provider=function(){function provider(component){
return(0,_reactRedux.connect)(mapStateToProps,mapDispatchToProps)(component);
}return provider;}();exports['default']=

provider;