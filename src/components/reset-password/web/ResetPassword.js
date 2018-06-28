import _ from 'lodash';
import React, {Component} from 'react'
import { browserHistory } from 'react-router'
import slug from 'slug'
import DocumentTitle from 'react-document-title'
import { LiveMessage } from 'react-aria-live'

import './ResetPassword.scss'

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      Identifier: ''
    }
  }

  componentDidMount () {
    if (this.props.d2lUserIdentifer) {
      this.props.logout()
    }
  }

  render() {
    const props = this.props;

    let resetPasswordBtn = <button disabled className="login-button login-button--guest login-button--guest--disabled">
      Reset Password
    </button>

    if (this._cleanGuestUsername(this.state.Identifier) !== '') {
      resetPasswordBtn = <button type="button" className="login-button login-button--guest" onClick={this._onHandleResetPassword}>
        Reset Password
      </button>

      if (this.props.resetPasswordFailed) {
        resetPasswordBtn = (
          <button type="button" className="register-guest__resend" onClick={this._handleResendVerificationEmail}>
            Click here to resend your verification email.
          </button>
        );
      } else if (props.resendVerificationEmailFailed) {
        resetPasswordBtn = (
          <p>
            Are you sure you've registered? <a href="/register">You can do so here</a>.
          </p>
        );
      } else if (props.sendingEmail && !props.sentEmail) {
        resetPasswordBtn = <button type="button" disabled className="login-button login-button--guest login-button--guest--disabled">
          Sending email ...
        </button>
      } else if (!props.sendingEmail && props.sentEmail) {
        resetPasswordBtn = <button type="button" disabled className="login-button login-button--guest login-button--guest--disabled">
          Email sent. Please check your Inbox for further instructions.
        </button>
      }
    }

    const errorMessage = this.props.resetPasswordFailed ?
      (<p>
        User account not found or unverified.
      </p>)
      :
      ''

    return (
      <DocumentTitle title="Reset Password">
        <div className="register">
          <LiveMessage message="Reset password for fly-by-wire account" aria-live="polite"/>
          <h1>Reset the password for your Fly-by-Wire Guest account</h1>

          <div className="error-message">
            {errorMessage}
          </div>

          <form className="row">
            <div className="medium-7 large-6 medium-centered columns">
              <div className="flex-container space-between align-center">
                <label className="login__guest-label">E-mail address:
                  <input
                    className="input login__guest-input"
                    placeholder="Email address"
                    name="Identifier"
                    type="email"
                    value={this.state.Identifier}
                    onChange={(e) => this.setState({Identifier: e.target.value})}
                  />
                </label>
              </div>
              <div className="flex-container space-between align-center">
                {resetPasswordBtn}
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

  _handleResendVerificationEmail = () => {
    this.props.handleResendVerificationEmail({
      Identifier: this.state.Identifier
    })
  }

  _onHandleResetPassword = () => {
    this.props.handleResetPassword({
      Identifier: this.state.Identifier
    })
  }

}

export default ResetPassword
