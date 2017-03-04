import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'
let Q = require('q')

import {createUser} from './createUser'
import { getDomain } from '../../utilities'


export const RECEIVE_AUTHENTICATE_GUEST = 'RECEIVE_AUTHENTICATE_GUEST'

function receiveAuthenticateGuest(data) {
  return {type: RECEIVE_AUTHENTICATE_GUEST, data}
}

export function getGuestAuthenticationUrl() {
  return `${getDomain()}/mock-d2l/authenticate-guest`;
}

export function authenticateGuest() {
  return function(dispatch) {

    // now get the user enrollments and set them in the global state
    return axios({
      url: `${getDomain()}/mock-d2l/enrollments`,
    })
    .then((enrollments) => {
      if (process.env.NODE_ENV !== 'test') console.log("got enrollments", enrollments);

      courses = enrollments;

      return axios({
        url: `${getDomain()}/mock-d2l/whoami`,
      })
    })
    .then((response) => {
      if (process.env.NODE_ENV !== 'test') console.log('got whoami', response);

      d2lUser = response;

      // we need to create the user
      return createUser(d2lUser);
    })
    .then( user => {
      // console.log('create user result', user);
      dispatch(receiveAuthenticateUrl({url, courses, d2lUser: user}));

      return {url, courses, d2lUser}
    })
    .catch( err => {
      console.error(err);
    })

    dispatch(receiveAuthenticateGuest({url, courses, d2lUser: user}))
  }
}

//
// export function authenticateD2L(D2LConfig, optionalUrl) {
//
//   return function (dispatch) {
//     // console.log('authenticateD2L', D2LConfig)
//
//     let url = optionalUrl || `${window.location.pathname}${window.location.search}`;
//     let courses, d2lUser;
//     if (process.env.NODE_ENV !== 'test') console.log('mounted d2l callback!', url);
//
//     // now get the user enrollments and set them in the global state
//     return getD2LEnrollments(D2LConfig, url)
//     .then((enrollments) => {
//       if (process.env.NODE_ENV !== 'test') console.log("got enrollments", enrollments);
//
//       courses = enrollments;
//
//       return whoami(D2LConfig, url)
//     })
//     .then((response) => {
//       if (process.env.NODE_ENV !== 'test') console.log('got whoami', response);
//
//       d2lUser = response;
//
//       // we need to create the user
//       return createUser(d2lUser);
//     })
//     .then( user => {
//       // console.log('create user result', user);
//       dispatch(receiveAuthenticateUrl({url, courses, d2lUser: user}));
//
//       return {url, courses, d2lUser}
//     })
//     .catch( err => {
//       console.error(err);
//     })
//   }
// }
