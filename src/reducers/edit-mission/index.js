// edit-mission reducer
import thunk from 'redux-thunk';
import _ from 'lodash'
import moment from 'moment'

import {missionConfig} from '../Mission'
import {
  CREATE_MISSION_OPTIMISTIC, RECEIVE_CREATE_MISSION,
  CREATE_MISSIONS_OPTIMISTIC, RECEIVE_CREATE_MISSIONS
} from './createMission'
import {
  UPDATE_MISSION_OPTIMISTIC,
  RECEIVE_UPDATE_MISSION,
  UPDATE_MISSIONS_OPTIMISTIC,
  RECEIVE_UPDATE_MISSIONS
} from './updateMission'
import {DELETE_MISSION_OPTIMISTIC, RECEIVE_DELETE_MISSION} from './deleteMission'
import {
  CHANGE_MISSION_NAME, CHANGE_MISSION_TYPE, CHANGE_MISSION_START, CHANGE_MISSION_END,
  SELECT_MODULE, CHANGE_OUTCOME_SEARCH, TOGGLE_OUTCOME, CHANGE_FOLLOWS_FROM_MISSIONS,
  MOVE_OUTCOME_DOWN, MOVE_OUTCOME_UP, CHANGE_MISSION_LEADS_TO_END,
  CHANGE_MISSION_LEADS_TO_START
} from './updateMissionForm'
import {EDIT_MISSION} from './editMission'
import {CLICK_ADD_MISSION} from './clickAddMission'
import {CLICK_EDIT_MISSION, CANCEL_EDIT_MISSION} from './clickEditMission'
import {CLICK_EDIT_MISSION_DATES, CANCEL_EDIT_MISSION_DATES} from './clickEditMissionDates'

import {localDateTime} from '../../utilities/time'


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  newMission: stampNewMission()
}

