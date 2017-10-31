
import _ from 'lodash'
import axios from 'axios'

import { getDomain } from '../../utilities'
// import {localDateTime } from '../../utilities/time'

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
  if (!data.course) {
    throw TypeError('data must have course object')
  }

  if (!data.user) {
    throw TypeError('data must have user object')
  }

  let getAllMissionsFlag = '';
  if (data.all) {
    getAllMissionsFlag = '&all=true';
  }

  return function (dispatch) {
    dispatch(getMissionsOptimistic())

    return axios({
      url: `${getDomain()}/l4/missions` + `?courseId=${data.course.Id || data.course.Identifier}${getAllMissionsFlag}`,
      headers: {
        'x-fbw-user': data.user.Identifier,
        'x-fbw-token': data.user.token
      }
    })
    .then((res) => {
      dispatch(receiveMissions(res.data));

      return res.data;
    })
    .catch((error) => {
      console.log('error getting missions data', error)
    })

  }
}
