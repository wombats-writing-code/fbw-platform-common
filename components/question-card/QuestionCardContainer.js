import _ from 'lodash'
import { connect } from 'react-redux'

import { getTargetQuestions } from '../../selectors'
import { selectChoice } from '../../reducers/Mission/selectChoice'
import { submitResponse } from '../../reducers/Mission/submitResponse'
import { showAnswer } from '../../reducers/Mission/showAnswer'

const mapStateToProps = (state, ownProps) => {
  // console.log('state in question container', state)
  return {
    privateBankId: state.subject.privateBankId,
    mission: state.mission.currentMission ? state.mission.currentMission : null,
    isInProgressSubmitChoice: state.mission.isInProgressSubmitChoice ? state.mission.isInProgressSubmitChoice : false,
    isInProgressShowAnswer: state.mission.isInProgressShowAnswer ? state.mission.isInProgressShowAnswer : false,
    section: typeof state.mission.currentDirectiveIndex !== 'undefined' ? state.mission.currentMissionSections[state.mission.currentDirectiveIndex] : null,
    username: state.login.user.username
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
