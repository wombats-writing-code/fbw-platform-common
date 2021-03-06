
export const CHANGE_MISSION_NAME = 'CHANGE_MISSION_NAME'
export const CHANGE_MISSION_TYPE = 'CHANGE_MISSION_TYPE'
export const CHANGE_MISSION_START = 'CHANGE_MISSION_START'
export const CHANGE_MISSION_END = 'CHANGE_MISSION_END'
export const CHANGE_MISSION_LEADS_TO_END = 'CHANGE_MISSION_LEADS_TO_END'
export const CHANGE_MISSION_LEADS_TO_START = 'CHANGE_MISSION_LEADS_TO_START'
export const SELECT_MODULE = 'SELECT_MODULE'
export const CHANGE_OUTCOME_SEARCH = 'CHANGE_OUTCOME_SEARCH'
export const TOGGLE_OUTCOME = 'TOGGLE_OUTCOME'
export const CHANGE_FOLLOWS_FROM_MISSIONS = 'CHANGE_FOLLOWS_FROM_MISSIONS'
export const MOVE_OUTCOME_UP = 'MOVE_OUTCOME_UP'
export const MOVE_OUTCOME_DOWN = 'MOVE_OUTCOME_DOWN'

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

export function changeMissionLeadsToEnd(datetime) {
  return {type: CHANGE_MISSION_LEADS_TO_END, datetime};
}

export function changeMissionLeadsToStart(datetime) {
  return {type: CHANGE_MISSION_LEADS_TO_START, datetime};
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
  return {type: CHANGE_FOLLOWS_FROM_MISSIONS, missions};
}

export function moveOutcomeUp(outcome) {
  return {type: MOVE_OUTCOME_UP, outcome};
}

export function moveOutcomeDown(outcome) {
  return {type: MOVE_OUTCOME_DOWN, outcome};
}
