
import _ from 'lodash'
import axios from 'axios'

import { getDomain } from '../../utilities'
import {convertImagePaths} from './_convertImagePaths'

// ----
// Action types
export const SUBMIT_RESPONSE_OPTIMISTIC = 'SUBMIT_RESPONSE_OPTIMISTIC'
export const RECEIVE_SUBMIT_RESPONSE = 'RECEIVE_SUBMIT_RESPONSE'

// ----

// ------------------------------------
// Actions
// ------------------------------------

export function receiveSubmitResponse(responseResult) {
  return {type: RECEIVE_SUBMIT_RESPONSE, responseResult};
}

export function submitResponseOptimistic(data) {
  return {type: SUBMIT_RESPONSE_OPTIMISTIC, data };
}

export function submitResponse(data) {

  return function(dispatch) {
    _validate(data);
    dispatch(submitResponseOptimistic());

    let options = {
      url: `${getDomain()}/l4/respond`,
      method: 'POST',
      data: {
        choice: data.choice,
        question: data.question,
        responseHistory: data.responseHistory
      },
      headers: {
        'x-fbw-username': data.username
      }
    }

    return axios(options)
    .then((res) => {
      dispatch(receiveSubmitResponse(res.data));
      return res.data;
    })
    .catch((error) => {
      console.log('error submitting response', error);
    });
  }
}

function _validate(data) {
  if (!data.course) {
    throw new TypeError('course must be non-null')
  }

  if (!data.responseHistory) {
    throw new TypeError('responseHistory must be an array of the route\'s questions')
  }

  if (!data.question) {
    throw new TypeError('question must be non-null')
  }

  if (!data.choice) {
    throw new TypeError('choice must be non-null')
  }

  if (!data.username) {
    throw new TypeError('username must be non-null')
  }
}
