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
          <div className="row">
            <p>It appears you do not have a valid Fly-by-Wire instructor account.</p>
            <p>Did you mean to navigate to&nbsp;
              <a href="https://fbw-student.mit.edu">
                the student app
              </a>
              , instead?
            </p>
          </div>
          <div className="row">
            <p>Or, do you want to try logging in again to&nbsp;
              <a href="/login">
                the instructor app
              </a>
              ?
            </p>
          </div>
          <div className="row">
            <p>If you are having issues logging in and are a registered instructor,
              please send an e-mail to
              <a href="mailto:fbw-dev-team@mit.edu">
                the Fly-by-Wire tech team
              </a>
              .
            </p>
          </div>
        </div>
      </DocumentTitle>
    )
  }

}

export default LoginError
