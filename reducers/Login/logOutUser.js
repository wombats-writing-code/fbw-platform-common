
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
    dispatch(logOut())
  }
}
