// login reducer
import _ from 'lodash'

import {RECEIVE_AUTHENTICATE_D2L, FAILED_AUTHENTICATE_D2L} from './authenticateD2L'
import {RECEIVE_AUTHENTICATE_GUEST, FAILED_AUTHENTICATE_GUEST} from './authenticateGuest'
import {RECEIVE_REGISTER_USER, REGISTER_USER_OPTIMISTIC, FAILED_REGISTER_USER} from './registerUser'
import {RECEIVE_LOGIN_GUEST, LOGIN_GUEST_OPTIMISTIC, FAILED_LOGIN_GUEST} from './loginGuest'
import {RECEIVE_RESET_PASSWORD, RESET_PASSWORD_OPTIMISTIC, FAILED_RESET_PASSWORD} from './resetPassword'
import {RECEIVE_SET_NEW_PASSWORD, SET_NEW_PASSWORD_OPTIMISTIC, FAILED_SET_NEW_PASSWORD} from './setNewPassword'
import {RECEIVE_RESEND_VERIFICATION_EMAIL, RESEND_VERIFICATION_EMAIL_OPTIMISTIC, FAILED_RESEND_VERIFICATION_EMAIL} from './resendVerificationEmail'
import { LOG_OUT } from './logOutUser'

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = stampNullUser();

export default function loginReducer (state = initialState, action) {
  switch (action.type) {

    case RECEIVE_AUTHENTICATE_GUEST:
    case RECEIVE_AUTHENTICATE_D2L:
    case RECEIVE_LOGIN_GUEST:
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
        failedRegisterUser: true,
        errorMessage: action.error.response.data.indexOf('unverified') > -1 ?
          'Username registered but unverified' :
          'Username exists. Did you forget your password?',
      })

    case FAILED_LOGIN_GUEST:
      return _.assign({}, state, {
        isLoggedIn: false,
        logInError: true,
        errorMessage: 'Failed login',
      })

    case RESET_PASSWORD_OPTIMISTIC:
      return _.assign({}, state, {
        sendingEmail: true,
        sentEmail: false,
        resetPasswordFailed: false
      })

    case RECEIVE_RESET_PASSWORD:
      return _.assign({}, state, {
        sendingEmail: false,
        sentEmail: true,
        resetPasswordFailed: false
      })

    case FAILED_RESET_PASSWORD:
      return _.assign({}, state, {
        sendingEmail: false,
        sentEmail: true,
        resetPasswordFailed: true
      })

    case SET_NEW_PASSWORD_OPTIMISTIC:
      return _.assign({}, state, {
        setNewPasswordFailed: false,
        setNewPasswordDone: false,
        settingNewPassword: true
      })

    case RECEIVE_SET_NEW_PASSWORD:
      return _.assign({}, state, {
        setNewPasswordDone: true,
        settingNewPassword: false
      })

    case FAILED_SET_NEW_PASSWORD:
      return _.assign({}, state, {
        setNewPasswordFailed: true
      })

    case RESEND_VERIFICATION_EMAIL_OPTIMISTIC:
      return _.assign({}, state, {
        sendingEmail: true,
        sentEmail: false,
        resendVerificationEmailFailed: false
      })

    case RECEIVE_RESEND_VERIFICATION_EMAIL:
      return _.assign({}, state, {
        sendingEmail: false,
        sentEmail: true,
        resendVerificationEmailFailed: false
      })

    case FAILED_RESEND_VERIFICATION_EMAIL:
      return _.assign({}, state, {
        sendingEmail: false,
        resendVerificationEmailFailed: true
      })

    case REGISTER_USER_OPTIMISTIC:
      return _.assign({}, state, {
        isLoggedIn: false,
        logInError: false,
        failedRegisterUser: false,
        errorMessage: null
      })

    case LOGIN_GUEST_OPTIMISTIC:
      return _.assign({}, state, {
        isLoggedIn: false,
        logInError: false,
        errorMessage: null,
      })

    case RECEIVE_REGISTER_USER:
      return _.assign({}, state, {
        user: action.user,
        emailVerificationRequired: true
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
    emailVerificationRequired: false
  }
}
