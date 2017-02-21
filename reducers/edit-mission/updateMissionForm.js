
export const CHANGE_MISSION_NAME = 'CHANGE_MISSION_NAME'
export const CHANGE_MISSION_TYPE = 'CHANGE_MISSION_TYPE'
export const CHANGE_MISSION_START = 'CHANGE_MISSION_START'
export const CHANGE_MISSION_END = 'CHANGE_MISSION_END'
export const SELECT_MODULE = 'SELECT_MODULE'
export const CHANGE_OUTCOME_SEARCH = 'CHANGE_OUTCOME_SEARCH'
export const TOGGLE_OUTCOME = 'TOGGLE_OUTCOME'
export const CHANGE_FOLLOWS_FROM_MISSIONS = 'FOLLOWS_FROM_MISSIONS'

export function changeMissionName(value) {
  return {type: CHANGE_MISSION_NAME, value};
}

export function changeMissionType(missionType) {
  return {type: CHANGE_MISSION_TYPE, missionType};
}

export function changeMissionStart(datetime) {
  return {type: CHANGE_MISSION_START, datetime};
}

export function changeMissionEnd(datetime) {
  return {type: CHANGE_MISSION_END, datetime};
}

export function selectModule(module) {
  return {type: SELECT_MODULE, module};
}

export function changeOutcomeSearch(query) {
  return {type: CHANGE_OUTCOME_SEARCH, query};
}

export function toggleOutcome(outcome) {
  return {type: TOGGLE_OUTCOME, outcome};
}

export function changeFollowsFromMissions(missions) {
  return {type: FOLLOWS_FROM_MISSIONS, missions};
}
