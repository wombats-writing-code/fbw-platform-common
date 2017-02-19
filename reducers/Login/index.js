// login reducer
import _ from 'lodash'

import {RECEIVE_AUTHENTICATE_D2L} from './authenticateD2L'
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
          authenticatedUrl: action.data.url,
          d2lUser: action.data.d2lUser
        }),
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
