import _ from 'lodash'
import axios from 'axios'
import Q from 'q'
import { getDomain } from '../../utilities'

// ----
// Action types
export const RECEIVE_CREATE_TAKE_MISSION = 'RECEIVE_CREATE_TAKE_MISSION'
export const CREATE_TAKE_MISSION = 'CREATE_TAKE_MISSION'
export const CREATE_TAKE_MISSION_OPTIMISTIC = 'CREATE_TAKE_MISSION_OPTIMISTIC'

// ----

// ------------------------------------
// Actions
// ------------------------------------

export function receiveOpenMission (mission) {
  return { type: RECEIVE_CREATE_TAKE_MISSION, mission }
}

export function openMissionOptimistic (mission) {
  return { type: CREATE_TAKE_MISSION_OPTIMISTIC, mission }
}

export function selectOpenMission (data) {
  if (!data.mission) {
    throw TypeError('selectOpenMission must be provided a mission object');
  }

  if (!data.user) {
    throw TypeError('selectOpenMission must be provided a user object');
  }

  return function (dispatch) {
    dispatch(openMissionOptimistic(data.mission))

    let options = {
      url: `${getDomain()}/l4/missions/${data.mission._id}`,
      method: 'POST',
      headers: {
        'x-fbw-user': data.user.Identifier
      }
    };

    return axios(options)
    .then((res) => {
      dispatch(receiveOpenMission(res.data));
      return res.data;
    })
    .catch((error) => {
      console.log('error getting mission data', error)
    })
  }
}
