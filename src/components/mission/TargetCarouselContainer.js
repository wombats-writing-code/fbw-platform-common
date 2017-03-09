import _ from 'lodash'
import { connect } from 'react-redux'

import { isTarget } from '../../selectors/mission'
import { selectTarget } from '../../reducers/Mission/selectTarget'
import {getMapping} from '../../selectors'
import {getSectionTargets} from '../../selectors/mission'

const mapStateToProps = (state, ownProps) => {


  let mission = ownProps.mission || state.mission.currentMission;

  return {
    currentDirectiveIndex: state.mission.currentDirectiveIndex,  // used for tabIndex on web side
    currentTarget: state.mission.currentTarget,
    currentMissionSections: mission.questions,
    targets: getSectionTargets(mission.questions, state.mission.currentDirectiveIndex),
    outcomes: getMapping(state).outcomes ? getMapping(state).outcomes : []
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSelectTarget: data => dispatch(selectTarget(data))
  }
}

const provider = (component) => {
  return connect(mapStateToProps, mapDispatchToProps)(component)
}

export default provider
