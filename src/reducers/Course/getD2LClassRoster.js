import _ from 'lodash'
import Q from 'q'
import axios from 'axios'
import { getDomain } from '../../utilities'
import {classRoster} from './_getD2LClassRosterHelper'


export const RECEIVE_D2L_CLASS_ROSTER = 'RECEIVE_D2L_CLASS_ROSTER'
export const GET_D2L_CLASS_ROSTER_OPTIMISTIC = 'GET_D2L_CLASS_ROSTER_OPTIMISTIC'

// ------------------------------------
// Actions
// ------------------------------------
export function receiveD2LClassRoster(roster) {
  return { type: RECEIVE_D2L_CLASS_ROSTER, roster }
}

export function getD2LClassRosterOptimistic () {
  return { type: GET_D2L_CLASS_ROSTER_OPTIMISTIC }
}

export function getD2LClassRoster(data) {
  if (!data.D2LConfig) {
    throw new TypeError('data must have a D2LConfig object')
  }

  if (!data.url) {
    throw new TypeError('data must have a url string that is the d2l authenticatedUrl')
  }

  if (!data.courseId) {
    throw new TypeError('data must have the course Identifier of the course')
  }

  return function (dispatch) {
    dispatch(getD2LClassRosterOptimistic());
    let roster;

    // now get the user enrollments and set them in the global state
    return Q.when(classRoster(data.D2LConfig, data.url, data.courseId))
    .then((res) => {
      roster = res;
      return Q.when(_getFbWUsers(data.user));
    })
    .then((response) => {
      let users = response;

      let rosterWithIds = _.filter(_.map(roster, person => {
        return _.assign({}, _.find(users, {Identifier: person.Identifier}))
      }), 'id')

      // console.log('rosterWithIds', rosterWithIds)

      dispatch(receiveD2LClassRoster(rosterWithIds));
      return rosterWithIds;
    })
  }
}

export function _getFbWUsers(userObject) {
  return axios({
    url: `${getDomain()}/l4/users`,
    headers: {
      'x-fbw-user': userObject.Identifier,
      'x-fbw-token': userObject.token
    }
  })
  .then( res => {
    // console.log('got fbw users', res.data);
    return res.data
  })
  .catch( err => console.log('err in _getFbWUsers'))
}
