import _ from 'lodash';
import React from 'react';

import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import { LiveAnnouncer } from 'react-aria-live';

import SetNewPasswordComponent from '../web/SetNewPassword';
import SetNewPasswordContainer from '../SetNewPasswordContainer'
const SetNewPassword = SetNewPasswordContainer(SetNewPasswordComponent)

import {mount, shallow} from 'enzyme';

import '../../../styles/foundation.min.css'
import '../../../styles/core.scss'
import '../../../styles/animations.scss'

const STATE = require('./state.mock.json')

let chai = require('chai')
chai.should()

describe('SetNewPassword', () => {

  let mockStore = configureStore([]);
  let connectedSetNewPassword, store;

  beforeEach(function() {
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);

    store = mockStore(STATE);
    connectedSetNewPassword = mount(
      <Provider store={store}>
        <LiveAnnouncer>
          <SetNewPassword  />
        </LiveAnnouncer>
      </Provider>,
      {attachTo: div}
    );
  });

  it('should render inputs for password', () => {
    const setNewPassword = connectedSetNewPassword.find(SetNewPassword)

    setNewPassword.find('input').length.should.be.eql(2);
    setNewPassword.find('.login-button--guest--disabled').length.should.be.eql(1);
  });

  it('should display error message if passwords do not match', () => {
    connectedSetNewPassword.html().should.contain('<div class="set-password__error-message"></div>');

    const passwordInput = connectedSetNewPassword.find('input[type="password"]').first();
    passwordInput.simulate('change', {target: {value: 'foo'}});

    connectedSetNewPassword.html().should.contain('<div class="set-password__error-message active">Passwords must match</div>');
  });

  it('should display a props error message', () => {
    const div2 = global.document.createElement('div');
    global.document.body.appendChild(div2);
    const newState = _.assign({}, STATE, {
      login: {
        setNewPasswordFailed: true
      }
    })
    store = mockStore(newState);
    const connectedSetNewPassword2 = mount(
      <Provider store={store}>
        <LiveAnnouncer>
          <SetNewPassword />
        </LiveAnnouncer>
      </Provider>,
      {attachTo: div2}
    );
    const setNewPassword = connectedSetNewPassword2.find(SetNewPassword);
    setNewPassword.html().should.contain('Unable to set a new password.');

    connectedSetNewPassword2.detach();
  });

  it('should enable the submit button when inputs validated', () => {
    const setNewPassword = connectedSetNewPassword.find(SetNewPassword)

    setNewPassword.html().should.contain('<div class="set-password__error-message"></div>');
    setNewPassword.html().should.contain('login-button--guest--disabled');

    setNewPassword.find('input[name="password"]').first().simulate('change', {target: {value: 'foo1234567'}});
    setNewPassword.find('input[name="passwordAgain"]').first().simulate('change', {target: {value: 'foo1234567'}});

    setNewPassword.html().should.contain('<div class="set-password__error-message"></div>');
    setNewPassword.html().should.not.contain('login-button--guest--disabled');
  })

  it('should render an error message for short passwords', () => {
    const setNewPassword = connectedSetNewPassword.find(SetNewPassword)

    setNewPassword.html().should.contain('<div class="set-password__error-message"></div>');
    setNewPassword.html().should.contain('login-button--guest--disabled');

    setNewPassword.find('input[name="password"]').first().simulate('change', {target: {value: 'foo123456'}});
    setNewPassword.find('input[name="passwordAgain"]').first().simulate('change', {target: {value: 'foo123456'}});

    setNewPassword.html().should.contain('<div class="set-password__error-message active">Password must be at least 10 characters long</div>');
    setNewPassword.html().should.contain('login-button--guest--disabled');

  });

  afterEach( () => {
    connectedSetNewPassword.detach();
  })
});
