// login reducer
import _ from 'lodash'

import {RECEIVE_AUTHENTICATE_D2L, FAILED_AUTHENTICATE_D2L} from './authenticateD2L'
import {RECEIVE_AUTHENTICATE_GUEST, FAILED_AUTHENTICATE_GUEST} from './authenticateGuest'
import {RECEIVE_REGISTER_USER, REGISTER_USER_OPTIMISTIC, FAILED_REGISTER_USER} from './registerUser'
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
        isLoggedIn: true,
      })

    case LOG_OUT:
      return _.assign({}, stampNullUser())

    case FAILED_AUTHENTICATE_D2L:
    case FAILED_AUTHENTICATE_GUEST:
      return _.assign({}, state, {
        isLoggedIn: false,
        logInError: true,
      })

    case FAILED_REGISTER_USER:
      return _.assign({}, state, {
        isLoggedIn: false,
        logInError: true,
        errorMessage: 'Username exists',
      })

    case REGISTER_USER_OPTIMISTIC:
      return _.assign({}, state, {
        isLoggedIn: false,
        logInError: false,
        errorMessage: null,
      })

    case RECEIVE_REGISTER_USER:
      return _.assign({}, state, {
        user: action.user
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
