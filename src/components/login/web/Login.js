import React, {Component} from 'react'
import { browserHistory } from 'react-router'
import slug from 'slug'

import './Login.scss'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      guestName: '',
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
        <div className="app-name text-center clearfix">
          <div className="medium-7 large-5 columns medium-centered">
            <img className="app-logo" src={require('../../../assets/fbw-web-icon.png')} />
          </div>
        </div>

        <div className="row">
          <div className="medium-5 large-4 medium-centered columns">
            <button className="login-button login-button--d2l " onClick={() => this._handleACCLogin()}>
              <img className="login-button__image" src={require('../../../assets/myACC.png')} />
              Arapahoe
            </button>
          </div>
        </div>

        <div className="row">
          <div className="medium-7 large-6 medium-centered columns">
            <p className="login__guest-prompt text-center">Not an Arapahoe student? Login with your name: </p>
            <div className="flex-container space-between align-center">
              <input className="input login__guest-input" placeholder="First and last name, e.g. Jane Doe"
                    value={this.state.guestName}
                    onChange={(e) => this.setState({guestName: e.target.value})}/>
              <button className="login-button login-button--guest" onClick={() => this._handleGuestLogin(this.state.guestName)}>
                Login &rarr;
              </button>
              {/* <button className="login-button login-button--guest" onClick={() => this._handleGuestLogin()}>
                <img className="login-button__image" src={require('../../../assets/visitor.png')} />
                Guest
              </button> */}
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
    )
  }

  _handleGuestLogin(name) {
    // console.log(name);
    window.open(`${this.props.guestAuthenticationUrl}?name=${slug(_.trim(_.lowerCase(name)))}`, '_self')
  }

  _handleACCLogin = () => {
    window.open(this.props.authenticationUrl, '_self')
  }

}

export default Login
