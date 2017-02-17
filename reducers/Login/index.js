// login reducer

import _ from 'lodash'

import { extractDisplayName } from '../../d2lutils'

import {RECEIVE_AUTHENTICATE_D2L} from './authenticateD2L'

import { UPDATE_USERNAME } from './updateUsername'
import { LOGGED_IN_OPTIMISTIC, LOGGED_IN } from './logInUser'
import { LOG_OUT } from './logOutUser'

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = stampNullUser();

export default function loginReducer (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_AUTHENTICATE_D2L:
      return _.assign({}, state, {
        user: _.assign({}, state.user, {
          username: action.data.username,
          d2l: {
            authenticatedUrl: action.data.url
          }
        }),
        isVisitor: false,
        isLoggedIn: true
      })

    case LOG_OUT:
      return _.assign({}, state, stampNullUser())


    default:
      return state
  }
}

function stampNullUser() {
  return {
    form: {
      username: '',
      school: 'acc'
    },
    user: {
      d2l: null,
      username: ''
    },
    isLoggedIn: false,
    isLoginInProgress: false,
    isVisitor: false
  }
}
