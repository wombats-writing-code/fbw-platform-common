Object.defineProperty(exports,"__esModule",{value:true});exports.



getRoster=getRoster;exports.



getCurrentCourse=getCurrentCourse;var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _utilities=require('../../utilities');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function getRoster(state){return state.course.roster;}function getCurrentCourse(state){
return state.course.currentCourse;
}