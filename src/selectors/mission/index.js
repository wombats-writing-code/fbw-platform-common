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

  // For unfinished routes (target wrong, but unanswered question at the end),
  //   the web backend
  //   is not sending the target as the first question in the list.
  //   It typically is the last (unanswered) question of the route that
  //   shows up at index 0 -- so when viewing student results,
  //   no questions would be rendered in that route (this method returned
  //   ``null``).
  // So, make this more robust and check all questions in the array to
  //   match the target
  let routeQuestions = _.find(sectionQuestions, array => {
    let arrayIds = _.map(array, 'id');
    return _.includes(array, target) || _.includes(arrayIds, target.id);
    // return array[0] === target || array[0].id === target.id;
  });
  // Do NOT sort the routeQuestions here for Instructor App
  //    * unfinished routes bug: means that unfinished routes do not render
  //      properly when viewing student results. One fix was to
  //      sort here, to make sure that the target question was always
  //      the first question in the list. BUT:
  // Sorting breaks the student experience
  return routeQuestions;
  // return _.sortBy(routeQuestions, 'referenceNumber');
}

export const computeSectionProgress = (questionsInSection) => {
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

  if (questionsInRoute.length === 1 && questionsInRoute[0].responded) {
    // console.log('questionsInRoute', questionsInRoute)
    return true
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

export const grabTargetQuestionsFromRecords = (studentRecords) => {
  // for a single student's set of records
  return _.uniqBy(_.filter(studentRecords, r => isTarget(r.question)), record => record.question.id);
}

export const grabTargetQuestionsFromMission = (missionQuestions) => {
  // When passing in this.props.mission.questions from MissionContainer component
  // This has to make sure to grab only targets achieved on the FIRST attempt,
  // so `uniqBy` takes them in order, which works...
  return _.uniqBy(_.filter(missionQuestions, q => isTarget(q)), question => question.id);
}

export const numberCorrectQuestions = (questions) => {
  // assumes questions is already a list of question records
  // Call `grabTargetQuestionsFromRecords` first
  return _.reduce(questions, (sum, question) => {
    if (question && question.response && question.response.isCorrect) {
      sum++;
    }

    return sum;
  }, 0);
}

export const pointsEarned = (questions) => {
  // assumes questions is already a list of targets
  // Call `grabTargetQuestionsFromRecords` first

  // console.log('points earned for', questions)

  let numberCorrect = numberCorrectQuestions(questions);

  let percentCorrect = _.round((numberCorrect / questions.length) * 100, 1);
  // console.log('number correct', numberCorrect)
  // console.log('percentCorrect', percentCorrect)

  return `${numberCorrect} / ${questions.length}; ${percentCorrect}%`;
}


export const questionResponded = (question) => {
  if (question.responseResult || question.response) {
    return true;
  }
  return false;
}

export const numberUnattemptedQuestions = (questionsList) => {
  // assumes questionsList is a list of question records
  // Call `grabTargetQuestionsFromRecords` first
  // question.responseResult is when the data is from `records`
  // question.response is when the data is from `mission.questions`
  return _.filter(questionsList, question => !(questionResponded(question))).length;
}

export const numberAttemptedQuestions = (questionsList) => {
  // assumes questionsList is a list of question records
  // Call `grabTargetQuestionsFromRecords` first
  // question.responseResult is when the data is from `records`
  // question.response is when the data is from `mission.questions
  return _.filter(questionsList, questionResponded).length;
}

export const numberUnfinishedRoutes = (goalQuestions) => {
  // input is mission.questions[idx], so one list of questions for the same goal.
  // checks to see if any unanwered questions remain
  // Used to see if the student has finished all routes
  return _.find(goalQuestions, question => !questionResponded(question)) ?
    _.filter(goalQuestions, question => !questionResponded(question)).length : 0;
}

export const numberUnfinishedGoals = (directiveIndicators) => {
  // given a set of directiveIndicators (from computeSectionProgress above),
  //   we calculate simply how many are unfinished
  return _.reduce(directiveIndicators, (sum, indicator) => {
    if (!indicator.isComplete) {
      return sum + 1;
    }
    return sum;
  }, 0);
}

export const isSyntheticDivision = (question) => {
  // In order to get the table border right, need a selector
  //   that can identify synthetic division questions
  if (!question || !question.displayName) {
    throw new Exception('isSyntheticDivision requires a question input with a displayName property');
  }
  return question.displayName.toLowerCase().indexOf('synthetic division') >= 0;
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
