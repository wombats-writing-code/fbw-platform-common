// Login Container
import _ from 'lodash'
import { connect } from 'react-redux'

import { logOutUser } from '../../reducers/Login/logOutUser'


const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logout: () => dispatch(logOutUser()),
  }
}

const provider = (component, D2LConfig) => {
  let mergeProps = (stateProps, dispatchProps, ownProps) => {
    return _.assign({}, stateProps, dispatchProps, ownProps, {
    })
  }
  return connect(mapStateToProps, mapDispatchToProps, mergeProps)(component)
}

export default provider
