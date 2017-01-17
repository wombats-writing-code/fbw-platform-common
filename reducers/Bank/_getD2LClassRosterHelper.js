import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'
let Q = require('q')
import D2L from 'valence'

import { getDomain } from '../../utilities'

/*
  Gets the class roster for the given orgUnitId (subject)
  http://docs.valence.desire2learn.com/res/enroll.html#get--d2l-api-le-(version)-(orgUnitId)-classlist-

  Example output:
  [{
    "Identifier": "192051",
    "ProfileIdentifier": "QKGjIK9TtN",
    "DisplayName": "Butter, Peanut",
    "Username": null,
    "OrgDefinedId": "S00091797",
    "Email": null
}, {
    "Identifier": "541478",
    "ProfileIdentifier": "PxYdCajIl2",
    "DisplayName": "STUDENT, D2L DEMO",
    "Username": null,
    "OrgDefinedId": "",
    "Email": null
}, {
    "Identifier": "1145643",
    "ProfileIdentifier": "CysbV9a9rl",
    "DisplayName": "Butter, Apple",
    "Username": null,
    "OrgDefinedId": "S123456789",
    "Email": null
}, {
    "Identifier": "1145644",
    "ProfileIdentifier": "x3bBipYfyT",
    "DisplayName": "Butter, Nutter",
    "Username": null,
    "OrgDefinedId": "S99999991",
    "Email": null
}, {
    "Identifier": "1145645",
    "ProfileIdentifier": "z3nhAwDiHX",
    "DisplayName": "Butter, Shea",
    "Username": null,
    "OrgDefinedId": "S99999992",
    "Email": null
}, {
    "Identifier": "1145647",
    "ProfileIdentifier": "a1S1Xwi9XA",
    "DisplayName": "Nutter, Flutter",
    "Username": null,
    "OrgDefinedId": "S99999993",
    "Email": null
}, {
    "Identifier": "1145648",
    "ProfileIdentifier": "vxoLfzDy39",
    "DisplayName": "Scotch, Butter",
    "Username": null,
    "OrgDefinedId": "S99999994",
    "Email": null
}]
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
