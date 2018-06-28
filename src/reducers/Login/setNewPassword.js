import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'
let Q = require('q')

import { getDomain } from '../../utilities'

export const SET_NEW_PASSWORD_OPTIMISTIC = 'SET_NEW_PASSWORD_OPTIMISTIC'
export const RECEIVE_SET_NEW_PASSWORD = 'RECEIVE_SET_NEW_PASSWORD'
export const FAILED_SET_NEW_PASSWORD = 'FAILED_SET_NEW_PASSWORD'

export function receiveSetNewPassword(user) {
  return {type: RECEIVE_SET_NEW_PASSWORD, user };
}

export function failedSetNewPassword(error) {
  return { type: FAILED_SET_NEW_PASSWORD, error };
}

export function setNewPasswordOptimistic() {
   return {type: SET_NEW_PASSWORD_OPTIMISTIC };
}

export function setNewPassword(userObject) {
  if (!userObject) {
    throw new Error('Must include a userObject')
  };

  return function(dispatch) {
    dispatch(setNewPasswordOptimistic());
    return axios({
      method: 'POST',
      url: `${getDomain()}/l4/set-password`,
      data: {
        user: userObject
      }
    })
    .then( res => {
      dispatch(receiveSetNewPassword(res.data));
    })
    .catch( err => {
      dispatch(failedSetNewPassword(err));
    })
  }
}
