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
        <div className="app-name text-center">
          {/* <div className="flex-container"> */}
            {/* <p className="app-title">Fly-by-Wire</p> */}
          {/* </div> */}
          <img className="app-logo" src={require('../../../assets/fbw-web-icon.png')} />
          <p className="app-tagline">Adaptive learning for differentiated instruction</p>
        </div>

        <div className="school-buttons medium-8 medium-centered columns">
          <button onClick={() => this._handleACCLogin()}
                  className="login-button login-button--d2l ">

            <img className="login-button__image" src={require('../../../assets/myACC.png')} />
            Arapahoe
          </button>
          <button  onClick={() => this._handleGuestLogin()}
                    className="login-button">
            <img className="login-button__image" src={require('../../../assets/visitor.png')} />
            Guest
          </button>
        </div>
      </div>
    )
  }

  _handleGuestLogin() {
    window.open(this.props.guestAuthenticationUrl, '_self')
  }

  _handleACCLogin = () => {
    window.open(this.props.authenticationUrl, '_self')
  }

}

export default Login
