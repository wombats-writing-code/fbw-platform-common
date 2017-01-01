import React from 'react';

import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'

import LoginComponent from '../web/Login';
import LoginContainer from '../LoginContainer'
const Login = LoginContainer(LoginComponent)

import {mount, shallow} from 'enzyme';

import '../../../styles/foundation.min.css'
import '../../../styles/core.scss'
import '../../../styles/animations.scss'
import '../../../styles/common.css'

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
        <Login  />
      </Provider>,
      {attachTo: div}
    );
  });

  it('should render the login page', () => {
    // const login = connectedComponent.find(Login)

    // mission.find('.question-card').length.should.be.eql(3);
    STATE.should.be.eql('bar')

  });
});
