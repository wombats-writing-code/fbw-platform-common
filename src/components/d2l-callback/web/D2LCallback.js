import React, {Component} from 'react'
import { browserHistory } from 'react-router'

import './D2LCallback.scss'

class D2LCallback extends Component {

  componentDidMount () {

    this.props.authenticateD2L(this.props.credentials);

  }

  render() {
    return (
      <div className="d2l-callback">
        <p className="text-center callback-text fade-in-out">Redirecting you to your dashboard...</p>
      </div>
    )
  }

}

export default D2LCallback
