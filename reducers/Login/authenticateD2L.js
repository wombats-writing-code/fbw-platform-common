
import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'
let Q = require('q')
import D2L from 'valence'

import {getD2LEnrollments, whoami} from './_authenticateD2LHelper'
import { getDomain } from '../../utilities'

export const RECEIVE_AUTHENTICATE_D2L = 'RECEIVE_AUTHENTICATE_D2L'

// ------------------------------------
// Actions
// ------------------------------------
export function receiveAuthenticateUrl(data) {
  return { type: RECEIVE_AUTHENTICATE_D2L, data }
}

export function authenticateD2L(D2LConfig, optionalUrl) {

  return function (dispatch) {
    // console.log('authenticateD2L', D2LConfig)

    let url = optionalUrl || `${window.location.pathname}${window.location.search}`;
    let courses, d2lUser;
    if (process.env.NODE_ENV !== 'test') console.log('mounted d2l callback!', url);

    // now get the user enrollments and set them in the global state
    return getD2LEnrollments(D2LConfig, url)
    .then((enrollments) => {
      if (process.env.NODE_ENV !== 'test') console.log("got enrollments", enrollments);

      courses = enrollments;

      return whoami(D2LConfig, url)
    })
    .then((response) => {
      if (process.env.NODE_ENV !== 'test') console.log('got whoami', response);

      d2lUser = response;

      dispatch(receiveAuthenticateUrl({url, courses, d2lUser}));

      return d2lUser;
    })
    .catch( err => {
      console.error(err);
    })
  }
}
