import thunk from 'redux-thunk';
import _ from 'lodash'

import {GET_RESULTS_OPTIMISTIC, RECEIVE_RESULTS} from './getResults'
import {GET_STUDENT_RESULT_OPTIMISTIC, GET_STUDENT_RESULT_SUCCESS} from './getStudentResult'
import {RECEIVE_DELETE_MISSION, CREATE_MISSION_OPTIMISTIC} from '../edit-mission/createMission'

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {}
export default function resultReducer (state = initialState, action) {
  switch (action.type) {

    case GET_RESULTS_OPTIMISTIC:
      return _.assign({}, state, {
        isGetResultsInProgress: true
      });

    case RECEIVE_RESULTS:
      let groupedByMission = _.groupBy(action.results, 'mission');

      return _.assign({}, state, {
        resultsByMission: _.assign({}, state.resultsByMission, groupedByMission),
        isGetResultsInProgress: false
      });

    case GET_STUDENT_RESULT_OPTIMISTIC:
      return _.assign({}, state, {
        isGetStudentResultInProgress: true,
        currentMission: null
      })

    case GET_STUDENT_RESULT_SUCCESS:
      return _.assign({}, state, {
        currentStudent: action.student,
        currentMission: _.assign({}, action.mission, {
          questions: action.questions
        }),
        isGetStudentResultInProgress: false
      });

    case CREATE_MISSION_OPTIMISTIC:
      return _.assign({}, state, {
        results: null,
      });

    case RECEIVE_DELETE_MISSION:
    console.log('update resultsByMission', action.mission.id);

      return _.assign({}, state, {
        resultsByMission: _.assign({}, state.resultsByMission, {
          [action.mission.id]: undefined
        })
      })


    default:
      return state
  }
}
