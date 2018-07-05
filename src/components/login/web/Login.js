import _ from 'lodash';
import React, {Component} from 'react'
import { browserHistory } from 'react-router'
import slug from 'slug'
import DocumentTitle from 'react-document-title'
import { LiveMessage } from 'react-aria-live'

import { isInstructorApp } from '../../../selectors'

import './Login.scss'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      guestIdentifier: '',
      guestPassword: '',
      isVisitorLoginVisible: false
    }
  }

  componentDidMount () {
    if (this.props.d2lUserIdentifer) {
      this.props.logout()
    }
  }

  componentDidUpdate(prevProps, prevState) {
    // redirect to guest-callback on successful guest login
    if (!prevProps.isLoggedIn && this.props.isLoggedIn) {
      window.open(`/guest-callback?name=${this.state.guestIdentifier}`, '_self');
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

    let loginButton = <button disabled className="login-button login-button--guest login-button--guest--disabled">
      Login &rarr;
    </button>

    if (this._cleanGuestUsername(this.state.guestIdentifier) !== '' &&
        this.state.guestPassword !== '') {
      loginButton = <button className="login-button login-button--guest" onClick={() => this._handleGuestLogin()}>
        Login &rarr;
      </button>
    }

    let resetPasswordLink;

    if (props.errorMessage) {
      resetPasswordLink = (
        <div>
          Did you forget your password? You can <a href="/reset-password">reset it here</a>.
        </div>
      )
    }

    let guestLoginText = (
      <span>
        <p className="login__guest-prompt text-center">Not Arapahoe? Login with your e-mail address and password or </p>
        <a className="login__guest-registration" href="/register">register a new guest account</a>
      </span>
    )

    if (isInstructorApp()) {
      guestLoginText = (
        <span>
          <p className="login__guest-prompt text-center">Not Arapahoe? Login with your e-mail address and password</p>
        </span>
      )
    }

    return (
      <DocumentTitle title="Login">
        <div className="login">
          <LiveMessage message="Login to fly-by-wire" aria-live="polite"/>
          <div className="app-name text-center clearfix">
            <div className="medium-7 large-5 columns medium-centered">
              <img alt="Fly-by-Wire" className="app-logo" src={require('../../../assets/fbw-web-icon.png')} />
            </div>
          </div>

          <div className="row">
            <div className="medium-5 large-4 medium-centered columns">
              <button className="login-button login-button--d2l " onClick={() => this._handleACCLogin()}>
                <img aria-hidden className="login-button__image" src={require('../../../assets/myACC.png')} />
                Arapahoe
              </button>
            </div>
          </div>

          <div className="row">
            <div className="medium-8 large-7 medium-centered columns">
              {guestLoginText}
              <div className="error-message">
                {props.errorMessage}
                {resetPasswordLink}
              </div>
              <div className="flex-container space-between align-center">
                <label className="login__guest-label">E-mail:
                  <input className="input login__guest-input login__guest-identifier" placeholder="Email Address"
                        value={this.state.guestIdentifier}
                        name="Email"
                        type="text"
                        onChange={(e) => this.setState({guestIdentifier: e.target.value})}/>
                </label>
              </div>
              <div className="flex-container space-between align-center">
                <label className="login__guest-label">Password:
                  <input className="input login__guest-input login__guest-password" placeholder="Password"
                    type="password"
                    value={this.state.guestPassword}
                    onChange={(e) => this.setState({guestPassword: e.target.value})}/>
                </label>
              </div>
              <div className="flex-container space-between align-center">
                {loginButton}
              </div>
              <div className="flex-container space-between align-center">
                <a href="/reset-password">Forgot Password?</a>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="medium-6 columns medium-centered">
              <hr className="divider"></hr>
            </div>
          </div>

          <div className="row">
            <div className="medium-6 columns medium-centered">
              <p className="contact">
                <b>Say hello</b> <a href="mailto:fly-by-wire@mit.edu">fly-by-wire@mit.edu</a>
                &ensp; &#8226; &ensp; <b>Learn more</b> <a href="http://fbw.mit.edu" target="_blank">Fly by Wire </a>
                &ensp; &#8226; &ensp; <b>Explore</b> <a href="http://mapping.mit.edu" target="_blank">MIT Mapping Lab</a>
                &ensp; &#8226; &ensp; <b>Funded by</b> <a href="https://fipsedatabase.ed.gov/fipse/" target="_blank">US Department of Education</a>
              </p>
            </div>
          </div>

        </div>
      </DocumentTitle>
    )
  }

  _cleanGuestUsername(name) {
    return slug(_.trim(_.lowerCase(name)));
  }

  _handleGuestLogin = () => {
    this.props.handleGuestLogin({
      Identifier: this.state.guestIdentifier,
      password: this.state.guestPassword
    });
  }

  _handleACCLogin = () => {
    window.open(this.props.authenticationUrl, '_self')
  }

}

export default Login
