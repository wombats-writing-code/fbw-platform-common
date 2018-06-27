import React from 'react';

import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import { LiveAnnouncer } from 'react-aria-live'

import credentials from '../../../d2lcredentials'
credentials.role = 'student'
import LoginComponent from '../web/Login';
import LoginContainer from '../LoginContainer'
const Login = LoginContainer(LoginComponent, credentials)

import {mount, shallow} from 'enzyme';

import '../../../styles/foundation.min.css'
import '../../../styles/core.scss'
import '../../../styles/animations.scss'

const STATE = require('./state.mock.json')

let chai = require('chai')
chai.should()

describe('Login', () => {

  let mockStore = configureStore([]);
  let connectedComponent, store;

  before(function() {
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);

    store = mockStore(STATE);
    connectedComponent = mount(
      <Provider store={store}>
        <LiveAnnouncer>
          <Login  />
        </LiveAnnouncer>
      </Provider>,
      {attachTo: div}
    );
  });

  it('should render the login page', () => {
    const login = connectedComponent.find(Login)

    login.find('.login-button').length.should.be.eql(2);
    login.find('.login-button--d2l').length.should.be.eql(1);
    login.find('.login-button--guest--disabled').length.should.be.eql(1);
  });

  it('should enable the guest login button if name and password provided', () => {
    const login = connectedComponent.find(Login)
    login.find('.login-button--guest--disabled').length.should.be.eql(1);
    login.find('.login__guest-identifier').simulate('change', {
      target: {
        value: 'foo'
    }});
    login.find('.login__guest-password').simulate('change', {
      target: {
        value: 'foo2'
    }});
    login.find('.login-button').length.should.be.eql(2);
    login.find('.login-button--d2l').length.should.be.eql(1);
    login.find('.login-button--guest--disabled').length.should.be.eql(0);
  });

  after( () => {
    // connectedComponent.detach()
  })
});
