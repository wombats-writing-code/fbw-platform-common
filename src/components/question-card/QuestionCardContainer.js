import _ from 'lodash'
import { connect } from 'react-redux'

import { getRouteQuestions } from '../../selectors/mission'
import { selectChoice } from '../../reducers/Mission/selectChoice'
import { submitResponse } from '../../reducers/Mission/submitResponse'
import { showAnswer } from '../../reducers/Mission/showAnswer'
import {getUser} from '../../selectors/'
import {getCurrentCourse} from '../../selectors/course'

const mapStateToProps = (state, ownProps) => {
  // console.log('state in question container', state)
  let mission = state.mission.currentMission;

  return {
    // course: getCurrentCourse(state),
    mission,
    routeQuestions: mission ? getRouteQuestions(mission.questions[state.mission.currentDirectiveIndex], state.mission.currentTarget) : null,
    isInProgressSubmitChoice: state.mission.isInProgressSubmitChoice ? state.mission.isInProgressSubmitChoice : false,
    isInProgressShowAnswer: state.mission.isInProgressShowAnswer ? state.mission.isInProgressShowAnswer : false,
    user: getUser(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSelectChoice: data => dispatch(selectChoice(data)),
    onSubmitResponse: data => dispatch(submitResponse(data)),
    onShowAnswer: data => dispatch(showAnswer(data))
  }
}

const provider = (component) => {
  return connect(mapStateToProps, mapDispatchToProps)(component)
}

export default provider
