import React from 'react';

import {Provider} from 'react-redux'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk';

import NavBar from '../web/';

import {mount, shallow} from 'enzyme';

let chai = require('chai')
chai.should()

import '../../../styles/foundation.min.css'
import '../../../styles/core.scss'
import '../../../styles/animations.scss'

const STATE = {
  route: {
    path: '/missions'
  },
  routeParams: {

  },
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
  },
  login: {
    user: {
      d2lUser: 'Susan Peabody',
      username: 'Susan Peabody'
    }
  }
}

describe('NavBar', () => {

  const middlewares = [thunk]; // add your middlewares like `redux-thunk`
  let mockStore = configureStore(middlewares);
  let connectedComponent, store;

  before(function() {
    const div = global.document.createElement('div');
    global.document.body.appendChild(div);

    const props = {
      route: {
        path: STATE.route.path
      },
      user: 'foo'
    };

    store = mockStore(STATE);
    connectedComponent = mount(
      <Provider store={store}>
        <NavBar />
      </Provider>,
      {attachTo: div}
    );
  });

  it('should display breadcrumbs', () => {
    const component = connectedComponent.find(NavBar)

    component.find('.breadcrumb').length.should.eql(1);  // Home
    component.find('a').first().prop('aria-label').should.eql('Home');
    component.find('img').first().prop('alt-text').should.eql('');
  });

  after(() => {
    // connectedComponent.detach();
  });
});
