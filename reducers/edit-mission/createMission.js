
import _ from 'lodash'
import axios from 'axios'

import { getDomain } from '../../utilities'
import { convertPythonDateToJS } from '../../utilities/time'
import { convertMissionForm } from './_convertMissionFormHelper'
// ------------------------------------
// Actions
// ------------------------------------

export const CREATE_MISSION = 'CREATE_MISSION'
export const RECEIVE_CREATE_MISSION = 'RECEIVE_CREATE_MISSION'
export const CREATE_MISSION_OPTIMISTIC = 'CREATE_MISSION_OPTIMISTIC'

// @Cole:
// can't be bothered to do the optimistic part, so we'll just wait for the server to give us a response,
// and in the then block it'll dispatch this action,
// and then the reducer will handle it and modify state as needed
export function receiveCreateMission(mission) {
  return {type: RECEIVE_CREATE_MISSION, mission };
}


export function createMissionOptimistic(mission) {
   return {type: CREATE_MISSION_OPTIMISTIC, mission };
}

// this is the actual async createMission function that calls qbank
// Note that this creates a Phase I mission -- NOT the Phase II missions
// Note that this requires the Term BankID, NOT the sharedBankId (that
//   is calculated by the web middleman)
export function createMission(data, bankId, directivesItemsMap, itemBankId) {
  return function(dispatch) {
    dispatch(createMissionOptimistic());

    // here starts the code that actually gets executed when the
    // createMission action creator is dispatched
    // take the data in the "newMission" form in state, and send that to the server
    let missionParams = convertMissionForm(data, directivesItemsMap, itemBankId),
    options = {
      data: missionParams,
      method: 'POST',
      url: `${getDomain()}/middleman/banks/${bankId}/missions`
    }
    // console.log(missionParams)

    return axios(options)
    .then((response) => {
      // console.log('created mission', response.data);
      let mission = _.assign({}, response.data)
      mission.startTime = convertPythonDateToJS(mission.startTime)
      mission.deadline = convertPythonDateToJS(mission.deadline)
      dispatch(receiveCreateMission(mission));
      return mission
    })
    .catch((error) => {
      console.log('error creating mission', error);
    });
  }
}
