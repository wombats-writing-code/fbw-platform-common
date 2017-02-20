
export const CHANGE_MISSION_TYPE = 'CHANGE_MISSION_TYPE'
export const CHANGE_MISSION_START = 'CHANGE_MISSION_START'
export const CHANGE_MISSION_END = 'CHANGE_MISSION_END'
export const SELECT_MODULE = 'SELECT_MODULE'
export const CHANGE_OUTCOME_SEARCH = 'CHANGE_OUTCOME_SEARCH'
export const TOGGLE_OUTCOME = 'TOGGLE_OUTCOME'


export function changeMissionType(missionType) {
  return {type: CHANGE_MISSION_TYPE, missionType};
}

export function changeMissionStart(datetime) {
  return {type: CHANGE_MISSION_DATETIME, datetime};
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
