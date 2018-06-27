import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'
let Q = require('q')

import { getDomain } from '../../utilities'

export const REGISTER_USER_OPTIMISTIC = 'REGISTER_USER_OPTIMISTIC'
export const RECEIVE_REGISTER_USER = 'RECEIVE_REGISTER_USER'
export const FAILED_REGISTER_USER = 'FAILED_REGISTER_USER'

export function receiveRegisterUser(user) {
  return {type: RECEIVE_REGISTER_USER, user };
}

export function failedRegisterUser(error) {
  return { type: FAILED_REGISTER_USER, error };
}

export function registerUserOptimistic() {
   return {type: REGISTER_USER_OPTIMISTIC };
}

export function registerUser(userObject) {
  if (!userObject) {
    throw new Error('Must include a userObject')
  };

  return function(dispatch) {
    dispatch(registerUserOptimistic());

    return axios({
      method: 'POST',
      url: `${getDomain()}/l4/register`,
      data: {
        user: userObject
      }
    })
    .then( res => {
      dispatch(receiveRegisterUser(res.data));
    })
    .catch( err => {
      dispatch(failedRegisterUser(err));
    })
  }
}
