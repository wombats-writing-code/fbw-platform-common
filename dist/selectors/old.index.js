Object.defineProperty(exports,"__esModule",{value:true});exports.validSNumber=exports.directiveIdsFromQuestions=undefined;exports.


























hasAchievedDirective=hasAchievedDirective;exports.
















getTargetQuestions=getTargetQuestions;var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _utilities=require('../utilities');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var moment=require('moment');require('moment-timezone');var directiveIdsFromQuestions=exports.directiveIdsFromQuestions=function(){function directiveIdsFromQuestions(questionsData){return _lodash2['default'].map(questionsData,function(section,index){return section.learningObjectiveId;});}return directiveIdsFromQuestions;}();var validSNumber=exports.validSNumber=function(){function validSNumber(sNumber){try{var numericValue=sNumber.substring(1,sNumber.length-1);return!isNaN(numericValue)&&(sNumber[0]=='S'||sNumber[0]=='I')&&(sNumber.length==9||sNumber.length==10);}catch(e){return false;}}return validSNumber;}();function hasAchievedDirective(targets){if(!targets)return null;var min=Math.ceil(targets.length/2);var numResponded=0;var numCorrect=_lodash2['default'].reduce(targets,function(result,question){if(question.responded)numResponded++;if(question.isCorrect)result+=1;return result;},0);if(numResponded===targets.length&&numCorrect<min)return false;if(numCorrect>=min)return true;}function getTargetQuestions(state){
var questions=void 0;
if(state.mission.currentTarget&&state.mission.currentMissionSections){
var directiveQuestions=state.mission.currentMissionSections[state.mission.currentDirectiveIndex].questions;
var routeQuestions=filterItemsByTarget(directiveQuestions);
questions=routeQuestions[targetKey(state.mission.currentTarget)];
}
return questions;
}