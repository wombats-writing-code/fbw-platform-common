import _ from 'lodash';
import { connect, dispatch } from 'react-redux'
import D2LCallback from './web/D2LCallback'

import { authenticateD2L } from '../../reducers/Login/authenticateD2L'
import { failedLogIn } from '../../selectors'

const mapStateToProps = (state, ownProps) => {
  return {
    failedLogIn: failedLogIn(state)
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    authenticateD2L: (credentials, options) => {
       dispatch(authenticateD2L(credentials, options))

      // if (credentials.role === 'instructor') {
      //  dispatch(authenticateD2LInstructor(credentials, optionalUrl))
      // } else {
      //  dispatch(authenticateD2LStudent(credentials, optionalUrl));
      // }
    }
    // onSetD2LAuthenticatedUrl: url => dispatch(setD2LAuthenticatedUrl(url)),
    // onReceiveBanks: banks => dispatch(receiveBanks(banks)),
    // login: (school, username) => dispatch(logInUser(school, username))
  }
}


// export default connect(mapStateToProps, mapDispatchToProps)(D2LCallback)

const provider = (component, credentials) => {
  let mergeProps = (stateProps, dispatchProps, ownProps) => {
    return _.assign({}, stateProps, dispatchProps, ownProps, {
      credentials
    })
  }

  return connect(mapStateToProps, mapDispatchToProps, mergeProps)(component)
}

export default provider
