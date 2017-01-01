
const Lockr = require('lockr')
// import store from 'react-native-simple-store';

import {isBrowser} from '../../utilities'
// ----
// Action types
export const LOG_OUT = 'LOG_OUT'

// ----

// ------------------------------------
// Actions
// ------------------------------------

export function logOut (data) {
  return { type: LOG_OUT, data }
}

export function logOutUser () {

  return function (dispatch) {
    if (isBrowser()) {
      Lockr.flush()

    } else {
      store.keys()
      .then((keys) => {
        _.each(keys, (key) => {
          store.delete(key)
        })
      })
    }

    flush()

    dispatch(logOut())
  }
}
