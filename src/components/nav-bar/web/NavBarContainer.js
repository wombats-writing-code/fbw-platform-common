import { connect } from 'react-redux'
import NavBar from './NavBar'

import { logOutUser } from '../../../reducers/Login/logOutUser'
import {getUser} from '../../../selectors'

const mapStateToProps = (state, ownProps) => {
  return {
    isVisitor: state.login.isVisitor ? state.login.isVisitor : null,
    user: getUser(state),
    missions: state.mission ? state.mission.missions : null,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: data => dispatch(logOutUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
