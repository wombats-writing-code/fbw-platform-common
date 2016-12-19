
import _ from 'lodash'
import axios from 'axios'

import { getDomain, convertPythonDateToJS, save } from '../../utilities'

// ----
// Action types
export const RECEIVE_MISSIONS = 'RECEIVE_MISSIONS'
export const GET_MISSIONS = 'GET_MISSIONS'
export const GET_MISSIONS_OPTIMISTIC = 'GET_MISSIONS_OPTIMISTIC'

// ----

// ------------------------------------
// Actions
// ------------------------------------

export function receiveMissions (missions) {
  return { type: RECEIVE_MISSIONS, missions }
}

export function getMissionsOptimistic (data) {
  return { type: GET_MISSIONS_OPTIMISTIC, data }
}

// returns a list of Mission offereds
export function getMissions (data) {
  return function (dispatch) {
    dispatch(getMissionsOptimistic())

    // let's change this to do the privateBankAlias calculation in the middleman
    let options = {
      url: `${getDomain()}/middleman/banks/${data.subjectBankId}/missions`,
      headers: {
        'x-fbw-username': data.username
      }
    }

    return axios(options)
    .then((missions) => {
      // console.log('received getting missions', missions)
      // Python months run from 1-12, JavaScript months run from 0-11. We need to adjust the dates here.
      missions = _.map(missions.data, (mission) => {
        return _.assign({}, mission, {
          startTime: convertPythonDateToJS(mission.startTime),
          deadline: convertPythonDateToJS(mission.deadline)
        })
      })

      dispatch(receiveMissions(missions))
    })
    .catch((error) => {
      console.log('error getting missions data', error)
    })

  }
}

function _getPrivateBankId(data) {
  let options = {
    url: `${getDomain()}/middleman/banks/${data.subjectBankId}/privatebankid`,
    headers: {
      'x-fbw-username': data.username
    }
  }

  return axios(options)
  .then((privateBankId) => {
    // console.log('got from middleman the selected subject\'s privateBankId of:', privateBankId);

    save('privateBankId', privateBankId.data)

    return privateBankId.data;
  })
  .catch((error) => {
    console.log('error getting private bank id', error)
  })
}
