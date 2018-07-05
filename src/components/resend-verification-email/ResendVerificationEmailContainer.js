// Resend Verification Email Container
import _ from 'lodash'
import { connect } from 'react-redux'

import {getD2LUserIdentifier} from '../../selectors/login'
import {resendVerificationEmail} from '../../reducers/Login/resendVerificationEmail'

const mapStateToProps = (state, ownProps) => {
  return {
    sendingEmail: state.login.sendingEmail ? state.login.sendingEmail : null,
    sentEmail: state.login.sentEmail ? state.login.sentEmail : null,
    resendVerificationEmailFailed: state.login.resendVerificationEmailFailed ? state.login.resendVerificationEmailFailed: null,
    d2lUserIdentifer: getD2LUserIdentifier(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleResendVerificationEmail: (userData) => dispatch(resendVerificationEmail(userData)),
  }
}

const provider = (component) => {
  return connect(mapStateToProps, mapDispatchToProps)(component)
}

export default provider
