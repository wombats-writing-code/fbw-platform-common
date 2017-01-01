import _ from 'lodash'

export const isTarget = (question) => {
  if (question && question.displayName) {
    return question.displayName.text.indexOf('.') < 0;
  }

  return undefined;
}

export const targetKey = (target) => {
  return target ? target.displayName.text[0] : null;
}

export const isTargetRouteNavigated = (sectionQuestions) => {
  if (!sectionQuestions || sectionQuestions.length === 0) return false;

  // a route is navigated only when all of the Targets waypoints have been responded correctly
  let hasNavigated = false;
  if (sectionQuestions[0].response && !sectionQuestions[0].response.isCorrect) {
    hasNavigated = _.every(_.tail(sectionQuestions), response => response && response.isCorrect);
  }

  return hasNavigated;
}

export const targetStatus = (target, sectionQuestions) => {
  var status = 'PRISTINE';

  if (isTargetRouteNavigated(sectionQuestions) && !target.isCorrect) {
    status = 'NAVIGATED';

  } else if (target.responded && target.isCorrect) {
    status = 'COMPLETE';
  } else if (target.responded && !target.isCorrect) {
    status = 'FAIL';
  }

  return status;
}

export const filterItemsByTarget = (items) => {
  return _.reduce(items, (result, item) => {
    let itemKey = targetKey(item);

    if (!itemKey) return null;

    if (!result[itemKey]) result[itemKey] = [];
    result[itemKey].push(item);

    return result;
  }, {});
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


export const directiveIdsFromQuestions = (questionsData) => {
  return _.map(questionsData, (section, index) => section.learningObjectiveId);
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
