
import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'
let Q = require('q')
import D2L from 'valence'

import {instructorCourses, enrollments, whoami} from './_authenticateD2LHelper'


export const RECEIVE_AUTHENTICATE_D2L = 'RECEIVE_AUTHENTICATE_D2L'
export const AUTHENTICATE_D2L_OPTIMISTIC = 'AUTHENTICATE_D2L_OPTIMISTIC'

// ------------------------------------
// Actions
// ------------------------------------
export function receiveAuthenticateUrl(data) {
  return { type: RECEIVE_AUTHENTICATE_D2L, data }
}

export function authenticateD2LOptimistic () {
  return { type: AUTHENTICATE_D2L_OPTIMISTIC }
}

export function authenticateD2LInstructor(credentials, optionalUrl) {

  return function (dispatch) {
    dispatch(authenticateD2LOptimistic());

    // console.log('authenticateD2LInstructor', credentials)

    let url = optionalUrl || `${window.location.pathname}${window.location.search}`;
    let banks, username;
    if (process.env.NODE_ENV !== 'test') console.log('mounted d2l callback!', url);

    // now get the user enrollments and set them in the global state
    return instructorCourses(credentials, url)
    .then((enrolled) => {
      if (process.env.NODE_ENV !== 'test') console.log("got banks", enrolled);
      banks = enrolled;

      return whoami(credentials, url)
    })
    .then((response) => {
      if (process.env.NODE_ENV !== 'test') console.log('got whoami', response);

      username = stringifyUsername(response);

      dispatch(receiveAuthenticateUrl({url, banks, username}));

      return username;
    })
  }
}

export function authenticateD2LStudent(credentials) {

  return function (dispatch) {
    console.log('authenticateD2LStudent', credentials)

    let url = `${window.location.pathname}${window.location.search}`;
    let banks, username;
    console.log('mounted d2l callback!', url)

    return enrollments(credentials, url)
    .then((enrolled) => {
      if (process.env.NODE_ENV !== 'test') console.log("got banks", enrolled);
      banks = enrolled;

      return whoami(credentials, url)
    })
    .then((response) => {
      if (process.env.NODE_ENV !== 'test') console.log('got whoami', response);

      username = stringifyUsername(response);

      dispatch(receiveAuthenticateUrl({url, banks, username}));

      return response;
    })
  }
}


export function stringifyUsername (whoami) {
  return `${whoami.FirstName}-${whoami.LastName}-${whoami.Identifier}@acc.edu`
}
