Object.defineProperty(exports,"__esModule",{value:true});exports.directiveIdsFromQuestions=exports.targetStatus=exports.isTargetRouteNavigated=exports.computeSectionProgress=exports.getRouteQuestions=exports.getSectionTargets=exports.getMissionDirectives=exports.targetKey=exports.isTarget=undefined;exports.




























































































getTargetQuestions=getTargetQuestions;exports.
































sortItemsByModules=sortItemsByModules;var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var isTarget=exports.isTarget=function(){function isTarget(question){if(!question||!question.referenceNumber)return undefined;return question.referenceNumber.indexOf('.')<0;}return isTarget;}();var targetKey=exports.targetKey=function(){function targetKey(target){return target?target.referenceNumber[0]:null;}return targetKey;}();var getMissionDirectives=exports.getMissionDirectives=function(){function getMissionDirectives(mission,outcomes){if(!mission||!outcomes){return null;}return _lodash2['default'].map(mission.goals,function(lo){return _lodash2['default'].find(outcomes,function(o){return o.id==lo;});});}return getMissionDirectives;}();var getSectionTargets=exports.getSectionTargets=function(){function getSectionTargets(sections,sectionIndex){if(!sections||_lodash2['default'].isNil(sectionIndex)){return null;}var targets=_lodash2['default'].filter(_lodash2['default'].flatMap(sections[sectionIndex]),isTarget);return targets;}return getSectionTargets;}();var getRouteQuestions=exports.getRouteQuestions=function(){function getRouteQuestions(sectionQuestions,target){if(!target||!sectionQuestions){return null;}var routeQuestions=_lodash2['default'].find(sectionQuestions,function(array){return array[0]===target||array[0].id===target.id;});return routeQuestions;}return getRouteQuestions;}();var computeSectionProgress=exports.computeSectionProgress=function(){function computeSectionProgress(questionsInSection){if(!questionsInSection)return null;var targetsForDirective=_lodash2['default'].filter(_lodash2['default'].flatMap(questionsInSection),isTarget);var navigatedTargets=_lodash2['default'].filter(targetsForDirective,function(question){return isTargetRouteNavigated(question,questionsInSection[question.targetIndex])||question.response&&question.response.isCorrect;});return{numerator:navigatedTargets.length,denominator:targetsForDirective.length};}return computeSectionProgress;}();var isTargetRouteNavigated=exports.isTargetRouteNavigated=function(){function isTargetRouteNavigated(target,questionsInRoute){if(!questionsInRoute||questionsInRoute.length===0){throw new Error('No questions of the route were provided');return false;}var hasNavigated=false;if(questionsInRoute[0].response&&questionsInRoute[0].response.isCorrect===false){var lastQuestion=_lodash2['default'].takeRight(questionsInRoute)[0];hasNavigated=lastQuestion.response&&lastQuestion.response.isCorrect;}return hasNavigated;}return isTargetRouteNavigated;}();var targetStatus=exports.targetStatus=function(){function targetStatus(target,questionsInRoute){var status='PRISTINE';if(isTargetRouteNavigated(target,questionsInRoute)&&!target.response.isCorrect){status='NAVIGATED';}else if(target.responded&&target.response.isCorrect){status='COMPLETE';}else if(target.responded&&!target.response.isCorrect){status='FAIL';}return status;}return targetStatus;}();function getTargetQuestions(state){var questions=void 0;if(state.mission.currentTarget&&state.mission.currentMissionSections){var directiveQuestions=state.mission.currentMissionSections[state.mission.currentDirectiveIndex].questions;var routeQuestions=filterItemsByTarget(directiveQuestions);questions=routeQuestions[targetKey(state.mission.currentTarget)];}return questions;}var directiveIdsFromQuestions=exports.directiveIdsFromQuestions=function(){function directiveIdsFromQuestions(questionsData){return _lodash2['default'].map(questionsData,function(section,index){return section.learningObjectiveId;});}return directiveIdsFromQuestions;}();function sortItemsByModules(modules,items){
var moduleItems={};
_lodash2['default'].each(modules,function(module){
moduleItems[module.id]={
displayName:module.displayName.text,
items:[]};

});

_lodash2['default'].each(modules,function(module){
var outcomeIds=_lodash2['default'].map(module.childNodes,'id');
_lodash2['default'].each(items,function(item){
if(outcomeIds.indexOf(item.learningObjectiveIds[0])>=0){
moduleItems[module.id]['items'].push(item);
}
});
});

return moduleItems;
};