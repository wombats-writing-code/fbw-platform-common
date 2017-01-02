import _ from 'lodash'
import { connect } from 'react-redux'

import { selectDirective } from '../../reducers/Mission/selectDirective'
import {getMapping} from '../../selectors'

const mapStateToProps = (state, ownProps) => {
  // console.log('state in DirectiveCarouselContainer', state);

  return {
    currentDirectiveIndex: typeof state.mission.currentDirectiveIndex !== 'undefined' ? state.mission.currentDirectiveIndex : null,
    directives: state.mission.currentMissionSections ? state.mission.currentMissionSections : [],
    targets: state.mission.currentMissionSections ? _.flatten(_.map(state.mission.currentMissionSections, 'questions')) : [],
    outcomes: getMapping(state).outcomes ? getMapping(state).outcomes : [],
    mission: state.mission.currentMission,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSelectDirective: (directiveIndex) => {
      dispatch(selectDirective(directiveIndex));
    }
  }
}

const provider = (component) => {
  return connect(mapStateToProps, mapDispatchToProps)(component)
}

export default provider
