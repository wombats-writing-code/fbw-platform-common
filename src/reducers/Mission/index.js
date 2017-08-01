// mission reducer
import _ from 'lodash'

import {targetKey, targetStatus, filterItemsByTarget } from '../../selectors'

import {SELECT_MISSION} from './selectMission'
import { GET_MISSIONS_OPTIMISTIC, RECEIVE_MISSIONS } from './getMissions'
import { CREATE_TAKE_MISSION_OPTIMISTIC, CREATE_TAKE_MISSION, RECEIVE_CREATE_TAKE_MISSION } from './selectOpenMission'
import { GET_CLOSED_MISSION_OPTIMISTIC, RECEIVE_CLOSED_MISSION } from './selectClosedMission'
import {SUBMIT_RESPONSE_OPTIMISTIC, RECEIVE_SUBMIT_RESPONSE } from './submitResponse'
import { SHOW_ANSWER_OPTIMISTIC, RECEIVE_SHOW_ANSWER } from './showAnswer'

import {RECEIVE_CREATE_MISSION, RECEIVE_CREATE_MISSIONS} from '../edit-mission/createMission'
import {RECEIVE_UPDATE_MISSION} from '../edit-mission/updateMission'
import {RECEIVE_DELETE_MISSION} from '../edit-mission/deleteMission'

import {GET_STUDENT_RESULT_SUCCESS} from '../Result/getStudentResult'

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
      var target;
      if (action.mission && action.mission.questions[0] && action.mission.questions[0][0]) {
        target = action.mission.questions[0][0][0];
      }

      return _.assign({}, state, {
        currentMission: action.mission,
        currentDirectiveIndex: 0,
        currentTarget: target,
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
      let followsFromMissions = newMissions[0] ? newMissions[0].followsFromMissions : [];
      // creates a new array of existing missions with the new mission appended
      let allMissions = _.concat(newMissions, state.missions);

      let newCurrentMission = _.find(state.missions, {id: followsFromMissions[0]});

      return _.assign({}, state, {
        missions: _.map(allMissions, mission => {
          if (followsFromMissions.indexOf(mission.id) > -1) {
            return _.assign({}, mission, {
              leadsToMissions: _.compact(_.uniq(_.concat(mission.leadsToMissions, newMissionIds)))
            })
          }

          return mission
        }),
        currentMission: _.assign({}, newCurrentMission, {
          leadsToMissions: newCurrentMission ? _.compact(_.uniq(_.concat(newCurrentMission.leadsToMissions, newMissionIds))) : newMissionIds
        })
      })

    case RECEIVE_DELETE_MISSION:
      let m = state.currentMission ? _.assign({}, state.currentMission, {
        leadsToMissions: _.without(state.currentMission.leadsToMissions, action.mission.id)
      }): null;

      return _.assign({}, state, {
        missions: _.compact(_.map(state.missions, (m) => {
          if (m.id !== action.mission.id) {
            return _.assign({}, m, {
              leadsToMissions: _.without(m.leadsToMissions, action.mission.id)
            })
          }
        })),
        currentMission: m
      })
    // =========

    case SELECT_DIRECTIVE:
      let currentMission = state.currentMission;
      var target;
      if (currentMission && currentMission.questions[0] && currentMission.questions[0][0]) {
        target = currentMission.questions[action.directiveIndex][0][0];
      }

      return _.assign({}, state, {
        currentDirectiveIndex: action.directiveIndex,
        currentTarget: target,
        selectedChoiceId: null
      })

    case SELECT_TARGET:
      return _.assign({}, state, {
        currentTarget: action.target,
        questionListHeight: 0,
        selectedChoiceId: null
      })

    case GET_CLOSED_MISSION_OPTIMISTIC:
      return _.assign({}, state, {
        currentMission: action.mission,
        currentDirectiveIndex: 0,
        currentTarget: null,
        isGetMissionInProgress: true
      });

    case RECEIVE_CLOSED_MISSION:
      // console.log('RECEIVE_CLOSED_MISSION', action)
      let mission = _.assign({}, action.mission, {
        questions: action.questions
      })

      var target;
      if (mission.questions && mission.questions[0] && mission.questions[0][0]) {
        target = mission.questions[0][0][0];
      }

      return _.assign({}, state, {
        currentMission: mission,
        currentDirectiveIndex: 0,
        currentTarget: target,
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
        // currentMission: action.mission
      })

    // DON'T DO THIS! It breaks the Instructor app's
    //   student-results view.
    // case GET_STUDENT_RESULT_SUCCESS:
    //   return _.assign({}, state, {
    //     currentMission: _.assign({}, action.mission, {
    //       questions: action.questions
    //     })
    //   })

    default:
      return state
  }
}

export const missionConfig = {
  PHASE_I_MISSION_TYPE: 'PHASE_I_MISSION_TYPE',
  PHASE_II_MISSION_TYPE: 'PHASE_II_MISSION_TYPE'
}
