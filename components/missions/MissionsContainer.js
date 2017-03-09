Object.defineProperty(exports,"__esModule",{value:true});var _reactRedux=require('react-redux');

var _getMissions2=require('../../reducers/Mission/getMissions');
var _selectOpenMission=require('../../reducers/Mission/selectOpenMission');
var _selectClosedMission=require('../../reducers/Mission/selectClosedMission');
var _course=require('../../selectors/course');
var _selectors=require('../../selectors');


var _getMapping2=require('../../reducers/Mapping/getMapping');

var mapStateToProps=function(){function mapStateToProps(state,ownProps){


return{
course:(0,_course.getCurrentCourse)(state),
missions:state.mission?state.mission.missions:null,
isGetMissionsInProgress:state.mission?state.mission.isGetMissionsInProgress:false,
user:(0,_selectors.getUser)(state)};


}return mapStateToProps;}();

var mapDispatchToProps=function(){function mapDispatchToProps(dispatch,ownProps){
return{
onSelectOpenMission:function(){function onSelectOpenMission(data){return dispatch((0,_selectOpenMission.selectOpenMission)(data));}return onSelectOpenMission;}(),
onSelectClosedMission:function(){function onSelectClosedMission(data){return dispatch((0,_selectClosedMission.selectClosedMission)(data));}return onSelectClosedMission;}(),
getMissions:function(){function getMissions(data){return dispatch((0,_getMissions2.getMissions)(data));}return getMissions;}(),
getMapping:function(){function getMapping(data){return dispatch((0,_getMapping2.getMapping)(data));}return getMapping;}()};

}return mapDispatchToProps;}();

var provider=function(){function provider(component){
return(0,_reactRedux.connect)(mapStateToProps,mapDispatchToProps)(component);
}return provider;}();exports['default']=

provider;