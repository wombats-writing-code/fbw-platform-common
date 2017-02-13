import React from 'react';

import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';

import MissionsComponent from '../web/Missions';
import MissionsContainer from '../MissionsContainer'
const Missions = MissionsContainer(MissionsComponent)

import {mount, shallow} from 'enzyme';

import '../../../styles/foundation.min.css'
import '../../../styles/core.scss'
import '../../../styles/animations.scss'
import '../../../styles/common.css'

const STATE = {
  course: {
    courses: [
      {
          "_id": "589e4c3ef36d2837a7c6790d",
          "Id": "1744153",
          "Name": "Fly-by-wire MAT121",
          "Code": "Fly-by-wire MAT121",
          "Semester": {
              "Identifier": "14226",
              "Name": "Sandbox",
              "Code": "SB"
          },
          "Department": {
              "Identifier": "6630",
              "Name": "Sandbox",
              "Code": "Sandbox"
          }
      }
    ]
  },
  mission: {
    missions: [

    ]
  }
}

let chai = require('chai')
chai.should()

describe('Missions', () => {

  const middlewares = [thunk]; // add your middlewares like `redux-thunk`
  let mockStore = configureStore(middlewares);
  let connectedComponent, store;

  before(function() {
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);

    store = mockStore(STATE);
    connectedComponent = mount(
      <Provider store={store}>
        <Missions  />
      </Provider>,
      {attachTo: div}
    );
  });

  it('should display a list of courses', () => {
    const component = connectedComponent.find(Missions)

    component.find('.mission').length.should.eql(0);
  });

  after(() => {
    // connectedComponent.detach();
  });
});
