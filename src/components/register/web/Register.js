import _ from 'lodash';
import React, {Component} from 'react'
import { browserHistory } from 'react-router'
import slug from 'slug'
import DocumentTitle from 'react-document-title'
import { LiveMessage } from 'react-aria-live'

import './Register.scss'

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: ''
    }
  }

  componentDidMount () {
    if (this.props.d2lUserIdentifer) {
      this.props.logout()
    }
  }

  render() {
    const props = this.props;

    let loginButton = <button disabled className="login-button login-button--guest login-button--guest--disabled">
      Create Account
    </button>

    if (this._cleanGuestUsername(this.state.username) !== '' &&
        this.state.password.length >= 10 &&
        this.state.firstName !== '' &&
        this.state.lastName !== '') {
      loginButton = <button className="login-button login-button--guest" onClick={() => this._createAccount()}>
        Create Account
      </button>
    }

    return (
      <DocumentTitle title="Register">
        <div className="register">
          <LiveMessage message="Register for fly-by-wire account" aria-live="polite"/>

          <div className="error-message">
            {props.errorMessage}
          </div>

          <form className="row">
            <div className="medium-7 large-6 medium-centered columns">
              <div className="flex-container space-between align-center">
                <label>First Name:
                  <input
                    className="input login__guest-input"
                    placeholder="First Name"
                    value={this.state.firstName}
                    onChange={(e) => this.setState({firstName: e.target.value})}
                  />
                </label>
                <label>Last Name:
                  <input
                    className="input login__guest-input"
                    placeholder="Last Name"
                    value={this.state.lastName}
                    onChange={(e) => this.setState({lastName: e.target.value})}
                  />
                </label>
                <label>Username:
                  <input
                    className="input login__guest-input"
                    placeholder="Username"
                    value={this.state.username}
                    onChange={(e) => this.setState({username: e.target.value})}
                  />
                </label>
                <label>Password (10+ characters):
                  <input
                    type="password"
                    className="input login__guest-input"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={(e) => this.setState({password: e.target.value})}
                  />
                </label>
                {loginButton}
              </div>
            </div>
          </form>

        </div>
      </DocumentTitle>
    )
  }

  _cleanGuestUsername(name) {
    return slug(_.trim(_.lowerCase(name)));
  }

  _createAccount() {
    // console.log(name);
    window.open(`${this.props.guestAuthenticationUrl}&name=${this._cleanGuestUsername(name)}`, '_self')
  }

}

export default Register
