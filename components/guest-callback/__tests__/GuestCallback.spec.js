import React from 'react';
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import {mount, shallow} from 'enzyme';

import GuestCallback from '../GuestCallbackContainer'


import '../../../styles/foundation.min.css'
import '../../../styles/core.scss'
import '../../../styles/animations.scss'
import '../../../styles/common.css'

const STATE = require('./state.mock.json')

let chai = require('chai')
chai.should()

describe('GuestCallback', () => {

  const middlewares = [thunk]; // add your middlewares like `redux-thunk`
  let mockStore = configureStore(middlewares);
  let connectedComponent, store;

  before(function() {
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);

    store = mockStore(STATE);
    connectedComponent = mount(
      <Provider store={store}>
        <GuestCallback  />
      </Provider>,
      {attachTo: div}
    );
  });

  it('should mount the callback screen (instructor role)', () => {
    const callback = connectedComponent.find(GuestCallback)

    callback.find('.callback-text').text().should.be.eql("Redirecting you to your dashboard...");
    // callback.props().should.contain
  });

  after(() => {
    // connectedComponent.detach();
  });
});