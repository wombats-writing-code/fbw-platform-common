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

import {SELECT_STUDENT_RESULT} from './selectStudentResult'
import { SELECT_DIRECTIVE } from './selectDirective'
import { SELECT_TARGET } from './selectTarget'
import { SELECT_CHOICE } from './selectChoice'
import { SET_QUESTION_LIST_HEIGHT } from './setQuestionListHeight'
import { SET_CHOICE_HEIGHT } from './setChoiceHeight'

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
      let followsFromMission = action.missions[0] ? action.missions[0].followsFromMission[0] : null;

      return _.assign({}, state, {
        missions: _.compact(_.concat(action.missions, state.missions)),      // creates a new array of existing missions with the new mission appended
        currentMission: _.find(state.missions, {id: followsFromMission})
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
        heightByChoice: {},
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

    case SELECT_STUDENT_RESULT:
      let questions = _.flatMap(action.missionResult.sections, 'questions');
      let currentTarget = _.find(questions, q => q.id === action.question.id)

      return _.assign({}, state, {
        currentMissionSections: action.missionResult.sections,
        currentDirectiveIndex: action.currentDirectiveIndex,
        currentTarget: currentTarget
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
                if (q.id === action.responseResult.question.id) {
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


    case SET_QUESTION_LIST_HEIGHT:
      return _.assign({}, state, {
        questionListHeight: action.questionListHeight
      })

    case SELECT_CHOICE:
      return _.assign({}, state, {
        selectedChoiceId: action.choiceId
      })

    case SET_CHOICE_HEIGHT:
      let updatedHeightMap = _.assign({}, state.heightByChoice, action.height)
      return _.assign({}, state, {
        heightByChoice: updatedHeightMap
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
