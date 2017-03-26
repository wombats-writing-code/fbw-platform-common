Object.defineProperty(exports,"__esModule",{value:true});var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _reactRedux=require('react-redux');

var _selectors=require('../../selectors');
var _mission=require('../../selectors/mission');
var _setQuestionListHeight=require('../../reducers/Mission/setQuestionListHeight');

var _selectDirective=require('../../reducers/Mission/selectDirective');
var _selectTarget=require('../../reducers/Mission/selectTarget');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}


var mapStateToProps=function(){function mapStateToProps(state,ownProps){


var mission=ownProps.mission||state.mission.currentMission;

return{
currentTarget:state.mission.currentTarget,
mission:mission,
questions:(0,_mission.getRouteQuestions)(mission.questions[state.mission.currentDirectiveIndex],state.mission.currentTarget),
outcomes:(0,_selectors.getMapping)(state).outcomes,
isInProgressSubmitChoice:state.mission.isInProgressSubmitChoice?state.mission.isInProgressSubmitChoice:false};

}return mapStateToProps;}();

var mapDispatchToProps=function(){function mapDispatchToProps(dispatch,ownProps){
return{
onSetListViewHeight:function(){function onSetListViewHeight(data){return dispatch((0,_setQuestionListHeight.setQuestionListHeight)(data));}return onSetListViewHeight;}(),
onClickTryNextTarget:function(){function onClickTryNextTarget(currentQuestion,mission){



var nextTargetRoute=mission.questions[currentQuestion.sectionIndex][currentQuestion.targetIndex+1];
if(!nextTargetRoute){
nextTargetRoute=mission.questions[currentQuestion.sectionIndex+1][0];
dispatch((0,_selectDirective.selectDirective)(currentQuestion.sectionIndex+1));
dispatch((0,_selectTarget.selectTarget)(nextTargetRoute[0]));

return;
}

var nextTarget=nextTargetRoute[0];

dispatch((0,_selectTarget.selectTarget)(nextTarget));
}return onClickTryNextTarget;}()};

}return mapDispatchToProps;}();

var provider=function(){function provider(component){
return(0,_reactRedux.connect)(mapStateToProps,mapDispatchToProps)(component);
}return provider;}();exports['default']=

provider;