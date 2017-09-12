import React from 'react';

import {Provider} from 'react-redux'
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store'
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
//
import MissionComponent from '../web/Mission';
import MissionContainer from '../MissionContainer'
const Mission = MissionContainer(MissionComponent)
//
import {mount, shallow, ReactWrapper} from 'enzyme';

import '../../../styles/foundation.min.css'
import '../../../styles/core.scss'
import '../../../styles/animations.scss'

// const STATE = require('./state.mock.json')
// const STATE = require('./correct-state.mock.json')
const STATE = require('./solution-state.mock.json')
const COMPLETED_STATE = require('./completed-state.mock.json')
const UNOPENED_STATE = require('./unopened-state.mock.json')

let chai = require('chai')
chai.should()


describe('Mission', () => {

  const middlewares = [thunk]; // add your middlewares like `redux-thunk`
  let mockStore = configureStore(middlewares);
  let connectedComponent, store;

  before(function() {
    const div = global.document.createElement('div');

    global.document.body.appendChild(div);

    store = mockStore(STATE);
    connectedComponent = mount(
      <Provider store={store}>
        <Mission mission={STATE.mission.currentMission} />
      </Provider>,
      {attachTo: div}
    );
  });

  it('should render a mission with a current target route displayed', () => {
    const mission = connectedComponent.find(Mission)

    mission.find('.question-card').length.should.be.eql(2);   // 2 questions in this target route
    // STATE.should.be.eql('bar')

  });

  it('should render a mission with the current status displayed', () => {
    const mission = connectedComponent.find(Mission)

    mission.find('.current-status').length.should.be.eql(1);
    mission.html().should.contain('5 Correct');
    mission.html().should.contain('11 Attempted');
    mission.html().should.contain('34 Remaining');
  });

  it('should not render a modal when have unattempted questions', () => {
    connectedComponent.find(Modal).length.should.eql(0);

  });

  after( function() {
    connectedComponent.detach();
  });
});

describe('A completed Mission', () => {

  const middlewares = [thunk]; // add your middlewares like `redux-thunk`
  let mockStore = configureStore(middlewares);
  let connectedComponent, store;

  before(function() {
    const div = global.document.createElement('div');
    global.document.body.id = 'root';
    global.document.body.appendChild(div);

    store = mockStore(COMPLETED_STATE);
    connectedComponent = mount(
      <Provider store={store}>
        <Mission mission={COMPLETED_STATE.mission.currentMission} />
      </Provider>,
      {attachTo: div}
    );
  });

  it('should render a modal', () => {
    setTimeout(() => {
      const modal = ReactDOM.findDOMNode(connectedComponent.find(Modal).node.portal);
      modal.innerHTML.should.contain('2 out of 2');
    }, 3500);
  });

  it('should close modal when click the button', () => {
    setTimeout(() => {
      const modal = new ReactWrapper(ReactDOM.findDOMNode(connectedComponent.find(Modal).node.portal), true);
      // modal.innerHTML.should.contain('2 out of 2');
      modal.find('.close-modal-button').simulate('click');
      connectedComponent.find(Modal).length.should.eql(0);
    }, 3500);
  });

  after( function() {
    connectedComponent.detach();
  });
});

describe('An unopened Mission', () => {

  const middlewares = [thunk]; // add your middlewares like `redux-thunk`
  let mockStore = configureStore(middlewares);
  let connectedComponent, store;

  before(function() {
    const div = global.document.createElement('div');
    global.document.body.id = 'root';
    global.document.body.appendChild(div);

    store = mockStore(UNOPENED_STATE);
    connectedComponent = mount(
      <Provider store={store}>
        <Mission mission={UNOPENED_STATE.mission.currentMission} />
      </Provider>,
      {attachTo: div}
    );
  });

  it('should not render a modal', () => {
    setTimeout(() => {
      connectedComponent.find(Modal).length.should.eql(0);
    }, 3500);
  });

  after( function() {
    connectedComponent.detach();
  });
});
