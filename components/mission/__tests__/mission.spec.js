import React from 'react';

import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
//
import MissionComponent from '../web/Mission';
import MissionContainer from '../MissionContainer'
const Mission = MissionContainer(MissionComponent)
//
import {mount, shallow} from 'enzyme';

import '../../../styles/foundation.min.css'
import '../../../styles/core.scss'
import '../../../styles/animations.scss'
import '../../../styles/common.css'

const STATE = require('./state.mock.json')

let chai = require('chai')
chai.should()

describe('Mission', () => {

  let mockStore = configureStore([]);
  let connectedComponent, store;

  before(function() {
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);

    store = mockStore(STATE);
    connectedComponent = mount(
      <Provider store={store}>
        <Mission  />
      </Provider>,
      {attachTo: div}
    );
  });

  it('should render a mission with a current target route displayed', () => {
    const mission = connectedComponent.find(Mission)

    mission.find('.question-card').length.should.be.eql(2);   // 2 questions in this target route
    // STATE.should.be.eql('bar')

  });

  after( function() {
    // connectedComponent.detach();
  });
});
