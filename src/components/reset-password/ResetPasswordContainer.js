// Reset Password Container
import _ from 'lodash'
import { connect } from 'react-redux'

import {getD2LUserIdentifier} from '../../selectors/login'

import {resetPassword} from '../../reducers/Login/resetPassword'

const mapStateToProps = (state, ownProps) => {
  return {
    sendingEmail: state.login.sendingEmail ? state.login.sendingEmail : null,
    sentEmail: state.login.sentEmail ? state.login.sentEmail : null,
    resetPasswordFailed: state.login.resetPasswordFailed ? state.login.resetPasswordFailed: null,
    d2lUserIdentifer: getD2LUserIdentifier(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleResetPassword: (userData) => dispatch(resetPassword(userData)),
  }
}

const provider = (component) => {
  return connect(mapStateToProps, mapDispatchToProps)(component)
}

export default provider
