import _ from 'lodash'
import axios from 'axios'
import Q from 'q'
import { getDomain } from '../../utilities'

// ----
// Action types
export const RECEIVE_CLOSED_MISSION = 'RECEIVE_CLOSED_MISSION'
export const GET_CLOSED_MISSION_OPTIMISTIC = 'GET_CLOSED_MISSION_OPTIMISTIC'

// ----

// ------------------------------------
// Actions
// ------------------------------------

export function receiveClosedMission (mission) {
  return { type: RECEIVE_CLOSED_MISSION, mission }
}

export function getClosedMissionOptimistic (mission) {
  return { type: GET_CLOSED_MISSION_OPTIMISTIC, mission }
}

export function selectClosedMission (data) {
  return function (dispatch) {

    dispatch(getClosedMissionOptimistic(data.mission))

    // console.log('url', `${getDomain()}/l4/results?missionId=${data.mission._id}&userId=${data.user.Identifier}&reconstruction=true`)

    return axios({
      url: `${getDomain()}/l4/results?missionId=${data.mission._id}&userId=${data.user.Identifier}&reconstruction=true`,
      headers: {
        'x-fbw-user': data.user.Identifier
      }
    })
    .then((res) => {
      dispatch(receiveClosedMission(res.data))
      return res.data;
    });
  }
}
