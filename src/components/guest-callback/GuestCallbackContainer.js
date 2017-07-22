import { connect, dispatch } from 'react-redux'
import GuestCallback from './web/GuestCallback'

import {authenticateGuest } from '../../reducers/Login/authenticateGuest'

const mapStateToProps = (state, ownProps) => {
  return {
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
