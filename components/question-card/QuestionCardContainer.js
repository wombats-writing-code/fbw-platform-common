import _ from 'lodash'
import { connect } from 'react-redux'

import { getTargetQuestions } from '../../selectors/mission'
import { selectChoice } from '../../reducers/Mission/selectChoice'
import { submitResponse } from '../../reducers/Mission/submitResponse'
import { showAnswer } from '../../reducers/Mission/showAnswer'
import {getUser} from '../../selectors/'
import {getCurrentCourse} from '../../selectors/course'

const mapStateToProps = (state, ownProps) => {
  // console.log('state in question container', state)
  return {
    course: getCurrentCourse(state),
    mission: state.mission.currentMission ? state.mission.currentMission : null,
    isInProgressSubmitChoice: state.mission.isInProgressSubmitChoice ? state.mission.isInProgressSubmitChoice : false,
    isInProgressShowAnswer: state.mission.isInProgressShowAnswer ? state.mission.isInProgressShowAnswer : false,
    section: typeof state.mission.currentDirectiveIndex !== 'undefined' ? state.mission.currentMissionSections[state.mission.currentDirectiveIndex] : null,
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
