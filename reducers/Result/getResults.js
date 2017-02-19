//. Phase I results
import axios from 'axios'
import Q from 'q'

import {getDomain} from '../../utilities'

// ------------------------------------
// Actions
// ------------------------------------

export const GET_RESULTS_OPTIMISTIC = 'GET_RESULTS_OPTIMISTIC'
export const RECEIVE_RESULTS = 'RECEIVE_RESULTS'

export function receiveResults(results) {
  return {type: RECEIVE_RESULTS, results};
}

export function getResultsOptimistic(results) {
  return {type: GET_RESULTS_OPTIMISTIC, results };
}

/**
  getResults gets an array of results for a mission
  arguments:
    - mission: required
    - student id: optional
*/
export function getResults(data) {
  if (!data.mission) {
    throw new TypeError('getResults must be provided a mission object')
  }

  if (!data.username) {
    throw new TypeError('getResults must be provided a username field')
  }

  return function(dispatch) {
    dispatch(getResultsOptimistic());

    return axios({
      url: `${getDomain()}/l4/results?missionId=${data.mission.id}`,
      headers: {
        'x-fbw-username': data.username
      }
    })
    .then((results) => {
      // console.log('received results', results.data)
      dispatch(receiveResults(results.data));
      return results.data;
    })
    .catch((error) => {
      console.log('error getting mission results', error);
    })
  }
}
