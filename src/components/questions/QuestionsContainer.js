import _ from 'lodash'
import { connect } from 'react-redux'

import {getMapping} from '../../selectors'
import { getRouteQuestions, isLastTargetInRoute } from '../../selectors/mission'
import { setQuestionListHeight } from '../../reducers/Mission/setQuestionListHeight'

import { selectDirective } from '../../reducers/Mission/selectDirective'
import { selectTarget } from '../../reducers/Mission/selectTarget'


const mapStateToProps = (state, ownProps) => {
  // console.log('state in QuestionsContainer', state)

  let mission = ownProps.mission || state.mission.currentMission;
  let section = mission ? mission.questions[state.mission.currentDirectiveIndex] : null;

  return {
    currentPath: state.location.pathname,
    mission,
    isLastTarget: mission ? isLastTargetInRoute(state.mission.currentTarget, section) : null,
    currentTarget: state.mission.currentTarget,
    questions: getRouteQuestions(section, state.mission.currentTarget),
    outcomes: getMapping(state).outcomes,
    isInProgressSubmitChoice: state.mission.isInProgressSubmitChoice ? state.mission.isInProgressSubmitChoice : false,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSetListViewHeight: data => dispatch(setQuestionListHeight(data)),
    // onClickTryNextTarget: (currentQuestion, mission) => {
    //   // console.log('currentQuestion', currentQuestion, 'mission', mission)
    //   // console.log('mission.questions', mission.questions[currentQuestion.sectionIndex][currentQuestion.targetIndex + 1])
    //
    //   let nextTargetRoute = mission.questions[currentQuestion.sectionIndex][currentQuestion.targetIndex + 1];
    //   if (!nextTargetRoute) {
    //     if (currentQuestion.sectionIndex+1 === mission.questions.length) {
    //       return;
    //     }
    //
    //     nextTargetRoute = mission.questions[currentQuestion.sectionIndex+1][0];
    //     dispatch(selectDirective(currentQuestion.sectionIndex+1));
    //     dispatch(selectTarget(nextTargetRoute[0]));
    //
    //     return;
    //   }
    //
    //   let nextTarget = nextTargetRoute[0]
    //
    //   dispatch(selectTarget(nextTarget));
    // }
  }
}

const provider = (component) => {
  return connect(mapStateToProps, mapDispatchToProps)(component)
}

export default provider
