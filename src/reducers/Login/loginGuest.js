import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'
let Q = require('q')

import { getDomain } from '../../utilities'

export const LOGIN_GUEST_OPTIMISTIC = 'LOGIN_GUEST_OPTIMISTIC'
export const RECEIVE_LOGIN_GUEST = 'RECEIVE_LOGIN_GUEST'
export const FAILED_LOGIN_GUEST = 'FAILED_LOGIN_GUEST'

export function receiveLoginGuest(data) {
  return {type: RECEIVE_LOGIN_GUEST, data };
}

export function failedLoginGuest(error) {
  return { type: FAILED_LOGIN_GUEST, error };
}

export function loginGuestOptimistic() {
   return {type: LOGIN_GUEST_OPTIMISTIC };
}

export function loginGuest(userObject) {
  if (!userObject) {
    throw new Error('Must include a userObject')
  };

  return function(dispatch) {
    dispatch(loginGuestOptimistic());

    return axios({
      method: 'POST',
      url: `${getDomain()}/l4/guest-login`,
      data: {
        user: userObject
      }
    })
    .then( res => {
      dispatch(receiveLoginGuest({d2luser: res.data}));
    })
    .catch( err => {
      dispatch(failedLoginGuest(err));
    })
  }
}
