Object.defineProperty(exports,"__esModule",{value:true});var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _reactRedux=require('react-redux');
var _selectors=require('../../selectors');
var _selectCourse=require('../../reducers/Course/selectCourse');
var _getMapping2=require('../../reducers/Mapping/getMapping');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}

var mapStateToProps=function(){function mapStateToProps(state,ownProps){


return{
courses:state.course.courses,
user:(0,_selectors.getUser)(state)};

}return mapStateToProps;}();

var mapDispatchToProps=function(){function mapDispatchToProps(dispatch,ownProps){
return{
onSelectCourse:function(){function onSelectCourse(course){dispatch((0,_selectCourse.selectCourse)(course));}return onSelectCourse;}(),
getMapping:function(){function getMapping(data){dispatch((0,_getMapping2.getMapping)(data));}return getMapping;}()};

}return mapDispatchToProps;}();

var provider=function(){function provider(component){
return(0,_reactRedux.connect)(mapStateToProps,mapDispatchToProps)(component);
}return provider;}();exports['default']=

provider;