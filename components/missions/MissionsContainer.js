import { connect } from 'react-redux'

import { getMissions } from 'fbw-platform-common/reducers/Mission/getMissions'
import { selectOpenMission } from 'fbw-platform-common/reducers/Mission/selectOpenMission'
import { selectClosedMission } from 'fbw-platform-common/reducers/Mission/selectClosedMission'
import {getCurrentCourse} from 'fbw-platform-common/selectors/course'
import {getUser} from 'fbw-platform-common/selectors'

// need to getMapping here, instead of SubjectsContainer,
//   because D2L users never see SubjectsContainer
import { getMapping } from '../reducers/Mapping/getMapping'

const mapStateToProps = (state, ownProps) => {
  // console.log('state', state);
  return {
    course: getCurrentCourse(state),
    missions: state.mission ? state.mission.missions : null,
    isGetMissionsInProgress: state.mission ? state.mission.isGetMissionsInProgress : false,
    user: getUser(state),
    // mapping: state.mapping ? state.mapping : null
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSelectOpenMission: data => dispatch(selectOpenMission(data)),
    onSelectClosedMission: data => dispatch(selectClosedMission(data)),
    getMissions: data => dispatch(getMissions(data)),
    getMapping: data => dispatch(getMapping(data))
  }
}

const provider = (component) => {
  return connect(mapStateToProps, mapDispatchToProps)(component)
}

export default provider
