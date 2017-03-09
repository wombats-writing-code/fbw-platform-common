Object.defineProperty(exports,"__esModule",{value:true});var _reactRedux=require('react-redux');
var _slug=require('slug');var _slug2=_interopRequireDefault(_slug);
var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);

var _getMissions2=require('../../reducers/Mission/getMissions');
var _selectOpenMission=require('../../reducers/Mission/selectOpenMission');
var _selectClosedMission=require('../../reducers/Mission/selectClosedMission');
var _selectDirective=require('../../reducers/Mission/selectDirective');

var _selectors=require('../../selectors/');
var _course=require('../../selectors/course');
var _mission=require('../../selectors/mission');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}


var mapStateToProps=function(){function mapStateToProps(state,ownProps){

console.log('state in MissionContainer',state);
var mission=ownProps.mission||state.mission.currentMission;
var outcomes=(0,_selectors.getMapping)(state)?(0,_selectors.getMapping)(state).outcomes:[];
var directives=(0,_mission.getMissionDirectives)(mission,outcomes);

return{
user:(0,_selectors.getUser)(state),
currentCourse:(0,_course.getCurrentCourse)(state),
missions:state.mission?state.mission.missions:null,
isGetMissionInProgress:state.mission.isGetMissionInProgress,
isGetMissionsInProgress:state.mission?state.mission.isGetMissionsInProgress:false,
directives:directives,
directiveIndicators:mission&&mission.questions?_lodash2['default'].map(mission.questions,function(section){return(0,_mission.computeSectionProgress)(section);}):null,
currentDirectiveIndex:typeof state.mission.currentDirectiveIndex!=='undefined'?state.mission.currentDirectiveIndex:null,
isSubmitTakeMissionInProgress:state.mission?state.mission.isSubmitTakeMissionInProgress:false};

}return mapStateToProps;}();

var mapDispatchToProps=function(){function mapDispatchToProps(dispatch,ownProps){




return{
onSelectOpenMission:function(){function onSelectOpenMission(data){return dispatch((0,_selectOpenMission.selectOpenMission)(data));}return onSelectOpenMission;}(),
onSelectClosedMission:function(){function onSelectClosedMission(data){return dispatch((0,_selectClosedMission.selectClosedMission)(data));}return onSelectClosedMission;}(),
getMissions:function(){function getMissions(data){return dispatch((0,_getMissions2.getMissions)(data));}return getMissions;}(),
onSelectDirective:function(){function onSelectDirective(directiveIndex){return dispatch((0,_selectDirective.selectDirective)(directiveIndex));}return onSelectDirective;}()};

}return mapDispatchToProps;}();

var provider=function(){function provider(component){
return(0,_reactRedux.connect)(mapStateToProps,mapDispatchToProps)(component);
}return provider;}();exports['default']=

provider;