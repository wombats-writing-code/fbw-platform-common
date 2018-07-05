import _ from 'lodash';
import React, {Component} from 'react'
import { browserHistory } from 'react-router'
import slug from 'slug'
import DocumentTitle from 'react-document-title'
import { LiveMessage } from 'react-aria-live'

import './ResendVerificationEmail.scss'

class ResendVerificationEmail extends Component {
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

    let resendVerificationEmailBtn = <button disabled className="login-button login-button--guest login-button--guest--disabled">
      Resend Verification Email
    </button>

    if (this._cleanGuestUsername(this.state.Identifier) !== '') {
      resendVerificationEmailBtn = <button type="button" className="login-button login-button--guest" onClick={this._onHandleResendVerificationEmail}>
        Resend Verification Email
      </button>

      if (props.resendVerificationEmailFailed) {
        resendVerificationEmailBtn = (
          <p>
            Are you sure you've registered? <a href="/register">You can do so here</a>.
          </p>
        );
      } else if (props.sendingEmail && !props.sentEmail) {
        resendVerificationEmailBtn = <button type="button" disabled className="login-button login-button--guest login-button--guest--disabled">
          Sending email ...
        </button>
      } else if (!props.sendingEmail && props.sentEmail) {
        resendVerificationEmailBtn = <button type="button" disabled className="login-button login-button--guest login-button--guest--disabled">
          Email sent. Please check your Inbox for further instructions.
        </button>
      }
    }

    return (
      <DocumentTitle title="Resend Verification Email">
        <div className="register">
          <LiveMessage message="Resend verification e-mail for fly-by-wire account" aria-live="polite"/>
          <h1>Resend verification e-mail your Fly-by-Wire Guest account</h1>

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
                {resendVerificationEmailBtn}
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

  _onHandleResendVerificationEmail = () => {
    this.props.handleResendVerificationEmail({
      Identifier: this.state.Identifier
    })
  }

}

export default ResendVerificationEmail
