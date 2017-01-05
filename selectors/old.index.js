
import _ from 'lodash'

import { BANK_TO_DOMAIN, DOMAIN_TO_LIBRARY, BANK_TO_LIBRARY } from '../utilities'

let moment = require('moment');
require('moment-timezone');


export const directiveIdsFromQuestions = (questionsData) => {
  return _.map(questionsData, (section, index) => section.learningObjectiveId);
}

export const validSNumber = (sNumber) => {
  // check if S# is 8 or 9 digits following an S
  try {
    let numericValue = sNumber.substring(1, sNumber.length - 1);
    return !isNaN(numericValue) && (sNumber[0] == 'S' || sNumber[0] == 'I') && (sNumber.length == 9 || sNumber.length == 10);
  } catch (e) {
    return false;
  }

}




export function hasAchievedDirective (targets) {
  if (!targets) return null;

  let min = Math.ceil(targets.length / 2);

  let numResponded = 0;
  let numCorrect = _.reduce(targets, (result, question) => {
    if (question.responded) numResponded++;
    if (question.isCorrect) result+=1;
    return result;
  }, 0)

  if (numResponded === targets.length && numCorrect < min) return false;

  if (numCorrect >= min) return true;
}

export function getTargetQuestions (state) {
  let questions
  if (state.mission.currentTarget && state.mission.currentMissionSections) {
    let directiveQuestions = state.mission.currentMissionSections[state.mission.currentDirectiveIndex].questions
    let routeQuestions = filterItemsByTarget(directiveQuestions)
    questions = routeQuestions[targetKey(state.mission.currentTarget)]
  }
  return questions
}
