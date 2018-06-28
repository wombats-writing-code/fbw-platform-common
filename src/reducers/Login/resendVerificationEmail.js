import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'
let Q = require('q')

import { getDomain } from '../../utilities'

export const RESEND_VERIFICATION_EMAIL_OPTIMISTIC = 'RESEND_VERIFICATION_EMAIL_OPTIMISTIC'
export const RECEIVE_RESEND_VERIFICATION_EMAIL = 'RECEIVE_RESEND_VERIFICATION_EMAIL'
export const FAILED_RESEND_VERIFICATION_EMAIL = 'FAILED_RESEND_VERIFICATION_EMAIL'

export function receiveResendVerificationEmail(user) {
  return {type: RECEIVE_RESEND_VERIFICATION_EMAIL, user };
}

export function failedResendVerificationEmail(error) {
  return { type: FAILED_RESEND_VERIFICATION_EMAIL, error };
}

export function resendVerificationEmailOptimistic() {
   return {type: RESEND_VERIFICATION_EMAIL_OPTIMISTIC };
}

export function resendVerificationEmail(userObject) {
  if (!userObject) {
    throw new Error('Must include a userObject')
  };

  return function(dispatch) {
    dispatch(resendVerificationEmailOptimistic());
    return axios({
      method: 'POST',
      url: `${getDomain()}/l4/resend-verification`,
      data: {
        user: userObject
      }
    })
    .then( res => {
      dispatch(receiveResendVerificationEmail(res.data));
    })
    .catch( err => {
      dispatch(failedResendVerificationEmail(err));
    })
  }
}
