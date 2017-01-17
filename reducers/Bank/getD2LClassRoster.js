
import _ from 'lodash'
import axios from 'axios'

import {classRoster} from './_getD2LClassRosterHelper'


export const RECEIVE_D2L_CLASS_ROSTER = 'RECEIVE_D2L_CLASS_ROSTER'
export const GET_D2L_CLASS_ROSTER_OPTIMISTIC = 'GET_D2L_CLASS_ROSTER_OPTIMISTIC'

// ------------------------------------
// Actions
// ------------------------------------
export function receiveD2LClassRoster(roster) {
  return { type: RECEIVE_D2L_CLASS_ROSTER, roster }
}

export function getD2LClassRosterOptimistic () {
  return { type: GET_D2L_CLASS_ROSTER_OPTIMISTIC }
}

export function getD2LClassRoster(data) {

  return function (dispatch) {
    dispatch(getD2LClassRosterOptimistic());

    // now get the user enrollments and set them in the global state
    return instructorCourses(data.credentials, data.url, data.orgUnitId)
    .then((roster) => {
      dispatch(receiveD2LClassRoster(roster));

      return username;
    })
  }
}
