import _ from 'lodash';
import React, {Component} from 'react'
import { browserHistory } from 'react-router'
import slug from 'slug'
import DocumentTitle from 'react-document-title'
import { LiveMessage } from 'react-aria-live'

import './Register.scss'

const mustMatchErrorMsg = 'Passwords must match'
const tooShortErrorMsg = 'Password must be at least 10 characters long'

class Register extends Component {
  constructor() {
    super();
    this.state = {
      identifier: '',
      password: '',
      passwordAgain: '',
      firstName: '',
      lastName: '',
      errorMessage: null
    }
  }

  componentDidMount () {
    if (this.props.d2lUserIdentifer) {
      this.props.logout()
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if ((this.state.passwordAgain !== this.state.password) &&
        (prevState.errorMessage !== mustMatchErrorMsg)) {
      this.setState({
        errorMessage: mustMatchErrorMsg
      })
    } else if ((this.state.passwordAgain === this.state.password) &&
        !_.isNull(prevState.errorMessage)){
      if (this.state.password.length < 10 &&
          (prevState.errorMessage !== tooShortErrorMsg)) {
        this.setState({
          errorMessage: tooShortErrorMsg
        })
      } else if (this.state.password.length >= 10) {
        this.setState({
          errorMessage: null
        })
      }
    }
  }

  render() {
    const props = this.props;

    let loginButton = <button disabled className="login-button login-button--guest login-button--guest--disabled">
      Create Account
    </button>

    if (this._cleanGuestUsername(this.state.identifier) !== '' &&
        this.state.password.length >= 10 &&
        this.state.password === this.state.passwordAgain &&
        this.state.firstName !== '' &&
        this.state.lastName !== '') {
      loginButton = <button className="login-button login-button--guest" onClick={() => this._createAccount()}>
        Create Account
      </button>
    }

    // console.log('in the component', this.state);

    return (
      <DocumentTitle title="Register">
        <div className="register">
          <LiveMessage message="Register for fly-by-wire account" aria-live="polite"/>

          <div className="error-message">
            {props.errorMessage || this.state.errorMessage}
          </div>

          <form className="row">
            <div className="medium-7 large-6 medium-centered columns">
              <div className="flex-container space-between align-center">
                <label>First Name:
                  <input
                    className="input login__guest-input"
                    placeholder="First Name"
                    name="firstName"
                    value={this.state.firstName}
                    onChange={this._updateFirstName}
                  />
                </label>
                <label>Last Name:
                  <input
                    className="input login__guest-input"
                    placeholder="Last Name"
                    name="lastName"
                    value={this.state.lastName}
                    onChange={(e) => this.setState({lastName: e.target.value})}
                  />
                </label>
                <label>E-mail address:
                  <input
                    className="input login__guest-input"
                    placeholder="Email address"
                    name="identifier"
                    value={this.state.identifier}
                    onChange={(e) => this.setState({identifier: e.target.value})}
                  />
                </label>
                <label>Password (10+ characters):
                  <input
                    type="password"
                    className="input login__guest-input"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={(e) => this.setState({password: e.target.value})}
                  />
                </label>
                <label>Password Again:
                  <input
                    type="password"
                    className="input login__guest-input"
                    placeholder="Password again"
                    name="passwordAgain"
                    value={this.state.passwordAgain}
                    onChange={(e) => this.setState({passwordAgain: e.target.value})}
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
    return _.trim(_.lowerCase(name));
  }

  _createAccount() {
    // console.log(name);
    this.props.registerUser({
      Identifier: this.state.Identifier,
      password: this.state.password,
      FirstName: this.state.firstName,
      LastName: this.state.lastName,
    })
  }

  _updateFirstName = (e) => {
    this.setState({firstName: e.target.value})
  }

}

export default Register
