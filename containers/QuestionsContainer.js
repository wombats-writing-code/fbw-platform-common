import _ from 'lodash'
import { connect } from 'react-redux'

import { getTargetQuestions } from '../selectors'
import { setQuestionListHeight } from '../reducers/Mission/setQuestionListHeight'

const mapStateToProps = (state, ownProps) => {

  let questions = getTargetQuestions(state)

  return {
    mission: state.mission.currentMission,
    questions: questions,
    outcomes: state.outcome.outcomes ? state.outcome.outcomes : [],
    isInProgressSubmitChoice: state.mission.isInProgressSubmitChoice ? state.mission.isInProgressSubmitChoice : false,
    questionListHeight: state.mission.questionListHeight ? state.mission.questionListHeight : 0
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSetListViewHeight: data => dispatch(setQuestionListHeight(data))
  }
}

const provider = (component) => {
  return connect(mapStateToProps, mapDispatchToProps)(component)
}

export default provider
