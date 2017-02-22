import _ from 'lodash'
import axios from 'axios'

import { getDomain } from '../../utilities'
import { localDateTime } from '../../utilities/time'
// ------------------------------------
// Actions
// ------------------------------------

export const CREATE_MISSION = 'CREATE_MISSION'
export const RECEIVE_CREATE_MISSION = 'RECEIVE_CREATE_MISSION'
export const CREATE_MISSION_OPTIMISTIC = 'CREATE_MISSION_OPTIMISTIC'

export function receiveCreateMission(mission) {
  return {type: RECEIVE_CREATE_MISSION, mission };
}


export function createMissionOptimistic(mission) {
   return {type: CREATE_MISSION_OPTIMISTIC, mission };
}


export function createMission(mission, course, user) {
  if (!mission) {
    return new TypeError('mission object must be provided to createMission')
  }

  if (!course) {
    return new TypeError('course object must be provided to createMission')
  }

  if (!user) {
    return new TypeError('course object must be provided to createMission')
  }

  return function(dispatch) {
    dispatch(createMissionOptimistic());

    return axios({
      data: {
        mission: {
          displayName: mission.displayName,
          type: mission.type,
          startTime: mission.startTime,
          deadline: mission.deadline,
          goals: mission.goals,
          followsFromMissions: mission.followsFromMissions,
        },
        courseId: course.Id || course.Identifier,
      },
      method: 'POST',
      url: `${getDomain()}/l4/missions/`,
      headers: {
        'x-fbw-user': user.Identifier
      }
    })
    .then((response) => {
      let mission = _.assign({}, response.data)
      dispatch(receiveCreateMission(mission));
      return mission
    })
    .catch((error) => {
      console.log('error creating mission', error);
    });
  }
}
