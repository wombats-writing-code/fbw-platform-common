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

export function getGuestAuthenticationUrl(D2LConfig) {
  let role;
  if (D2LConfig && D2LConfig.role === 'instructor') {
    return `${getDomain()}/mock-d2l/authenticate-guest?role=instructor`
  }

  return `${getDomain()}/mock-d2l/authenticate-guest?role=student`
}

export function authenticateGuest(D2LConfig, name) {
  return function(dispatch) {

    let url = 'guest-callback-authentication', courses, d2lUser;
    return axios({
      url: `${getDomain()}/mock-d2l/enrollments?role=${D2LConfig.role}&name=${name}`,
    })
    .then((res) => {
      courses = _.map(res.data.Items, 'OrgUnit')

      if (process.env.NODE_ENV !== 'test') console.log("got enrollments", courses);

      console.log('authenticateGuest name', name)

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
      console.log('create user result', user);
      dispatch(receiveAuthenticateGuest({url, courses, d2lUser: user}))

      return {url, courses, d2lUser}
    })
    .catch( err => {
      console.log(err);
    })

  }
}
