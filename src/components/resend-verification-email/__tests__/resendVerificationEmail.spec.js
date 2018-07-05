import _ from 'lodash';
import React from 'react';

import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import { LiveAnnouncer } from 'react-aria-live';

import ResendVerificationEmailComponent from '../web/ResendVerificationEmail';
import ResendVerificationEmailContainer from '../ResendVerificationEmailContainer'
const ResendVerificationEmail = ResendVerificationEmailContainer(ResendVerificationEmailComponent)

import {mount, shallow} from 'enzyme';

import '../../../styles/foundation.min.css'
import '../../../styles/core.scss'
import '../../../styles/animations.scss'

const STATE = require('./state.mock.json')

let chai = require('chai')
chai.should()

describe('ResendVerificationEmail', () => {

  let mockStore = configureStore([]);
  let connectedResendVerificationEmail, store;

  beforeEach(function() {
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);

    store = mockStore(STATE);
    connectedResendVerificationEmail = mount(
      <Provider store={store}>
        <LiveAnnouncer>
          <ResendVerificationEmail  />
        </LiveAnnouncer>
      </Provider>,
      {attachTo: div}
    );
  });

  it('should render inputs for username', () => {
    const resendVerificationEmail = connectedResendVerificationEmail.find(ResendVerificationEmail)

    resendVerificationEmail.find('input').length.should.be.eql(1);
    resendVerificationEmail.find('.login-button--guest--disabled').length.should.be.eql(1);
  });

  it('should display error message if resend failed', () => {
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);

    const modifiedState = _.assign({}, STATE, {
      login: {
        resendVerificationEmailFailed: true
      }
    })
    store = mockStore(modifiedState);
    const connectedResendVerificationEmail2 = mount(
      <Provider store={store}>
        <LiveAnnouncer>
          <ResendVerificationEmail  />
        </LiveAnnouncer>
      </Provider>,
      {attachTo: div}
    );

    connectedResendVerificationEmail2.find('input[name="Identifier"]').first().simulate('change', {target: {value: 'foo@example.com'}});
    connectedResendVerificationEmail2.html().should.contain('Are you sure you\'ve registered?')
  });

  it('should enable the submit button when inputs validated', () => {
    const resendVerificationEmail = connectedResendVerificationEmail.find(ResendVerificationEmail)

    resendVerificationEmail.html().should.contain('login-button--guest--disabled');

    resendVerificationEmail.find('input[name="Identifier"]').first().simulate('change', {target: {value: 'foo@example.com'}});

    resendVerificationEmail.html().should.not.contain('login-button--guest--disabled');
  })

  afterEach( () => {
    connectedResendVerificationEmail.detach();
  })
});
