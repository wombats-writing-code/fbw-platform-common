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
    }

    const errorMessage = this.props.resetPasswordFailed ?
      (<p>
        User account not found or unverified. Click <a href="/resend-verification">here</a> to resend your verification email.
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

  _onHandleResetPassword = () => {
    this.props.handleResetPassword({
      Identifier: this.state.Identifier
    })
  }

}

export default ResetPassword
