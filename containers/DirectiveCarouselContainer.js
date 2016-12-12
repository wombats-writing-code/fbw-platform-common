import _ from 'lodash'
import { connect } from 'react-redux'

import { selectDirective } from '../reducers/Mission/selectDirective'
import { getSectionQuestions } from '../reducers/Mission/getSectionQuestions'

import { checkMissionStatus } from 'fbw-platform-common/selectors'

const mapStateToProps = (state, ownProps) => {
  return {
    currentDirectiveIndex: typeof state.mission.currentDirectiveIndex !== 'undefined' ? state.mission.currentDirectiveIndex : null,
    directives: state.mission.currentMissionSections ? state.mission.currentMissionSections : [],
    targets: state.mission.currentMissionSections ? _.flatten(_.map(state.mission.currentMissionSections, 'questions')) : [],
    outcomes: state.outcome.outcomes ? state.outcome.outcomes : [],
    mission: state.mission.currentMission,
    username: state.login.user.username
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSelectDirective: (data) => {
      dispatch(selectDirective(data.directiveIndex));
      if (checkMissionStatus(data.mission) === "pending") {
        // "over" mission results include all questions, so
        //   don't have to get them dynamically
        dispatch(getSectionQuestions(data));
    },
  }
}

const provider = (component) => {
  return connect(mapStateToProps, mapDispatchToProps)(component)
}

export default provider
