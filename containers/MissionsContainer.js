import { connect } from 'react-redux'

import { getMissions } from 'fbw-platform-common/reducers/Mission/getMissions'
import { selectOpenMission } from 'fbw-platform-common/reducers/Mission/selectOpenMission'
import { selectClosedMission } from 'fbw-platform-common/reducers/Mission/selectClosedMission'
import {getEnrolledSubject} from 'fbw-platform-common/selectors/bank'
import {getUser} from 'fbw-platform-common/selectors'

const mapStateToProps = (state, ownProps) => {
  // console.log('state', state);
  return {
    bank: getEnrolledSubject(state),
    isGetPrivateBankIdInProgress: state.bank.getPrivateBankIdInProgress ? state.bank.getPrivateBankIdInProgress : false,
    missions: state.mission ? state.mission.missions : null,
    isGetMissionsInProgress: state.mission ? state.mission.isGetMissionsInProgress : false,
    user: getUser(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSelectOpenMission: data => dispatch(selectOpenMission(data)),
    onSelectClosedMission: data => dispatch(selectClosedMission(data)),
    getMissions: data => dispatch(getMissions(data))
  }
}

const provider = (component) => {
  return connect(mapStateToProps, mapDispatchToProps)(component)
}

export default provider
