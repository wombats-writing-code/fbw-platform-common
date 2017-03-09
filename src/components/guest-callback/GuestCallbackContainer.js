import { connect, dispatch } from 'react-redux'
import GuestCallback from './web/GuestCallback'

import {authenticateGuest } from '../../reducers/Login/authenticateGuest'

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    authenticateGuest: () => dispatch(authenticateGuest())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(GuestCallback)
