import _ from 'lodash'
import {browserHistory} from 'react-router'
import axios from 'axios'
import Q from 'q'

import { getDomain } from '../../utilities'
import { localDateTime } from '../../utilities/time'
// ------------------------------------
// Actions
// ------------------------------------

export const CREATE_MISSION_OPTIMISTIC = 'CREATE_MISSION_OPTIMISTIC'
export const RECEIVE_CREATE_MISSION = 'RECEIVE_CREATE_MISSION'
export const CREATE_MISSIONS_OPTIMISTIC = 'CREATE_MISSIONS_OPTIMISTIC'
export const RECEIVE_CREATE_MISSIONS = 'RECEIVE_CREATE_MISSIONS'

export function receiveCreateMission(mission) {
  return {type: RECEIVE_CREATE_MISSION, mission };
}

export function createMissionOptimistic() {
   return {type: CREATE_MISSION_OPTIMISTIC };
}

export function createMissionsOptimistic(mission) {
   return {type: CREATE_MISSIONS_OPTIMISTIC, mission };
}


export function receiveCreateMissions(missions) {
  return {type: RECEIVE_CREATE_MISSIONS, missions };
}


export function createMission(mission, course, user) {
  if (!mission) {
    throw new TypeError('mission object must be provided to createMission')
  }

  if (!course) {
    throw new TypeError('course object must be provided to createMission')
  }

  if (!user) {
    throw new TypeError('course object must be provided to createMission')
  }

  return function(dispatch) {
    dispatch(createMissionOptimistic());

    return axios({
      data: {
        mission,
        courseId: course.Id || course.Identifier,
      },
      method: 'POST',
      url: `${getDomain()}/l4/missions/`,
      headers: {
        'x-fbw-user': user.Identifier,
        'x-fbw-token': user.token
      }
    })
    .then( response => {
      let mission = response.data;

      dispatch(receiveCreateMission(mission));
      return mission;
    })
    .catch((error) => {
      console.log('error creating mission', error);
      return error;
    })
    .then( (result) => {
      // console.log('finally createMission result', result)
      browserHistory.push('/missions');
    });
  }
}

export function createMissions(missions, course, user) {
  return function(dispatch) {
    dispatch(createMissionsOptimistic(missions[0]));

    return axios({
      method: 'POST',
      url: `${getDomain()}/l4/missions-bulk/`,
      data: {
        missions: missions,
        courseId: course.Id || course.Identifier,
      },
      headers: {
        'x-fbw-user': user.Identifier,
        'x-fbw-token': user.token
      }
    })
    .then( res => {
      dispatch(receiveCreateMissions(res.data));
      return res.data;
    })
    .catch( err => err)
    .then( (result) => {
      // console.log('finally createMissions result', result)
      // browserHistory.push('/missions');
    });
  }
}
