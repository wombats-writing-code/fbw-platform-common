
import _ from 'lodash'
import axios from 'axios'

import { getDomain } from '../../utilities'
import {convertUTCPythonDateToJSUTC, localDateTime } from '../../utilities/time'

// ----
// Action types
export const RECEIVE_MISSIONS = 'RECEIVE_MISSIONS'
export const GET_MISSIONS = 'GET_MISSIONS'
export const GET_MISSIONS_OPTIMISTIC = 'GET_MISSIONS_OPTIMISTIC'

// ----

// ------------------------------------
// Actions
// ------------------------------------

export function receiveMissions (missions) {
  return { type: RECEIVE_MISSIONS, missions }
}

export function getMissionsOptimistic (data) {
  return { type: GET_MISSIONS_OPTIMISTIC, data }
}

// returns a list of Missions
export function getMissions (data) {
  if (!data.username) {
    throw TypeError('data must have username field')
  }

  if (!data.course) {
    throw TypeError('data must havve course object')
  }

  return function (dispatch) {
    dispatch(getMissionsOptimistic())

    // let's change this to do the privateBankAlias calculation in the middleman
    let options = {
      url: `${getDomain()}/l4/missions` + `?courseId=${data.course.Id || data.course.Identifier}`,
      headers: {
        'x-fbw-username': data.username
      }
    }

    return axios(options)
    .then((res) => {
      dispatch(receiveMissions(res.data));

      return res.data;
    })
    .catch((error) => {
      console.log('error getting missions data', error)
    })

  }
}
