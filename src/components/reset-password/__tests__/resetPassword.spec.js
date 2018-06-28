import _ from 'lodash';
import React from 'react';

import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import { LiveAnnouncer } from 'react-aria-live';

import ResetPasswordComponent from '../web/ResetPassword';
import ResetPasswordContainer from '../ResetPasswordContainer'
const ResetPassword = ResetPasswordContainer(ResetPasswordComponent)

import {mount, shallow} from 'enzyme';

import '../../../styles/foundation.min.css'
import '../../../styles/core.scss'
import '../../../styles/animations.scss'

const STATE = require('./state.mock.json')

let chai = require('chai')
chai.should()

describe('ResetPassword', () => {

  let mockStore = configureStore([]);
  let connectedResetPassword, store;

  beforeEach(function() {
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);

    store = mockStore(STATE);
    connectedResetPassword = mount(
      <Provider store={store}>
        <LiveAnnouncer>
          <ResetPassword  />
        </LiveAnnouncer>
      </Provider>,
      {attachTo: div}
    );
  });

  it('should render inputs for username', () => {
    const resetPassword = connectedResetPassword.find(ResetPassword)

    resetPassword.find('input').length.should.be.eql(1);
    resetPassword.find('.login-button--guest--disabled').length.should.be.eql(1);
  });

  it('should display error message if reducer sets prop', () => {
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);

    const modifiedState = _.assign({}, STATE, {
      login: {
        resetPasswordFailed: true
      }
    })
    store = mockStore(modifiedState);
    const connectedResetPassword2 = mount(
      <Provider store={store}>
        <LiveAnnouncer>
          <ResetPassword  />
        </LiveAnnouncer>
      </Provider>,
      {attachTo: div}
    );
    connectedResetPassword2.html().should.contain('User account not found or unverified.')
    connectedResetPassword2.html().should.contain('<a href="/resend-verification">here</a>')
    connectedResetPassword2.html().should.contain('resend your verification email.')
  });

  it('should enable the submit button when inputs validated', () => {
    const resetPassword = connectedResetPassword.find(ResetPassword)

    resetPassword.html().should.contain('<div class="error-message"></div>');
    resetPassword.html().should.contain('login-button--guest--disabled');

    resetPassword.find('input[name="Identifier"]').first().simulate('change', {target: {value: 'foo@example.com'}});

    resetPassword.html().should.contain('<div class="error-message"></div>');
    resetPassword.html().should.not.contain('login-button--guest--disabled');
  })

  afterEach( () => {
    connectedResetPassword.detach();
  })
});
