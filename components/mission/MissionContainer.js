import { connect } from 'react-redux'
import slug from 'slug'
import _ from 'lodash'

import { getMissions } from '../../reducers/Mission/getMissions'
import { selectOpenMission } from '../../reducers/Mission/selectOpenMission'
import { selectClosedMission } from '../../reducers/Mission/selectClosedMission'
import { selectDirective } from '../../reducers/Mission/selectDirective'

import {getUser, getMapping} from '../../selectors/'
import {getCurrentCourse} from '../../selectors/course'
import {getMissionDirectives, computeSectionProgress, isTarget, isTargetRouteNavigated} from '../../selectors/mission'


const mapStateToProps = (state, ownProps) => {
  // console.log('ownProps of MissionContainer', ownProps)
  console.log('state in MissionContainer', state);
  let mission = state.mission.currentMission;
  let outcomes = getMapping(state) ? getMapping(state).outcomes : [];
  let directives = getMissionDirectives(state.mission.currentMission, outcomes);

  return {
    user: getUser(state),
    currentCourse: getCurrentCourse(state),
    missions: state.mission ? state.mission.missions : null,
    isGetMissionInProgress: state.mission.isGetMissionInProgress,
    isGetMissionsInProgress: state.mission ? state.mission.isGetMissionsInProgress : false,
    directives,
    directiveIndicators: mission && mission.questions ? _.map(mission.questions, section => computeSectionProgress(section)) : null,
    currentDirectiveIndex: typeof state.mission.currentDirectiveIndex !== 'undefined' ? state.mission.currentDirectiveIndex : null,
    isSubmitTakeMissionInProgress: state.mission ? state.mission.isSubmitTakeMissionInProgress : false
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  // This seems redundant with MissionsContainer, but I think we need it
  //   in order to handle the "load specific mission page" scenario on the
  //   web side...basically the Mission component will need to load its
  //   own mission.
  return {
    onSelectOpenMission: data => dispatch(selectOpenMission(data)),
    onSelectClosedMission: data => dispatch(selectClosedMission(data)),
    getMissions: data => dispatch(getMissions(data)),
    onSelectDirective: directiveIndex => dispatch(selectDirective(directiveIndex))
  }
}

const provider = (component) => {
  return connect(mapStateToProps, mapDispatchToProps)(component)
}

export default provider
