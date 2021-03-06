import { connect } from 'react-redux'
import _ from 'lodash'
import { getMissions } from '../../reducers/Mission/getMissions'
import { selectOpenMission } from '../../reducers/Mission/selectOpenMission'
import { selectClosedMission } from '../../reducers/Mission/selectClosedMission'
import {getCurrentCourse} from '../../selectors/course'
import {getUser} from '../../selectors'


import { getMapping } from '../../reducers/Mapping/getMapping'

const mapStateToProps = (state, ownProps) => {
  // console.log('state in MissionsContainer', state);

  return {
    course: getCurrentCourse(state),
    missions: state.mission ? _.orderBy(state.mission.missions, 'deadline') : null,
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
