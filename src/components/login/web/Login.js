import _ from 'lodash';
import React, {Component} from 'react'
import { browserHistory } from 'react-router'
import slug from 'slug'
import DocumentTitle from 'react-document-title'
import { LiveMessage } from 'react-aria-live'

import './Login.scss'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      guestName: '',
      password: '',
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

    let loginButton = <button disabled className="login-button login-button--guest login-button--guest--disabled">
      Login &rarr;
    </button>

    if (this._cleanGuestUsername(this.state.guestName) !== '') {
      loginButton = <button className="login-button login-button--guest" onClick={() => this._handleGuestLogin(this.state.guestName)}>
        Login &rarr;
      </button>
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
            <div className="medium-7 large-6 medium-centered columns">
              <p className="login__guest-prompt text-center">Not Arapahoe? Login with your username / password: </p>
              <div className="flex-container space-between align-center">
                <input className="input login__guest-input" placeholder="Username"
                      value={this.state.guestName}
                      onChange={(e) => this.setState({guestName: e.target.value})}/>
                <input className="input login__guest-input" placeholder="Password"
                      value={this.state.password}
                      onChange={(e) => this.setState({password: e.target.value})}/>
                {loginButton}
              </div>
              <a className="login__guest-prompt text-center" href="/register">Register</a>
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

  _handleGuestLogin(name) {
    // console.log(name);
    window.open(`${this.props.guestAuthenticationUrl}&name=${this._cleanGuestUsername(name)}`, '_self')
  }

  _handleACCLogin = () => {
    window.open(this.props.authenticationUrl, '_self')
  }

}

export default Login
