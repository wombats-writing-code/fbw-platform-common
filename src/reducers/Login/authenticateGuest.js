import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'
let Q = require('q')

import {createUser} from './createUser'
import { getDomain } from '../../utilities'


export const RECEIVE_AUTHENTICATE_GUEST = 'RECEIVE_AUTHENTICATE_GUEST'
export const FAILED_AUTHENTICATE_GUEST = 'FAILED_AUTHENTICATE_GUEST'

function receiveAuthenticateGuest(data) {
  return {type: RECEIVE_AUTHENTICATE_GUEST, data}
}

function failedAuthenticateGuest() {
  return {type: FAILED_AUTHENTICATE_GUEST}
}

export function getGuestAuthenticationUrl(D2LConfig) {
  if (!D2LConfig) {
    throw new Error('D2LConfig object must be given to getGuestAuthenticationUrl')
  }

  let role = D2LConfig.role;

  return `${getDomain()}/mock-d2l/authenticate-guest?role=${role}`
}

export function authenticateGuest(D2LConfig, name) {
  if (!D2LConfig) {
    throw new Error('D2LConfig object must be given to getGuestAuthenticationUrl')
  }

  let role = D2LConfig.role;

  return function(dispatch) {
    let url = 'guest-callback-authentication', courses, d2lUser;
    return axios({
      url: `${getDomain()}/mock-d2l/enrollments?role=${role}&name=${name}`,
    })
    .then((res) => {

      if (role === 'student') {
        courses = _.map(res.data.Items, 'OrgUnit')
      } else {
        courses = res.data;
      }

      if (process.env.NODE_ENV !== 'test') console.log("got enrollments", courses);

      // console.log('authenticateGuest name', name)

      // if the name was provided, get the user associated with the name
      if (name) {
        return axios({
          url: `${getDomain()}/mock-d2l/whoami`,
          method: 'POST',
          data: {
            name
          }
        })

      // else, get a random user
      } else {
        return axios({
          url: `${getDomain()}/mock-d2l/whoami`,
        })
      }

    })
    .then((res) => {
      d2lUser = res.data;

      if (process.env.NODE_ENV !== 'test') console.log('got whoami', d2lUser);

      // we need to create the user
      return createUser(d2lUser);
    })
    .then( user => {
      // console.log('create user result', user);
      dispatch(receiveAuthenticateGuest({url, courses, d2lUser: user}))

      return {url, courses, d2lUser}
    })
    .catch( err => {
      // console.log(err);
      dispatch(failedAuthenticateGuest())
    })

  }
}
