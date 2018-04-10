import React from 'react';
import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import {mount, shallow} from 'enzyme';
import nock from 'nock';

import GuestCallbackComponent from '../web/GuestCallback'
import GuestCallbackContainer from '../GuestCallbackContainer'


import '../../../styles/foundation.min.css'
import '../../../styles/core.scss'
import '../../../styles/animations.scss'

const STATE = require('./state.mock.json')
const CONFIG = require('./config.mock.json')

const GuestCallback = GuestCallbackContainer(GuestCallbackComponent, CONFIG)

let chai = require('chai')
chai.should()

describe('GuestCallback', () => {

  const middlewares = [thunk]; // add your middlewares like `redux-thunk`
  let mockStore = configureStore(middlewares);
  let connectedComponent, store;

  before(function() {
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);

    // Because guest logins will never get D2L enrollments, so
    //   they will throw a D2L exception, so let's mock that.
    nock('http://localhost:8888')
    .get(`/mock-d2l/enrollments?role=instructor&name=foo`)
    .reply(500, ['foo'])

    store = mockStore(STATE);
    connectedComponent = mount(
      <Provider store={store}>
        <GuestCallback location={{query: {name: 'foo'}}}/>
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
    connectedComponent.detach();
  });
});
