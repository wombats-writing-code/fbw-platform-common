import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'
let Q = require('q')

import { getDomain } from '../../utilities'

export const RESET_PASSWORD_OPTIMISTIC = 'RESET_PASSWORD_OPTIMISTIC'
export const RECEIVE_RESET_PASSWORD = 'RECEIVE_RESET_PASSWORD'
export const FAILED_RESET_PASSWORD = 'FAILED_RESET_PASSWORD'

export function receiveResetPassword(user) {
  return {type: RECEIVE_RESET_PASSWORD, user };
}

export function failedResetPassword(error) {
  return { type: FAILED_RESET_PASSWORD, error };
}

export function resetPasswordOptimistic() {
   return {type: RESET_PASSWORD_OPTIMISTIC };
}

export function resetPassword(userObject) {
  if (!userObject) {
    throw new Error('Must include a userObject')
  };

  return function(dispatch) {
    dispatch(resetPasswordOptimistic());
    return axios({
      method: 'POST',
      url: `${getDomain()}/l4/reset-password`,
      data: {
        user: userObject
      }
    })
    .then( res => {
      dispatch(receiveResetPassword(res.data));
    })
    .catch( err => {
      dispatch(failedResetPassword(err));
    })
  }
}
