// Login Container
import _ from 'lodash'
import { connect } from 'react-redux'

import { logInUser } from '../../reducers/Login/logInUser'
import { updateUsername } from '../../reducers/Login/updateUsername'
import { logOutUser } from '../../reducers/Login/logOutUser'
import {getAuthenticationUrl} from '../../d2lutils'

const mapStateToProps = (state, ownProps) => {
  console.log('state in LoginContainer', state);

  return {
    username: state.login.form ? state.login.form.username : null,
    isLoginInProgress: state.username ? state.login.isLoginInProgress : false,
    currentUsername: state.username ? state.username : null,
    isVisitor: state.login.isVisitor ? state.login.isVisitor : false
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    updateUsername: (username) => dispatch(updateUsername(username)),
    login: (school, username) => dispatch(logInUser(school, username)),
    logout: () => {
      dispatch(logOutUser())
    }
  }
}

const provider = (component, credentials) => {
  let mergeProps = (stateProps, dispatchProps, ownProps) => {
    return _.assign({}, stateProps, dispatchProps, ownProps, {
      authenticationUrl: getAuthenticationUrl(credentials),
      credentials
    })
  }
  return connect(mapStateToProps, mapDispatchToProps, mergeProps)(component)
}

export default provider
