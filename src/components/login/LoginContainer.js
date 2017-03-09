// Login Container
import _ from 'lodash'
import { connect } from 'react-redux'

import {getAuthenticationUrl} from '../../d2lutils'
import {authenticateD2L} from '../../reducers/Login/authenticateD2L'
import {getD2LUserIdentifier} from '../../selectors/login'

import {getGuestAuthenticationUrl} from '../../reducers/Login/authenticateGuest'

import { logOutUser } from '../../reducers/Login/logOutUser'


const mapStateToProps = (state, ownProps) => {
  // console.log('state in LoginContainer', state);

  return {
    d2lUserIdentifer: getD2LUserIdentifier(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => dispatch(logOutUser()),
    authenticateD2L: (D2LConfig, url) => dispatch(authenticateD2L(D2LConfig, url)) // this should only be needed in the iOS case
  }
}

const provider = (component, D2LConfig) => {
  let mergeProps = (stateProps, dispatchProps, ownProps) => {
    return _.assign({}, stateProps, dispatchProps, ownProps, {
      guestAuthenticationUrl: getGuestAuthenticationUrl(),
      authenticationUrl: getAuthenticationUrl(D2LConfig),
      D2LConfig
    })
  }
  return connect(mapStateToProps, mapDispatchToProps, mergeProps)(component)
}

export default provider
