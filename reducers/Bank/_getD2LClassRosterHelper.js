import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'
let Q = require('q')
import D2L from 'valence'

import { getDomain } from '../../utilities'

/*
  Gets the class roster for the given orgUnitId (subject)
  http://docs.valence.desire2learn.com/res/enroll.html#get--d2l-api-le-(version)-(orgUnitId)-classlist-
*/
export function classRoster (credentials, url, orgUnitId) {
  let AppContext = new D2L.ApplicationContext(credentials.appID, credentials.appKey);
  let userContext = AppContext.createUserContext(credentials.host, credentials.port, url)
  let rosterUrl = `/d2l/api/le/1.5/${orgUnitId}/classlist/`
  let options = {
    url: userContext.createAuthenticatedUrl(rosterUrl, 'GET') + _appendDevRole(credentials)
  }

  // console.log('roster options', options)

  return axios(options)
  .then((response) => {
    if (process.env.NODE_ENV !== 'test') console.log('got d2l class list', response);

    return Q.when(response.data)
  })
  .catch((error) => {
    console.log('error getting d2l class roster', error)
  })
}

function _appendDevRole(credentials) {
  if (process.env.NODE_ENV !== 'production') {
    return '&role=' + credentials.role
  }

  return '';
}
