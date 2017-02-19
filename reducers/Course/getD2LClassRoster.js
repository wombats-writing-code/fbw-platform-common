
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
  if (!data.D2LConfig) {
    throw new TypeError('data must have a D2LConfig object')
  }

  if (!data.url) {
    throw new TypeError('data must have a url string that is the d2l authenticatedUrl')
  }

  if (!data.courseId) {
    throw new TypeError('data must have the course Identifier of the course')
  }

  return function (dispatch) {
    dispatch(getD2LClassRosterOptimistic());

    // now get the user enrollments and set them in the global state
    return classRoster(data.D2LConfig, data.url, data.courseId)
    .then((roster) => {
      dispatch(receiveD2LClassRoster(roster));
      return roster;
    })
  }
}
