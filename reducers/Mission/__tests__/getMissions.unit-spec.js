let chai = require('chai');
let should = require('should');
chai.should();
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

const _ = require('lodash')
const Q = require('q')

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
// import nock from 'nock'

import reducer from '../index'

import {getMissions} from '../getMissions'

describe('getMissions', () => {
  it('should call getMissions and receive a list of missions for Nutter Butter', function(done) {
    // nock('http://localhost:8888/l4/')
    // .get('/missions')
    // .reply(200, {});

    const store = mockStore({});

    store.dispatch(getMissions({
      username: 'Nutter-Butter-1145644@acc.edu',
      courseId: '1744153'
    }))
    .then(missions => {
      // console.log('getMissions.unit-spec', missions);
      missions.should.be.a('array');
      missions.length.should.be.at.least(2);    // as of Jan 10, 2017

      done();
    });
  });

})
