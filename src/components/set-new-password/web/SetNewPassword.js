import _ from 'lodash';
import React, {Component} from 'react'
import { browserHistory } from 'react-router'
import slug from 'slug'
import DocumentTitle from 'react-document-title'
import { LiveMessage } from 'react-aria-live'

import './SetNewPassword.scss'

const mustMatchErrorMsg = 'Passwords must match'
const tooShortErrorMsg = 'Password must be at least 10 characters long'

class SetNewPassword extends Component {
  constructor() {
    super();
    this.state = {
      password: '',
      passwordAgain: '',
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
    let errorMessage = this.state.errorMessage;

    if (props.setNewPasswordFailed) {
      errorMessage = 'Unable to set a new password.'
    }

    let setNewPasswordBtn = <button disabled className="login-button login-button--guest login-button--guest--disabled">
      Set New Password
    </button>

    if (this.state.password.length >= 10 &&
        this.state.password === this.state.passwordAgain) {
      setNewPasswordBtn = <button type="button" className="login-button login-button--guest" onClick={() => this._handleSetNewPassword()}>
        Set New Password
      </button>

      if (props.settingNewPassword && !props.setNewPasswordDone) {
        setNewPasswordBtn = <button disabled type="button" className="login-button login-button--guest">
          Setting Password ...
        </button>
      } else if (!props.settingNewPassword && props.setNewPasswordDone) {
        setNewPasswordBtn = <a href="/login">
          Password reset. Please return to the login page by clicking here.
        </a>
      }
    }

    let errorMessageClass = "set-password__error-message";

    if (errorMessage) {
      errorMessageClass += " active";
    }

    // console.log('in the component', this.state);

    return (
      <DocumentTitle title="Set New Password">
        <div className="register">
          <LiveMessage message="Set a new password for your fly-by-wire account" aria-live="polite"/>
          <h1>Set a New Password For Your Fly-by-Wire Guest account</h1>

          <form className="row">
            <div className="medium-7 large-6 medium-centered columns">
              <div className="flex-container space-between align-center">
                <label className="login__guest-label">Password (10+ characters):
                  <input
                    type="password"
                    className="input login__guest-input"
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={(e) => this.setState({password: e.target.value})}
                  />
                </label>
              </div>
              <div className="flex-container space-between align-center">
                <label className="login__guest-label">Password Again:
                  <input
                    type="password"
                    className="input login__guest-input"
                    placeholder="Password again"
                    name="passwordAgain"
                    value={this.state.passwordAgain}
                    onChange={(e) => this.setState({passwordAgain: e.target.value})}
                  />
                </label>
              </div>

              <div className={errorMessageClass}>
                {errorMessage}
              </div>

              <div className="flex-container space-between align-center">
                {setNewPasswordBtn}
              </div>
            </div>
          </form>

        </div>
      </DocumentTitle>
    )
  }

  _handleSetNewPassword() {
    this.props.handleSetNewPassword({
      _id: this.props.params.userId,
      password: this.state.password
    })
  }

}

export default SetNewPassword
