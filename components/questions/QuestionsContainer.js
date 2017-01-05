import _ from 'lodash'
import { connect } from 'react-redux'

import {getMapping} from '../../selectors'
import { getTargetQuestions } from '../../selectors/mission'
import { setQuestionListHeight } from '../../reducers/Mission/setQuestionListHeight'

const mapStateToProps = (state, ownProps) => {
  console.log('state in QuestionsContainer', state)

  return {
    mission: state.mission.currentMission,
    questions: getTargetQuestions(state),
    outcomes: getMapping(state).outcomes,
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
