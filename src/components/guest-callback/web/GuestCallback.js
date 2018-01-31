import React, {Component} from 'react'
import { browserHistory } from 'react-router'
import _ from 'lodash'

import './GuestCallback.scss'

class GuestCallback extends Component {

  componentDidMount () {
    let name = this.props.location.query && this.props.location.query.name;
    if (name) {
      name = _.replace(name, '-', ' ')
    }

    // console.log('name', name)

    this.props.authenticateGuest(this.props.credentials, name);
  }

  componentDidUpdate () {
    if (this.props.failedLogIn) {
      browserHistory.push('/login-error')
    }
  }

  render() {
    return (
      <div className="d2l-callback">
        <p className="text-center callback-text fade-in-out">Redirecting you to your dashboard...</p>
      </div>
    )
  }

}

export default GuestCallback
