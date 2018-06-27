// Login Container
import _ from 'lodash'
import { connect } from 'react-redux'

import {getAuthenticationUrl} from '../../d2lutils'
import {authenticateD2L} from '../../reducers/Login/authenticateD2L'
import {getD2LUserIdentifier} from '../../selectors/login'

import {loginGuest} from '../../reducers/Login/loginGuest'

import { logOutUser } from '../../reducers/Login/logOutUser'


const mapStateToProps = (state, ownProps) => {
  // console.log('state in LoginContainer', state);

  return {
    errorMessage: state.login.errorMessage ? state.login.errorMessage : null,
    d2lUserIdentifer: getD2LUserIdentifier(state),
    isLoggedIn: state.login.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => dispatch(logOutUser()),
    handleGuestLogin: (user) => dispatch(loginGuest(user)),
    authenticateD2L: (D2LConfig, url) => dispatch(authenticateD2L(D2LConfig, url)) // this should only be needed in the iOS case
  }
}

const provider = (component, D2LConfig) => {
  let mergeProps = (stateProps, dispatchProps, ownProps) => {
    return _.assign({}, stateProps, dispatchProps, ownProps, {
      authenticationUrl: getAuthenticationUrl(D2LConfig),
      D2LConfig
    })
  }
  return connect(mapStateToProps, mapDispatchToProps, mergeProps)(component)
}

export default provider
