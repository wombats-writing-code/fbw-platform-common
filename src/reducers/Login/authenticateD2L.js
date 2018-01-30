
import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'
let Q = require('q')
import D2L from 'valence'
// import queryString from 'query-string'

import {createUser} from './createUser'
import {getD2LEnrollments, whoami} from './_authenticateD2LHelper'
import { getDomain } from '../../utilities'

export const RECEIVE_AUTHENTICATE_D2L = 'RECEIVE_AUTHENTICATE_D2L'
export const FAILED_AUTHENTICATE_D2L = 'FAILED_AUTHENTICATE_D2L'

// ------------------------------------
// Actions
// ------------------------------------
export function receiveAuthenticateUrl(data) {
  return { type: RECEIVE_AUTHENTICATE_D2L, data }
}

export function failedAuthenticateUrl() {
  return { type: FAILED_AUTHENTICATE_D2L }
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

      // courses come directly from the 3rd party D2L endpoint
      courses = enrollments;

      return whoami(D2LConfig, url)
    })
    .then((response) => {
      if (process.env.NODE_ENV !== 'test') console.log('got whoami', response);

      d2lUser = response;

      // d2lUser.D2LTokens = queryString.parse(window.location.search);

      // we need to create the user
      return createUser(d2lUser);
    })
    .then( user => {
      // console.log('create user result', user);
      dispatch(receiveAuthenticateUrl({url, courses, d2lUser: user}));

      return {url, courses, d2lUser}
    })
    .catch( err => {
      console.error('error', err);
      dispatch(failedAuthenticateUrl());
    })
  }
}
