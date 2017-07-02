import React from 'react';

import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';

let credentials = require('../../../d2lcredentials');
import D2LCallbackComponent from '../web/D2LCallback';
import D2LCallbackContainer from '../D2LCallbackContainer'
const D2LCallback = D2LCallbackContainer(D2LCallbackComponent, credentials)

import {mount, shallow} from 'enzyme';

import '../../../styles/foundation.min.css'
import '../../../styles/core.scss'
import '../../../styles/animations.scss'

const STATE = require('./state.mock.json')

let chai = require('chai')
chai.should()

describe('D2LCallback', () => {

  const middlewares = [thunk]; // add your middlewares like `redux-thunk`
  let mockStore = configureStore(middlewares);
  let connectedComponent, store;

  before(function() {
    credentials.role = 'instructor'
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);

    store = mockStore(STATE);
    connectedComponent = mount(
      <Provider store={store}>
        <D2LCallback  />
      </Provider>,
      {attachTo: div}
    );
  });

  it('should mount the callback screen (instructor role)', () => {
    const callback = connectedComponent.find(D2LCallback)

    callback.find('.callback-text').text().should.be.eql("Redirecting you to your dashboard...");
    // callback.props().should.contain
  });

  after(() => {
    connectedComponent.detach();
  });
});
