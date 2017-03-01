// mission reducer
import _ from 'lodash'

import {targetKey, targetStatus, filterItemsByTarget } from '../../selectors'

import {SELECT_MISSION} from './selectMission'
import { GET_MISSIONS_OPTIMISTIC, RECEIVE_MISSIONS } from './getMissions'
import { CREATE_TAKE_MISSION_OPTIMISTIC, CREATE_TAKE_MISSION, RECEIVE_CREATE_TAKE_MISSION } from './selectOpenMission'
import { GET_USER_MISSION_RESULTS_OPTIMISTIC, RECEIVE_GET_USER_MISSION_RESULTS } from './selectClosedMission'
import {SUBMIT_RESPONSE_OPTIMISTIC, RECEIVE_SUBMIT_RESPONSE } from './submitResponse'
import { SHOW_ANSWER_OPTIMISTIC, RECEIVE_SHOW_ANSWER } from './showAnswer'

import {RECEIVE_CREATE_MISSION, RECEIVE_CREATE_MISSIONS} from '../edit-mission/createMission'
import {RECEIVE_UPDATE_MISSION} from '../edit-mission/updateMission'
import {RECEIVE_DELETE_MISSION} from '../edit-mission/deleteMission'

import { SELECT_DIRECTIVE } from './selectDirective'
import { SELECT_TARGET } from './selectTarget'
import { SELECT_CHOICE } from './selectChoice'

import {SELECT_COURSE} from '../Course/selectCourse'

import {LOG_OUT} from '../Login/logOutUser'

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  currentDirectiveIndex: 0
}
export default function missionReducer (state = initialState, action) {
  switch (action.type) {
    case GET_MISSIONS_OPTIMISTIC:
      return _.assign({}, state, {
        currentMission: null,
        missions: [],
        isGetMissionsInProgress: true
      })

    case RECEIVE_MISSIONS:
      return _.assign({}, state, {
        missions: action.missions,
        isGetMissionsInProgress: false,
        currentMission: null
      })

    case SELECT_COURSE:
      return _.assign({}, state, {
        missions: null
      })

    case SELECT_MISSION:
      return _.assign({}, state, {
        currentMission: action.mission,
        currentDirectiveIndex: 0
      })

    case CREATE_TAKE_MISSION_OPTIMISTIC:
      return _.assign({}, state, {
        currentMission: action.mission,
        isGetMissionInProgress: true
      });

    case RECEIVE_CREATE_TAKE_MISSION:
      return _.assign({}, state, {
        currentMission: action.mission,
        currentDirectiveIndex: 0,
        isGetMissionInProgress: false
      });

    // ==== from edit-mission ====
    case RECEIVE_CREATE_MISSION:
      return _.assign({}, state, {
        currentMission: action.mission,
        missions: _.compact(_.concat(action.mission, state.missions)),      // creates a new array of existing missions with the new mission appended
      })

    case RECEIVE_CREATE_MISSIONS:
      let newMissions = _.compact(action.missions);
      let newMissionIds =  _.map(newMissions, 'id');
      let followsFromMission = newMissions[0] ? newMissions[0].followsFromMissions[0] : null;
      // creates a new array of existing missions with the new mission appended
      let allMissions = _.concat(newMissions, state.missions);

      return _.assign({}, state, {
        missions: _.map(allMissions, mission => {
          if (mission.id === followsFromMission) {
            return _.assign({}, mission, {
              leadsToMissions: newMissionIds
            })
          }

          return mission
        }),
        currentMission: _.assign({}, _.find(state.missions, {id: followsFromMission}), {
          leadsToMissions: newMissionIds
        })
      })

    case RECEIVE_DELETE_MISSION:
      return _.assign({}, state, {
        currentMission: null,
        missions: _.filter(state.missions, (m) => {
          return m.id !== action.mission.id
        })
      })
    // =========

    case SELECT_DIRECTIVE:
      return _.assign({}, state, {
        currentDirectiveIndex: action.directiveIndex,
        currentTarget: null,
        selectedChoiceId: null
      })

    case SELECT_TARGET:
      return _.assign({}, state, {
        currentTarget: action.target,
        questionListHeight: 0,
        selectedChoiceId: null
      })

    case GET_USER_MISSION_RESULTS_OPTIMISTIC:
      return _.assign({}, state, {
        currentMission: action.mission,
        isGetMissionInProgress: true
      });

    case RECEIVE_GET_USER_MISSION_RESULTS:
      return _.assign({}, state, {
        isGetMissionInProgress: false
      });

    case SUBMIT_RESPONSE_OPTIMISTIC:
      return _.assign({}, state, {
        isInProgressSubmitChoice: true,
        selectedChoiceId: null
      })

    case SHOW_ANSWER_OPTIMISTIC:
      return _.assign({}, state, {
        isInProgressShowAnswer: true,
        selectedChoiceId: null
      })

    case RECEIVE_SUBMIT_RESPONSE:
      return _.assign({}, state, {
        isInProgressSubmitChoice: false,
        currentMission: _.assign({}, state.currentMission, {
          questions: _.map(state.currentMission.questions, section => {
            return _.map(section, targetRoute => {
              let needsUpdate;
              let route = _.map(targetRoute, q => {
                if (q.instanceId === action.responseResult.question.instanceId) {
                  needsUpdate = true;
                  return _.assign({}, action.responseResult.question, {
                    responded: true
                  })
                }

                return q;
              });

              if (needsUpdate && action.responseResult.nextQuestion) {
                route.push(action.responseResult.nextQuestion);
              }

              return route;
            })
          })
        })
      })

    case SELECT_CHOICE:
      return _.assign({}, state, {
        selectedChoiceId: action.choiceId
      })

    case LOG_OUT:
      return _.assign({}, state, {
        currentMission: null,
        missions: null,
        isGetMissionsInProgress: false
      })

    case RECEIVE_UPDATE_MISSION:
      return _.assign({}, state, {
        missions: _.map(state.missions, (m) => {
          if (m.id === action.mission.id) {
            return action.mission;
          }

          return m;
        }),
        currentMission: action.mission
      })

    default:
      return state
  }
}

export const missionConfig = {
  PHASE_I_MISSION_TYPE: 'PHASE_I_MISSION_TYPE',
  PHASE_II_MISSION_TYPE: 'PHASE_II_MISSION_TYPE'
}
