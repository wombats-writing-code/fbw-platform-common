
import _ from 'lodash'
import axios from 'axios'

import { getDomain } from '../../utilities'
import { convertUTCPythonDateToJSUTC, localDateTime } from '../../utilities/time'
import { convertMissionForm } from './_convertMissionFormHelper'
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


export function createMission(mission, course) {
  return function(dispatch) {
    dispatch(createMissionOptimistic());

    return axios({
      data: {
        mission,
        course
      },
      method: 'POST',
      url: `${getDomain()}/l4/missions/`
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
