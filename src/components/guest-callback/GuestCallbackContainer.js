import _ from 'lodash';
import { connect, dispatch } from 'react-redux'
import GuestCallback from './web/GuestCallback'

import {authenticateGuest } from '../../reducers/Login/authenticateGuest'
import { failedLogIn } from '../../selectors'

const mapStateToProps = (state, ownProps) => {
  return {
    failedLogIn: failedLogIn(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    authenticateGuest: (credentials, name) => dispatch(authenticateGuest(credentials, name))
  }
}

const provider = (component, credentials) => {
  let mergeProps = (stateProps, dispatchProps, ownProps) => {
    return _.assign({}, stateProps, dispatchProps, ownProps, {
      credentials
    })
  }

  return connect(mapStateToProps, mapDispatchToProps, mergeProps)(component)
}

export default provider

// export default connect(mapStateToProps, mapDispatchToProps)(GuestCallback)
