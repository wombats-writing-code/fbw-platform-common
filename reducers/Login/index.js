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
const initialState = {
  isLoginInProgress: false,
  form: {
    username: '',
  },
  user: {               // TODO: @Cole, please resolve with what you're doing for d2l and simpleLogin.
    isVisitor: true,
    username: null,
    d2l: null
  }
}
export default function loginReducer (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_AUTHENTICATE_D2L:
      return _.assign({}, state, {
        user: _.assign({}, state.user, {
          username: action.username,
          d2l: {
            authenticatedUrl: action.url
          }
        })
      })

    case UPDATE_USERNAME:
      return _.assign({}, state, {
        form: {
          username: action.username ? action.username.replace(/\s/g, '') : ''
        }
      })

    case LOGGED_IN_OPTIMISTIC:
      return _.assign({}, state, {
        isLoginInProgress: true
      })

    case LOGGED_IN:
      return _.assign({}, state, {
        user: {
          username: action.data.username,
          isVisitor: state.user.isVisitor
        },
        isLoginInProgress: false
      })

    case LOG_OUT:
      return _.assign({}, state, {
        form: {
          username: '',
          school: 'acc'
        },
        d2l: {},
        user: {
          isVisitor: true,
          username: ''
        },
        isLoginInProgress: false,
        isVisitor: false
      })


    default:
      return state
  }
}
