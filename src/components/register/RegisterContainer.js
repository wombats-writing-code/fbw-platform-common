// Register Container
import _ from 'lodash'
import { connect } from 'react-redux'

import {getD2LUserIdentifier} from '../../selectors/login'

import {registerUser} from '../../reducers/Login/registerUser'
import {resendVerificationEmail} from '../../reducers/Login/resendVerificationEmail'
import {resetPassword} from '../../reducers/Login/resetPassword'

const mapStateToProps = (state, ownProps) => {
  // console.log('state in RegisterContainer', state);

  return {
    emailVerificationRequired: state.login.emailVerificationRequired ? state.login.emailVerificationRequired: null,
    sendingEmail: state.login.sendingEmail ? state.login.sendingEmail : null,
    sentEmail: state.login.sentEmail ? state.login.sentEmail : null,
    failedRegisterUser: state.login.failedRegisterUser ? state.login.failedRegisterUser : null,
    errorMessage: state.login.errorMessage ? state.login.errorMessage : null,
    d2lUserIdentifer: getD2LUserIdentifier(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    registerUser: (userData) => dispatch(registerUser(userData)),
    handleResendVerificationEmail: (userData) => dispatch(resendVerificationEmail(userData)),
    handleResetPassword: (userData) => dispatch(resetPassword(userData))
  }
}

const provider = (component) => {
  return connect(mapStateToProps, mapDispatchToProps)(component)
}

export default provider
