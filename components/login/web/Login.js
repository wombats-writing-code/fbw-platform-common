import React, {Component} from 'react'
import { browserHistory } from 'react-router'

import './Login.scss'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      isVisitorLoginVisible: false
    }
  }

  componentDidMount () {
    if (this.props.d2lUserIdentifer) {
      this.props.logout()
    }
  }

  render() {
    const props = this.props;

    let loginButtonText
    if (props.isLoginInProgress) {
      loginButtonText = (<div className="">Logging you in...</div>)
    } else {
      loginButtonText = (<div className="">
        Login
      </div>)
    }

    return (
      <div className="login">
        <h1 className="app-name text-center">Fly-by-Wire</h1>

        <div className="school-buttons flex-container space-between medium-8 medium-centered columns">
          <button onClick={() => this._handleACCLogin()}
            className="login-form-button login-form-button--d2l flex-container align-center">
            Arapahoe <img className="d2l-login-button__image" src={require('../../../assets/myACC.png')} />
          </button>
          <button disabled
            className="login-form-button login-form-button--d2l is-disabled">
            Quinsigamond
          </button>
        </div>
      </div>
    )
  }

  _handleACCLogin = () => {
    window.open(this.props.authenticationUrl, '_self')
  }

}

export default Login
