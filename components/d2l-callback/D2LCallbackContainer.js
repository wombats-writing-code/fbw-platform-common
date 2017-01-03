import { connect } from 'react-redux'
import D2LCallback from './web/D2LCallback'

import { authenticateD2LInstructor } from '../../reducers/Login/authenticateD2L'
import { authenticateD2LStudent } from '../../reducers/Login/authenticateD2L'


const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // onSetD2LAuthenticatedUrl: url => dispatch(setD2LAuthenticatedUrl(url)),
    // onReceiveBanks: banks => dispatch(receiveBanks(banks)),
    // login: (school, username) => dispatch(logInUser(school, username))
  }
}


// export default connect(mapStateToProps, mapDispatchToProps)(D2LCallback)

const provider = (component, credentials) => {
  let mergeProps = (stateProps, dispatchProps, ownProps) => {
    return _.assign({}, stateProps, dispatchProps, ownProps, {
      authenticateD2L: () => {
        console.log('authenticateD2L() called', credentials)
        
        if (credentials.role === 'instructor') {
         authenticateD2LInstructor(credentials)
        } else {
         authenticateD2LStudent(credentials);
        }
      }
    })
  }

  return connect(mapStateToProps, mapDispatchToProps, mergeProps)(component)
}

export default provider
