import _ from 'lodash'
import axios from 'axios'
import {browserHistory} from 'react-router'
import {getDomain} from '../../utilities'
import {localDateTime} from '../../utilities/time'

export const UPDATE_MISSION_OPTIMISTIC = 'UPDATE_MISSION_OPTIMISTIC'
export const RECEIVE_UPDATE_MISSION = 'RECEIVE_UPDATE_MISSION'
export const UPDATE_MISSIONS_OPTIMISTIC = 'UPDATE_MISSIONS_OPTIMISTIC'
export const RECEIVE_UPDATE_MISSIONS = 'RECEIVE_UPDATE_MISSIONS'

export function receiveUpdateMission(mission) {
  return {type: RECEIVE_UPDATE_MISSION, mission };
}

export function updateMissionOptimistic(mission) {
   return {type: UPDATE_MISSION_OPTIMISTIC, mission };
}

export function receiveUpdateMissions(missions) {
  return {type: RECEIVE_UPDATE_MISSIONS, missions };
}

export function updateMissionsOptimistic(missions) {
   return {type: UPDATE_MISSIONS_OPTIMISTIC, missions };
}

export function updateMission(mission, user) {
  return function(dispatch) {
    dispatch(updateMissionOptimistic());

    return axios({
      method: 'PUT',
      url: `${getDomain()}/l4/missions/${mission.id}/`,
      data: {
        mission,
      },
      headers: {
        'x-fbw-user': user.Identifier,
        'x-fbw-token': user.token
      }
    })
    .then( res => {
      dispatch(receiveUpdateMission(res.data));
      return res.data
    })
    .catch((error) => {
      console.log('error updating mission', error);
    });
  }
}

export function updateMissions(missions, user) {
  return function(dispatch) {
    dispatch(updateMissionsOptimistic());

    return axios({
      method: 'PUT',
      url: `${getDomain()}/l4/missions-bulk/`,
      data: {
        missions,
      },
      headers: {
        'x-fbw-user': user.Identifier,
        'x-fbw-token': user.token
      }
    })
    .then( res => {
      dispatch(receiveUpdateMissions(res.data));
      return res.data
    })
    .catch((error) => {
      console.log('error updating missions', error);
    })
    .then( res => {
      browserHistory.push('/missions');
    });
  }
}
