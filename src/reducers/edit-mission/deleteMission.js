import thunk from 'redux-thunk';
import 'lodash'
import axios from 'axios'

import {
  getDomain
} from '../../utilities'

export const RECEIVE_DELETE_MISSION = 'RECEIVE_DELETE_MISSION'
export const DELETE_MISSION_OPTIMISTIC = 'DELETE_MISSION_OPTIMISTIC'

export function receiveDeleteMission(mission) {
  return {type: RECEIVE_DELETE_MISSION, mission };
}

export function deleteMissionOptimistic(data) {
  return { type: DELETE_MISSION_OPTIMISTIC, data };
}

export function deleteMission(mission, user) {
  if (!mission) {
    throw TypeError('whole mission object must be provided to deleteMission')
  }

  if (!user) {
    throw TypeError('user object must be provided to deleteMission')
  }

  return function(dispatch) {
    dispatch(deleteMissionOptimistic(mission));

    return axios({
      method: 'DELETE',
      url: `${getDomain()}/l4/missions/${mission.id}`,
      headers: {
        'x-fbw-user': user.Identifier,
        'x-fbw-token': user.token
      }
    })
    .then((results) => {
      dispatch(receiveDeleteMission(mission));
      return mission;
    })
    .catch((error) => {
      console.log('error deleting mission', error);
      return error;
    });
  }
}
