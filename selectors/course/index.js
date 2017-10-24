Object.defineProperty(exports,"__esModule",{value:true});exports.



getRoster=getRoster;exports.


















getCurrentCourse=getCurrentCourse;var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _utilities=require('../../utilities');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function getRoster(state){var defaultRoster=state.course.roster;if(!state.mission||!state.mission.currentMission||!state.result||!state.result.resultsByMission)return defaultRoster;var phaseIRecords=state.result.resultsByMission[state.mission.currentMission.id];var roster=_lodash2['default'].uniqBy(_lodash2['default'].map(phaseIRecords,'user'),'Identifier');return defaultRoster.length===0&&roster?roster:defaultRoster;}function getCurrentCourse(state){
return state.course.currentCourse;
}