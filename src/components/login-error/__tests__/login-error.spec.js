import React from 'react';

import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import { LiveAnnouncer } from 'react-aria-live'

import LoginErrorComponent from '../web/LoginError';
import LoginErrorContainer from '../LoginErrorContainer'
const LoginError = LoginErrorContainer(LoginErrorComponent)

import {mount, shallow} from 'enzyme';

import '../../../styles/foundation.min.css'
import '../../../styles/core.scss'
import '../../../styles/animations.scss'

let chai = require('chai')
chai.should()

let STATE = {}

describe('LoginError', () => {

  let mockStore = configureStore([]);
  let connectedComponent, store;

  before(function() {
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);

    store = mockStore(STATE);
    connectedComponent = mount(
      <Provider store={store}>
        <LiveAnnouncer>
          <LoginError  />
        </LiveAnnouncer>
      </Provider>,
      {attachTo: div}
    );
  });

  it('should render the login error page', () => {
    const loginError = connectedComponent.find(LoginError)

    loginError.find('.login-error').length.should.be.eql(1);
    loginError.find('a').length.should.be.eql(3);
  });

  after( () => {
    // connectedComponent.detach()
  })
});
