import _ from 'lodash'
import axios from 'axios'

import {getDomain} from '../../utilities'
import {localDateTime} from '../../utilities/time'

export const UPDATE_MISSION_OPTIMISTIC = 'UPDATE_MISSION_OPTIMISTIC'
export const RECEIVE_UPDATE_MISSION = 'RECEIVE_UPDATE_MISSION'

export function receiveUpdateMission(mission) {
  return {type: RECEIVE_UPDATE_MISSION, mission };
}

export function updateMissionOptimistic(mission) {
   return {type: UPDATE_MISSION_OPTIMISTIC, mission };
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
        'x-fbw-user': user.Identifier
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
