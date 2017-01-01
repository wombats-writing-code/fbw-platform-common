// login reducer

import _ from 'lodash'

import { extractDisplayName } from '../../d2lutils'

import { UPDATE_USERNAME } from './updateUsername'

import { LOGGED_IN_OPTIMISTIC, LOGGED_IN } from './logInUser'
import { RECEIVE_LOG_OUT } from './logOutUser'
import { RECEIVE_SET_VISITOR_LOGIN } from './setVisitorLogin'
import { RECEIVE_SET_D2L_AUTHENTICATED_URL, SET_D2L_AUTHENTICATED_URL_OPTIMISTIC } from './setD2LAuthenticatedUrl'
import { GET_USERNAME_OPTIMISTIC, RECEIVE_USERNAME } from './getUsername'

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  isLoginInProgress: false,
  form: {
    username: '',
  },
  user: {               // TODO: @Cole, please resolve with what you're doing for d2l and simpleLogin.
    displayName: 'Darth Vader',
    isVisitor: true,
    username: null,
    d2l: null
  }
}
export default function loginReducer (state = initialState, action) {
  switch (action.type) {
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
          displayName: extractDisplayName(action.data.username),
          isVisitor: state.user.isVisitor
        },
        isLoginInProgress: false
      })

    case RECEIVE_LOG_OUT:
      return _.assign({}, state, {
        form: {
          username: '',
          school: 'acc'
        },
        d2l: {},
        user: {
          displayName: 'Darth Vader',
          isVisitor: true,
          username: ''
        },
        isLoginInProgress: false,
        isVisitor: false
      })

    case SET_D2L_AUTHENTICATED_URL_OPTIMISTIC:
      return _.assign({}, state)

    case RECEIVE_SET_D2L_AUTHENTICATED_URL:
      return _.assign({}, state, {
        d2l: {
          authenticatedUrl: action.url
        }
      })

    case RECEIVE_SET_VISITOR_LOGIN:
      return _.assign({}, state, {
        user: {
          username: state.user.username,
          displayName: state.user.displayName,
          isVisitor: action.visitor
        }
      })

    case GET_USERNAME_OPTIMISTIC:
      return _.assign({}, state, {
        user: {
          username: null,
          displayName: null,
          isVisitor: state.user.isVisitor
        },
        d2l: {
          authenticatedUrl: null
        },
      })

    case RECEIVE_USERNAME:
      return _.assign({}, state, {
        user: {
          isVisitor: state.user.isVisitor,
          username: action.data.username,
          displayName: state.user.isVisitor ? action.data.username : extractDisplayName(action.data.username)
        },
        d2l: {
          authenticatedUrl: action.data.url
        },
      })

    default:
      return state
  }
}
