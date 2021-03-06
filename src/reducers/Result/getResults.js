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

  if (!data.user) {
    throw new TypeError('getResults must be provided a user field')
  }

  return function(dispatch) {
    dispatch(getResultsOptimistic());

    return _getResults(data.mission.id, data.user)
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

/**
  accepts an array of mission ids to get results in one go
*/
export function getResultsBulk(data) {
  let getResultsPromises = _.map(data.missions, id => _getResults(id, data.user));

  return function(dispatch) {
    dispatch(getResultsOptimistic());

    return Q.all(getResultsPromises)
    .then( res => {
      dispatch(receiveResults(_.flatten(_.map(res, 'data'))));
      return res.data;
    })
    .catch((error) => {
      console.log('error getting mission results bulk', error);
    })
  }

}


function _getResults(missionId, user) {
  return axios({
    url: `${getDomain()}/l4/results?missionId=${missionId}`,
    headers: {
      'x-fbw-user': user.Identifier,
      'x-fbw-token': user.token
    }
  })
}
