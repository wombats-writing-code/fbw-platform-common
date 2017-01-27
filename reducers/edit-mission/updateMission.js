
import thunk from 'redux-thunk';
import 'lodash'
import axios from 'axios'

import {getDomain} from '../../utilities'
import {convertPythonDateToJS} from '../../utilities/time'
import {convertMissionForm} from './_convertMissionFormHelper'

export const UPDATE_MISSION = 'UPDATE_MISSION'
export const RECEIVE_UPDATE_MISSION = 'RECEIVE_UPDATE_MISSION'

export function receiveUpdateMission(mission) {
  return {type: RECEIVE_UPDATE_MISSION, mission };
}

export function updateMissionOptimistic(mission) {
   return {type: UPDATE_MISSION, mission };
}

export function updateMission(data, bankId, directivesItemsMap, itemBankId) {
  let missionParams = convertMissionForm(data, directivesItemsMap, itemBankId),
  options = {
    data: missionParams,
    method: 'PUT',
    url: `${getDomain()}/middleman/banks/${bankId}/missions/${data.id}`
  };

  return function(dispatch) {
    dispatch(updateMissionOptimistic(missionParams));

    return axios(options)
    .then(({data: mission}) => {
      // console.log('updated mission', mission);
      mission.startTime = convertPythonDateToJS(mission.startTime)
      mission.deadline = convertPythonDateToJS(mission.deadline)
      dispatch(receiveUpdateMission(mission));
      return mission
    })
    .catch((error) => {
      console.log('error updating mission', error);
    });
  }
}
