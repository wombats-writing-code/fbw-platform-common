import _ from 'lodash'

// ==============
export const isTarget = (question) => {
  if (!question || !question.referenceNumber) return undefined;

  return question.referenceNumber.indexOf('.') < 0;
}

export const targetKey = (target) => {
  return target ? target.referenceNumber[0] : null;
}

export const getMissionDirectives = (mission, outcomes) => {
  if (!mission || !outcomes) {
    return null
  }

  return _.map(mission.goals, lo => _.find(outcomes, o => o.id == lo));
}

export const getSectionTargets = (sections, sectionIndex) => {
  if (!sections || _.isNil(sectionIndex)) {
    return null;
  }

  // filter out targets, then make unique by referenceNumber
  let targets = _.uniqBy(_.filter(_.flatMap(sections[sectionIndex]), isTarget), q => q.referenceNumber);
  return targets;
}

export const getRouteQuestions = (sectionQuestions, target) => {
  if (!target || !sectionQuestions) {
    return null;
  }

  // console.log('sectionQuestions', sectionQuestions, 'target', target);

  let routeQuestions = _.find(sectionQuestions, array => {
    return array[0] === target || array[0].id === target.id;
  });

  return routeQuestions;
}

export const computeSectionProgress= (questionsInSection) => {
  if (!questionsInSection) return null;

  let targetsForDirective = _.uniqBy(_.filter(_.flatMap(questionsInSection), isTarget), q => q.referenceNumber);
  let navigatedTargets = _.uniqBy(_.filter(targetsForDirective, question => {
    return isTargetRouteNavigated(question, questionsInSection[question.targetIndex]) ||
            (question.response && question.response.isCorrect);
  }), q => q.referenceNumber);
  // console.log('section', section);
  // console.log('targetsForDirective', targetsForDirective);
  // console.log('navigatedTargets', navigatedTargets);

  return {
    numerator: navigatedTargets.length,
    denominator: targetsForDirective.length,
    isComplete: isGoalCompleted(questionsInSection),
    isMastered: isGoalMastered(questionsInSection)
  }
}

export const isTargetRouteNavigated = (target, questionsInRoute) => {
  if (!questionsInRoute || questionsInRoute.length === 0) {
    throw new Error('No questions of the route were provided')
    return false;
  }

  // a route is navigated only when all of the Targets waypoints have been responded correctly
  let hasNavigated = false;
  if (questionsInRoute[0].response && questionsInRoute[0].response.isCorrect === false) {
    let lastQuestion = _.takeRight(questionsInRoute)[0];
    hasNavigated = lastQuestion.response && lastQuestion.response.isCorrect;
  }

  return hasNavigated;
}

export const targetStatus = (target, questionsInRoute) => {
  var status = 'PRISTINE';

  if (isTargetRouteNavigated(target, questionsInRoute) && !target.response.isCorrect) {
    status = 'NAVIGATED';

  } else if (target.responded && target.response.isCorrect) {
    status = 'COMPLETE';
  } else if (target.responded && !target.response.isCorrect) {
    status = 'FAIL';
  }

  return status;
}


export const isLastTargetInRoute = (target, questionsInSection) => {
  if (target && questionsInSection) {
    let lastTarget = _.last(questionsInSection)[0];
    return lastTarget === target || lastTarget.id === target.id;
  }
}

// a goal is completed when there's nothing left to do in the route of each target question
export const isGoalCompleted = (questionsInSection) => {
  return _.every(questionsInSection, route => {
    return _.every(route, question => {
      // console.log('isGoalCompleted question', question);
      return question.responded;
    })
  })
}

export const isGoalMastered = (questionsInSection) => {
  return _.every(questionsInSection, route => {
    return _.every(route, question => {
      // console.log('isGoalMastered question', question);
      return question.response && question.response.isCorrect;
    })
  })
}

/// ==============

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


// export function hasAchievedDirective (targets) {
//   if (!targets) return null;
//
//   let min = Math.ceil(targets.length / 2);
//
//   let numResponded = 0;
//   let numCorrect = _.reduce(targets, (result, question) => {
//     if (question.responded) numResponded++;
//     if (question.isCorrect) result+=1;
//     return result;
//   }, 0)
//
//   if (numResponded === targets.length && numCorrect < min) return false;
//
//   if (numCorrect >= min) return true;
// }
