
import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'
let Q = require('q')
import D2L from 'valence'

import {instructorCourses, enrollments, whoami} from './_authenticateD2LHelper'
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

export function authenticateD2LStudent(credentials, optionalUrl, testUsername) {

  return function (dispatch) {
    // console.log('authenticateD2LStudent', credentials)

    let url = optionalUrl || `${window.location.pathname}${window.location.search}`;
    let banks, username;
    // console.log('mounted d2l callback!', url)

    return enrollments(credentials, url)
    .then((enrolled) => {
      if (process.env.NODE_ENV !== 'test') console.log("got banks", enrolled);
      banks = enrolled;

      return whoami(credentials, url)
    })
    .then((response) => {
      if (process.env.NODE_ENV !== 'test') console.log('got whoami', response);

      if (process.env.NODE_ENV === 'test') {
        if (testUsername) {
          username = testUsername
        } else {
          username = stringifyUsername(response)
        }
      } else {
        username = stringifyUsername(response);
      }

      return createBaseQBankStudentAuthorizations(username)
    })
    .then((response) => {
      // Only have to do this for D2L students, because we skip the "Subjects"
      // route for them. Instructors still select their subject, so this
      // action is handled in selectBank.js
      let promises = []
      _.each(banks, (bank) => {
        let options = {
          url: `${getDomain()}/middleman/banks/${bank.id}/privatebankid`,
          headers: {
            'x-fbw-username': username
          }
        }
        promises.push(axios(options))
      })

      return axios.all(promises)
    })
    .then((response) => {
      dispatch(receiveAuthenticateUrl({url, banks, username}));

      return response;
    })
    .catch((err) => {
      console.log(err)
    })
  }
}


export function stringifyUsername (whoami) {
  return `${whoami.FirstName}-${whoami.LastName}-${whoami.Identifier}@acc.edu`
}
