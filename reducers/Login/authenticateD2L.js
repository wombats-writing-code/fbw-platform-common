
import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'
let Q = require('q')
import D2L from 'valence'

import {getD2LEnrollments, whoami} from './_authenticateD2LHelper'
import { getDomain } from '../../utilities'
import {createBaseQBankStudentAuthorizations} from './logInUser'

export const RECEIVE_AUTHENTICATE_D2L = 'RECEIVE_AUTHENTICATE_D2L'
export const AUTHENTICATE_D2L_OPTIMISTIC = 'AUTHENTICATE_D2L_OPTIMISTIC'

// ------------------------------------
// Actions
// ------------------------------------
export function receiveAuthenticateUrl(data) {
  return { type: RECEIVE_AUTHENTICATE_D2L, data }
}

export function authenticateD2L(credentials, optionalUrl) {

  return function (dispatch) {
    // console.log('authenticateD2L', credentials)

    let url = optionalUrl || `${window.location.pathname}${window.location.search}`;
    let courses, username;
    if (process.env.NODE_ENV !== 'test') console.log('mounted d2l callback!', url);

    // now get the user enrollments and set them in the global state
    return getD2LEnrollments(credentials, url)
    .then((courses) => {
      if (process.env.NODE_ENV !== 'test') console.log("got courses", courses);

      return whoami(credentials, url)
    })
    .then((response) => {
      if (process.env.NODE_ENV !== 'test') console.log('got whoami', response);

      username = stringifyUsername(response);

      dispatch(receiveAuthenticateUrl({url, courses, username}));

      return username;
    })
  }
}

//
// export function authenticateD2LStudent(credentials, optionalUrl, testUsername) {
//
//   return function (dispatch) {
//     let url = optionalUrl || `${window.location.pathname}${window.location.search}`;
//     let courses, username;
//
//     return getD2LEnrollments(credentials, url)
//     .then((courses) => {
//       if (process.env.NODE_ENV !== 'test') console.log("got courses", courses);
//       courses = enrolled;
//
//       return whoami(credentials, url)
//     })
//     .then((response) => {
//       if (process.env.NODE_ENV !== 'test') console.log('got whoami', response);
//
//       dispatch(receiveAuthenticateUrl({url, courses, username}));
//
//       return response;
//     })
//     .catch((err) => {
//       console.log(err)
//     })
//   }
// }


export function stringifyUsername (whoami) {
  return `${whoami.FirstName}-${whoami.LastName}-${whoami.Identifier}@acc.edu`
}
