// Register Container
import _ from 'lodash'
import { connect } from 'react-redux'

import {getD2LUserIdentifier} from '../../selectors/login'

import {registerUser} from '../../reducers/Login/registerUser'

const mapStateToProps = (state, ownProps) => {
  // console.log('state in RegisterContainer', state);

  return {
    errorMessage: state.login.errorMessage ? state.login.errorMessage : null,
    d2lUserIdentifer: getD2LUserIdentifier(state),
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    registerUser: (userData) => dispatch(registerUser(userData)),
  }
}

const provider = (component) => {
  return connect(mapStateToProps, mapDispatchToProps)(component)
}

export default provider
