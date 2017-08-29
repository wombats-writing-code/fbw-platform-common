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
    component.find('a').at(1).prop('aria-label').should.eql('Home');
    component.find('img').first().prop('alt').should.eql('');
  });

  it('should display help button', () => {
    const component = connectedComponent.find(NavBar)

    component.find('.help-button').length.should.eql(1);
  });

  it('should display logout button', () => {
    const component = connectedComponent.find(NavBar)

    component.find('.logout-button').length.should.eql(1);
  });

  it('should include a (hidden) skip link', () => {
    const component = connectedComponent.find(NavBar)
    component.find('#skip-link').length.should.eql(1);
  });

  after(() => {
    // connectedComponent.detach();
  });
});
