import React, {Component} from 'react'
import { browserHistory } from 'react-router'

import './GuestCallback.scss'

class GuestCallback extends Component {

  componentDidMount () {
    this.props.authenticateGuest();
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
