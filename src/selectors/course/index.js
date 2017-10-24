import _ from 'lodash'

import { BANK_TO_DOMAIN, DOMAIN_TO_LIBRARY, BANK_TO_LIBRARY } from '../../utilities'

export function getRoster(state) {
// For QCC / guest classes, we need to pull in the Phase 1 roster
//   in order to get the Phase 2's all present -- so we can edit
//   the deadlines.
// Default to the roster in state.course.roster (which should only
//   populate for D2L).
const defaultRoster = state.course.roster;

if (!state.mission || !state.mission.currentMission ||
    !state.result || !state.result.resultsByMission) return defaultRoster;

const phaseIRecords = state.result.resultsByMission[state.mission.currentMission.id];
const roster = _.uniqBy(_.map(phaseIRecords, 'user'), 'Identifier');
return defaultRoster.length === 0 && roster ?
  roster : defaultRoster;

  // return state.course.roster;
}

export function getCurrentCourse(state) {
  return state.course.currentCourse;
}
