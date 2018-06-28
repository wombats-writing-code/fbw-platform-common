// Set New Password Container
import _ from 'lodash'
import { connect } from 'react-redux'

import {getD2LUserIdentifier} from '../../selectors/login'

import {setNewPassword} from '../../reducers/Login/setNewPassword'

const mapStateToProps = (state, ownProps) => {
  return {
    setNewPasswordDone: state.login.setNewPasswordDone ? state.login.setNewPasswordDone : null,
    setNewPasswordFailed: state.login.setNewPasswordFailed ? state.login.setNewPasswordFailed: null,
    d2lUserIdentifer: getD2LUserIdentifier(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleSetNewPassword: (userData) => dispatch(setNewPassword(userData)),
  }
}

const provider = (component) => {
  return connect(mapStateToProps, mapDispatchToProps)(component)
}

export default provider
