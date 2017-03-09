import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'
let Q = require('q')

import { getDomain } from '../../utilities'

export function createUser(userObject) {
  if (!userObject);

  return axios({
    method: 'POST',
    url: `${getDomain()}/l4/users`,
    data: {
      user: userObject
    },
    headers: {
      'x-fbw-user': userObject.Identifier
    }
  })
  .then( res => {
    return res.data
  })
  .catch( err => err)
}