export default function editMissionReducer (state = initialState, action) {
  switch (action.type) {
    case CLICK_ADD_MISSION:
      return _.assign({}, state, {
        newMission: stampNewMission()
      })

    case CLICK_EDIT_MISSION:
      return _.assign({}, state, {
        isEditMissionInProgress: true,
        newMission: _.assign({}, action.mission)
      })

    case CANCEL_EDIT_MISSION:
      return _.assign({}, state, {
        isEditMissionInProgress: false,
        newMission: null
      })

    case CLICK_EDIT_MISSION_DATES:
      return _.assign({}, state, {
        isEditMissionDatesInProgress: true,
        newMission: _.assign({}, action.mission, {
          startTime: action.mission.leadsToMissionsStartTime,
          deadline: action.mission.leadsToMissionsDeadline
        })
      })

    case CANCEL_EDIT_MISSION_DATES:
      return _.assign({}, state, {
        isEditMissionDatesInProgress: false,
        newMission: null
      })

    case EDIT_MISSION:
      return _.assign({}, state, {
        newMission: action.mission
      })

    case CREATE_MISSIONS_OPTIMISTIC:
      return _.assign({}, state, {
        isCreateMissionInProgress: action.mission
      })

    case CREATE_MISSION_OPTIMISTIC:
      return _.assign({}, state, {
        isCreateMissionInProgress: true,
      })

    case RECEIVE_CREATE_MISSIONS:
    case RECEIVE_CREATE_MISSION:
      return _.assign({}, state, {
        newMission: stampNewMission(),
        isCreateMissionInProgress: false
      })

    case UPDATE_MISSION_OPTIMISTIC:
      return _.assign({}, state, {
        isUpdateMissionInProgress: true
      })

    case RECEIVE_UPDATE_MISSION:
      return _.assign({}, state, {
        isUpdateMissionInProgress: false,
        newMission: stampNewMission(),
        isEditMissionInProgress: false
      })

    case UPDATE_MISSIONS_OPTIMISTIC:
      return _.assign({}, state, {
        isUpdateMissionsInProgress: true
      })

    case RECEIVE_UPDATE_MISSIONS:
      return _.assign({}, state, {
        isUpdateMissionsInProgress: false,
        newMission: stampNewMission(),
        isEditMissionDatesInProgress: false
      })

    case DELETE_MISSION_OPTIMISTIC:
      return _.assign({}, state, {
        isDeleteMissionInProgress: true
      })

    case RECEIVE_DELETE_MISSION:
      return _.assign({}, state, {
        isDeleteMissionInProgress: false,
        isEditMissionInProgress: false,
        newMission: stampNewMission()
      });

    case CHANGE_MISSION_NAME:
      return _.assign({}, state, {
        newMission: _.assign({}, state.newMission, {
          displayName: action.value
        })
      })

    case CHANGE_MISSION_TYPE:
      return _.assign({}, state, {
        newMission: _.assign({}, state.newMission, {
          type: action.missionType,
          displayName: '',
          description: ''
        })
      })

    case CHANGE_MISSION_START:
      return _.assign({}, state, {
        newMission: _.assign({}, state.newMission, {
          startTime: action.datetime
        })
      })

    case CHANGE_MISSION_END:
      return _.assign({}, state, {
        newMission: _.assign({}, state.newMission, {
          deadline: action.datetime
        })
      })

    case CHANGE_MISSION_LEADS_TO_END:
      return _.assign({}, state, {
        newMission: _.assign({}, state.newMission, {
          leadsToMissionsDeadline: action.datetime
        })
      })

    case CHANGE_MISSION_LEADS_TO_START:
      return _.assign({}, state, {
        newMission: _.assign({}, state.newMission, {
          leadsToMissionsStartTime: action.datetime
        })
      })

    case SELECT_MODULE:
      return _.assign({}, state, {
        selectedModule: state.selectedModule === action.module ? null : action.module
      })

    case CHANGE_OUTCOME_SEARCH:
      return _.assign({}, state, {
        outcomeQuery: action.query
      })

    case TOGGLE_OUTCOME:
      let isSelected = state.newMission.goals.indexOf(action.outcome.id) > -1;
      let goals;
      if (isSelected) {
        goals = _.without(state.newMission.goals, action.outcome.id);
      } else {
        goals = _.concat(state.newMission.goals, action.outcome.id);
      }

      return _.assign({}, state, {
        newMission: _.assign({}, state.newMission, {
          goals
        })
      })

    case CHANGE_FOLLOWS_FROM_MISSIONS:
      let displayNames = _.map(action.missions, 'displayName');
      return _.assign({}, state, {
        newMission: _.assign({}, state.newMission, {
          followsFromMissions: _.map(action.missions, 'id'),
          displayName: `Phase II (from ${displayNames.join(' + ')})`
        })
      })

    case MOVE_OUTCOME_UP:
      const outcomeUpIndex = state.newMission.goals.indexOf(action.outcome.id);
      const outcomeIncludedUp = outcomeUpIndex > -1;
      if (!outcomeIncludedUp || outcomeUpIndex === 0) {
        return _.assign({}, state);
      }

      let reorderedUpGoals = _.filter(
        _.assign([], state.newMission.goals),
        id => id !== action.outcome.id);
      reorderedUpGoals.splice(outcomeUpIndex - 1, 0, action.outcome.id);
      return _.assign({}, state, {
        newMission: _.assign({}, state.newMission, {
          goals: reorderedUpGoals
        })
      });

    case MOVE_OUTCOME_DOWN:
      const outcomeDownIndex = state.newMission.goals.indexOf(action.outcome.id);
      const outcomeIncludedDown = outcomeDownIndex > -1;
      if (!outcomeIncludedDown || outcomeDownIndex === state.newMission.goals.length + 1) {
        return _.assign({}, state);
      }
      let reorderedDownGoals = _.filter(
        _.assign([], state.newMission.goals),
        id => id !== action.outcome.id);
      reorderedDownGoals.splice(outcomeDownIndex + 1, 0, action.outcome.id);
      return _.assign({}, state, {
        newMission: _.assign({}, state.newMission, {
          goals: reorderedDownGoals
        })
      });

    default:
      return state
  }
}


export function stampNewMission() {
  return {
    displayName: '',
    type: null,
    course: '',
    startTime: null,
    deadline: null,
    followsFromMissions: [],
    leadsToMissions: [],
    goals: [],
  }
}
