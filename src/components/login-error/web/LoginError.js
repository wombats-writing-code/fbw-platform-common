import _ from 'lodash';
import React, {Component} from 'react'
import { browserHistory } from 'react-router'
import slug from 'slug'
import DocumentTitle from 'react-document-title'
import { LiveMessage } from 'react-aria-live'

import './LoginError.scss'

class LoginError extends Component {
  constructor() {
    super();
    this.state = {
    }
  }

  componentDidMount () {
    this.props.logout()
  }

  render() {
    return (
      <DocumentTitle title="Login Error">
        <div className="login-error">
          <LiveMessage message="Login Error" aria-live="polite"/>
          <div className="app-name text-center clearfix">
            <div className="medium-7 large-5 columns medium-centered">
              <img alt="Fly-by-Wire" className="app-logo" src={require('../../../assets/fbw-web-icon.png')} />
            </div>
          </div>

          <div className="row">
            <p>It appears you do not have a valid instructor account.</p>
            <p>Did you mean to navigate to
              <a href="https://fbw-student.mit.edu">
                the student app
              </a>
              , instead?
            </p>
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

export default LoginError
