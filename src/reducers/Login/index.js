// login reducer
import _ from 'lodash'

import {RECEIVE_AUTHENTICATE_D2L, FAILED_AUTHENTICATE_D2L} from './authenticateD2L'
import {RECEIVE_AUTHENTICATE_GUEST, FAILED_AUTHENTICATE_GUEST} from './authenticateGuest'

import { LOG_OUT } from './logOutUser'

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = stampNullUser();

export default function loginReducer (state = initialState, action) {
  switch (action.type) {

    case RECEIVE_AUTHENTICATE_GUEST:
    case RECEIVE_AUTHENTICATE_D2L:
      return _.assign({}, state, {
        user: _.assign({}, state.user, {
          authenticatedUrl: action.data.url,
          d2lUser: action.data.d2lUser
        }),
        isLoggedIn: true
      })

    case LOG_OUT:
      return _.assign({}, stampNullUser())

    case FAILED_AUTHENTICATE_D2L:
    case FAILED_AUTHENTICATE_GUEST:
      return _.assign({}, state, {
        isLoggedIn: false,
        logInError: true
      })

    default:
      return state
  }
}

function stampNullUser() {
  return {
    user: {
    },
    isLoggedIn: false,
    logInError: false,
    isLoginInProgress: false,
  }
}
