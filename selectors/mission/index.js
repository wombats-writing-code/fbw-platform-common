Object.defineProperty(exports,"__esModule",{value:true});exports.numberAttemptedTargets=exports.numberUnansweredTargets=exports.pointsEarned=exports.numberCorrectTargets=exports.grabTargetQuestionsFromMission=exports.grabTargetQuestionsFromRecords=exports.directiveIdsFromQuestions=exports.isGoalMastered=exports.isGoalCompleted=exports.isLastTargetInRoute=exports.targetStatus=exports.isTargetRouteNavigated=exports.computeSectionProgress=exports.getRouteQuestions=exports.getSectionTargets=exports.getMissionDirectives=exports.targetKey=exports.isTarget=undefined;exports.


















































































































































getTargetQuestions=getTargetQuestions;var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var isTarget=exports.isTarget=function(){function isTarget(question){if(!question||!question.referenceNumber)return undefined;return question.referenceNumber.indexOf('.')<0;}return isTarget;}();var targetKey=exports.targetKey=function(){function targetKey(target){return target?target.referenceNumber[0]:null;}return targetKey;}();var getMissionDirectives=exports.getMissionDirectives=function(){function getMissionDirectives(mission,outcomes){if(!mission||!outcomes){return null;}return _lodash2['default'].map(mission.goals,function(lo){return _lodash2['default'].find(outcomes,function(o){return o.id==lo;});});}return getMissionDirectives;}();var getSectionTargets=exports.getSectionTargets=function(){function getSectionTargets(sections,sectionIndex){if(!sections||_lodash2['default'].isNil(sectionIndex)){return null;}var targets=_lodash2['default'].uniqBy(_lodash2['default'].filter(_lodash2['default'].flatMap(sections[sectionIndex]),isTarget),function(q){return q.referenceNumber;});return targets;}return getSectionTargets;}();var getRouteQuestions=exports.getRouteQuestions=function(){function getRouteQuestions(sectionQuestions,target){if(!target||!sectionQuestions){return null;}var routeQuestions=_lodash2['default'].find(sectionQuestions,function(array){var arrayIds=_lodash2['default'].map(array,'id');return _lodash2['default'].includes(array,target)||_lodash2['default'].includes(arrayIds,target.id);});return routeQuestions;}return getRouteQuestions;}();var computeSectionProgress=exports.computeSectionProgress=function(){function computeSectionProgress(questionsInSection){if(!questionsInSection)return null;var targetsForDirective=_lodash2['default'].uniqBy(_lodash2['default'].filter(_lodash2['default'].flatMap(questionsInSection),isTarget),function(q){return q.referenceNumber;});var navigatedTargets=_lodash2['default'].uniqBy(_lodash2['default'].filter(targetsForDirective,function(question){return isTargetRouteNavigated(question,questionsInSection[question.targetIndex])||question.response&&question.response.isCorrect;}),function(q){return q.referenceNumber;});return{numerator:navigatedTargets.length,denominator:targetsForDirective.length,isComplete:isGoalCompleted(questionsInSection),isMastered:isGoalMastered(questionsInSection)};}return computeSectionProgress;}();var isTargetRouteNavigated=exports.isTargetRouteNavigated=function(){function isTargetRouteNavigated(target,questionsInRoute){if(!questionsInRoute||questionsInRoute.length===0){throw new Error('No questions of the route were provided');return false;}if(questionsInRoute.length===1&&questionsInRoute[0].responded){return true;}var hasNavigated=false;if(questionsInRoute[0].response&&questionsInRoute[0].response.isCorrect===false){var lastQuestion=_lodash2['default'].takeRight(questionsInRoute)[0];hasNavigated=lastQuestion.response&&lastQuestion.response.isCorrect;}return hasNavigated;}return isTargetRouteNavigated;}();var targetStatus=exports.targetStatus=function(){function targetStatus(target,questionsInRoute){var status='PRISTINE';if(isTargetRouteNavigated(target,questionsInRoute)&&!target.response.isCorrect){status='NAVIGATED';}else if(target.responded&&target.response.isCorrect){status='COMPLETE';}else if(target.responded&&!target.response.isCorrect){status='FAIL';}return status;}return targetStatus;}();var isLastTargetInRoute=exports.isLastTargetInRoute=function(){function isLastTargetInRoute(target,questionsInSection){if(target&&questionsInSection){var lastTarget=_lodash2['default'].last(questionsInSection)[0];return lastTarget===target||lastTarget.id===target.id;}}return isLastTargetInRoute;}();var isGoalCompleted=exports.isGoalCompleted=function(){function isGoalCompleted(questionsInSection){return _lodash2['default'].every(questionsInSection,function(route){return _lodash2['default'].every(route,function(question){return question.responded;});});}return isGoalCompleted;}();var isGoalMastered=exports.isGoalMastered=function(){function isGoalMastered(questionsInSection){return _lodash2['default'].every(questionsInSection,function(route){return _lodash2['default'].every(route,function(question){return question.response&&question.response.isCorrect;});});}return isGoalMastered;}();function getTargetQuestions(state){
var questions=void 0;
if(state.mission.currentTarget&&state.mission.currentMissionSections){
var directiveQuestions=state.mission.currentMissionSections[state.mission.currentDirectiveIndex].questions;
var routeQuestions=filterItemsByTarget(directiveQuestions);
questions=routeQuestions[targetKey(state.mission.currentTarget)];
}
return questions;
}


var directiveIdsFromQuestions=exports.directiveIdsFromQuestions=function(){function directiveIdsFromQuestions(questionsData){
return _lodash2['default'].map(questionsData,function(section,index){return section.learningObjectiveId;});
}return directiveIdsFromQuestions;}();

var grabTargetQuestionsFromRecords=exports.grabTargetQuestionsFromRecords=function(){function grabTargetQuestionsFromRecords(studentRecords){

return _lodash2['default'].uniqBy(_lodash2['default'].filter(studentRecords,function(r){return isTarget(r.question);}),function(record){return record.question.id;});
}return grabTargetQuestionsFromRecords;}();

var grabTargetQuestionsFromMission=exports.grabTargetQuestionsFromMission=function(){function grabTargetQuestionsFromMission(missionQuestions){



return _lodash2['default'].uniqBy(_lodash2['default'].filter(missionQuestions,function(q){return isTarget(q);}),function(question){return question.id;});
}return grabTargetQuestionsFromMission;}();

var numberCorrectTargets=exports.numberCorrectTargets=function(){function numberCorrectTargets(questions){


return _lodash2['default'].reduce(questions,function(sum,question){
if(question&&question.response&&question.response.isCorrect){
sum++;
}

return sum;
},0);
}return numberCorrectTargets;}();

var pointsEarned=exports.pointsEarned=function(){function pointsEarned(questions){





var numberCorrect=numberCorrectTargets(questions);

var percentCorrect=_lodash2['default'].round(numberCorrect/questions.length*100,1);



return numberCorrect+' / '+questions.length+'; '+percentCorrect+'%';
}return pointsEarned;}();


var numberUnansweredTargets=exports.numberUnansweredTargets=function(){function numberUnansweredTargets(targetQuestions){




return _lodash2['default'].filter(targetQuestions,function(targetQuestion){return!(targetQuestion.responseResult||targetQuestion.response);}).length;
}return numberUnansweredTargets;}();

var numberAttemptedTargets=exports.numberAttemptedTargets=function(){function numberAttemptedTargets(targetQuestions){




return _lodash2['default'].filter(targetQuestions,function(targetQuestion){return targetQuestion.responseResult||targetQuestion.response;}).length;
}return numberAttemptedTargets;}();