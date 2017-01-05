import _ from 'lodash'
import axios from 'axios'
import Q from 'q'
import D2L from 'valence'

import { getDomain, SCHOOL_TO_BANK } from '../utilities'

export function getAuthenticationUrl (credentials) {
  let AppContext = new D2L.ApplicationContext(credentials.appID, credentials.appKey);
  let authenticationUrl = AppContext.createUrlForAuthentication(credentials.host,
    credentials.port,
    credentials.callbackUrl)

  return authenticationUrl
}


export function bankAliasId (courseId) {
  return `assessment.Bank%3A${courseId}%40ACC.D2L.COM`
}
