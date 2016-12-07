import _ from 'lodash'
import { connect } from 'react-redux'

import { getTargetQuestions } from 'platform-common/selectors'
import { selectChoice } from 'platform-common/reducers/Mission/selectChoice'
import { submitResponse } from 'platform-common/reducers/Mission/submitResponse'
import { showAnswer } from 'platform-common/reducers/Mission/showAnswer'

const mapStateToProps = (state, ownProps) => {
  console.log('state in question container', state)
  return {
    mission: state.mission.currentMission ? state.mission.currentMission : null,
    selectedChoiceId: state.mission.selectedChoiceId ? state.mission.selectedChoiceId : null,
    outcome: state.outcome.outcomes ? _.find(state.outcome.outcomes, {id: ownProps.question.learningObjectiveIds[0]}) : null,
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
