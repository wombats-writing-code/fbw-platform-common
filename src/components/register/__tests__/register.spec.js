import _ from 'lodash';
import React from 'react';

import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import { LiveAnnouncer } from 'react-aria-live';

import RegisterComponent from '../web/Register';
import RegisterContainer from '../RegisterContainer'
const Register = RegisterContainer(RegisterComponent)

import {mount, shallow} from 'enzyme';

import '../../../styles/foundation.min.css'
import '../../../styles/core.scss'
import '../../../styles/animations.scss'

const STATE = require('./state.mock.json')

let chai = require('chai')
chai.should()

describe('Register', () => {

  let mockStore = configureStore([]);
  let connectedRegister, store;

  beforeEach(function() {
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);

    store = mockStore(STATE);
    connectedRegister = mount(
      <Provider store={store}>
        <LiveAnnouncer>
          <Register  />
        </LiveAnnouncer>
      </Provider>,
      {attachTo: div}
    );
  });

  it('should render inputs for username, password, and name', () => {
    const register = connectedRegister.find(Register)

    register.find('input').length.should.be.eql(5);
    register.find('.login-button--guest--disabled').length.should.be.eql(1);
  });

  it('should display error message if passwords do not match', () => {
    connectedRegister.html().should.contain('<div class="error-message"></div>');

    const passwordInput = connectedRegister.find('input[type="password"]').first();
    passwordInput.simulate('change', {target: {value: 'foo'}});

    connectedRegister.html().should.contain('<div class="error-message">Passwords must match</div>');
  });

  it('should display a props error message', () => {
    const div2 = global.document.createElement('div');
    global.document.body.appendChild(div2);
    const newState = _.assign({}, STATE, {
      login: {
        errorMessage: 'foo'
      }
    })
    store = mockStore(newState);
    const connectedRegister2 = mount(
      <Provider store={store}>
        <LiveAnnouncer>
          <Register />
        </LiveAnnouncer>
      </Provider>,
      {attachTo: div2}
    );
    const register = connectedRegister2.find(Register);
    register.html().should.contain('foo');

    connectedRegister2.detach();
  });

  it('should enable the submit button when inputs validated', () => {
    register = connectedRegister.find(Register)

    register.html().should.contain('<div class="error-message"></div>');
    register.html().should.contain('login-button--guest--disabled');

    register.find('input[name="firstName"]').first().simulate('change', {target: {value: 'Bob'}});
    register.find('input[name="lastName"]').first().simulate('change', {target: {value: 'Anne'}});
    register.find('input[name="Identifier"]').first().simulate('change', {target: {value: 'foo@example.com'}});
    register.find('input[name="password"]').first().simulate('change', {target: {value: 'foo1234567'}});
    register.find('input[name="passwordAgain"]').first().simulate('change', {target: {value: 'foo1234567'}});

    register.html().should.contain('<div class="error-message"></div>');
    register.html().should.not.contain('login-button--guest--disabled');
  })

  it('should render an error message for short passwords', () => {
    register = connectedRegister.find(Register)

    register.html().should.contain('<div class="error-message"></div>');
    register.html().should.contain('login-button--guest--disabled');

    register.find('input[name="firstName"]').first().simulate('change', {target: {value: 'Bob'}});
    register.find('input[name="lastName"]').first().simulate('change', {target: {value: 'Anne'}});
    register.find('input[name="Identifier"]').first().simulate('change', {target: {value: 'foo@example.com'}});
    register.find('input[name="password"]').first().simulate('change', {target: {value: 'foo123456'}});
    register.find('input[name="passwordAgain"]').first().simulate('change', {target: {value: 'foo123456'}});

    register.html().should.contain('<div class="error-message">Password must be at least 10 characters long</div>');
    register.html().should.contain('login-button--guest--disabled');

  });

  afterEach( () => {
    connectedRegister.detach();
  })
});
