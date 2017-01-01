
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

export const localDateTime = (utcDateObject) => {
  // convert our UTC date / time (already converted to JS format from python
  // format by our reducer) to local timezone
  let timezone = moment.tz.guess()

  return moment.utc(utcDateObject).clone().tz(timezone)
}

export function checkMissionStatus (mission) {
  let st = mission.startTime
  let dl = mission.deadline
    // need to subtract one because when you construct a Date object here,
    // it assumes 0 index....but the native input and server-side use 1 index
  let startTime = moment.utc(st)
  let deadline = moment.utc(dl)
  let now = moment.utc()

  if (deadline < now) {
    return 'over'
  } else if (startTime <= now && now <= deadline) {
    return 'pending'
  } else {
    return 'future'
  }
};

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
