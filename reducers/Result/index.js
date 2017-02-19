import thunk from 'redux-thunk';
import _ from 'lodash'

import {GET_RESULTS_OPTIMISTIC, RECEIVE_RESULTS} from './getResults'
import {SELECT_STUDENT_RESULT} from '../Mission/selectStudentResult'
import {CREATE_MISSION_OPTIMISTIC} from '../edit-mission/createMission'


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
      return _.assign({}, state, {
        results: action.results,
        isGetResultsInProgress: false
      });

    case SELECT_STUDENT_RESULT:
      return _.assign({}, state, {
        currentResult: action.missionResult,
      });

    case CREATE_MISSION_OPTIMISTIC:
      return _.assign({}, state, {
        results: null,
      });

    default:
      return state
  }
}
