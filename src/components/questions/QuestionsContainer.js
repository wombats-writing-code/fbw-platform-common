import _ from 'lodash'
import { connect } from 'react-redux'

import {getMapping} from '../../selectors'
import { getRouteQuestions } from '../../selectors/mission'
import { setQuestionListHeight } from '../../reducers/Mission/setQuestionListHeight'

const mapStateToProps = (state, ownProps) => {
  // console.log('state in QuestionsContainer', state)

  let mission = ownProps.mission || state.mission.currentMission;

  return {
    mission,
    questions: getRouteQuestions(mission.questions[state.mission.currentDirectiveIndex], state.mission.currentTarget),
    outcomes: getMapping(state).outcomes,
    isInProgressSubmitChoice: state.mission.isInProgressSubmitChoice ? state.mission.isInProgressSubmitChoice : false,
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
