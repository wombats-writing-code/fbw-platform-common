import _ from 'lodash'

// ==============
export const isTarget = (question) => {
  if (!question) return undefined;

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

  let targets = _.filter(_.flatMap(sections[sectionIndex]), isTarget);
  return targets;
}

export const getRouteQuestions = (sectionQuestions, target) => {
  if (!target || !sectionQuestions) {
    return null;
  }

  let routeQuestions = _.find(sectionQuestions, array => {
    return array[0] === target || array[0].id === target.id;
  });

  return routeQuestions;
}

export const computeSectionProgress= (questionsInSection) => {
  if (!questionsInSection) return null;

  let targetsForDirective = _.filter(_.flatMap(questionsInSection), isTarget);
  let navigatedTargets = _.filter(targetsForDirective, question => isTargetRouteNavigated(question, questionsInSection) || question.isCorrect);

  // console.log('section', section);
  // console.log('targetsForDirective', targetsForDirective);
  // console.log('navigatedTargets', navigatedTargets);

  return {
    numerator: navigatedTargets.length,
    denominator: targetsForDirective.length,
  }
}

export const isTargetRouteNavigated = (target, questionsInRoute) => {
  if (!questionsInRoute || questionsInRoute.length === 0) {
    throw new Error('No questions of the route were provided')
    return false;
  }

  if (!target) {
    throw new Error('No target question provided');
    return false;
  }

  // a route is navigated only when all of the Targets waypoints have been responded correctly
  let hasNavigated = false;
  if (questionsInRoute[0].response && !questionsInRoute[0].response.isCorrect) {
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

export function sortItemsByModules(modules, items) {
  var moduleItems = {};
  _.each(modules, function (module) {
    moduleItems[module.id] = {
      displayName: module.displayName.text,
      items: []
    };
  });

  _.each(modules, function (module) {
    var outcomeIds = _.map(module.childNodes, 'id');
    _.each(items, function (item) {
      if (outcomeIds.indexOf(item.learningObjectiveIds[0]) >= 0) {
        moduleItems[module.id]['items'].push(item);
      }
    });
  });

  return moduleItems
};
