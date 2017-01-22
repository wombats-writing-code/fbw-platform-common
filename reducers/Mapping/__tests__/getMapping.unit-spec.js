let chai = require('chai');
let should = require('should');
chai.should();
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

import _ from 'lodash'
const Q = require('q')

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

import {getMapping} from '../getMapping'

describe('getMapping', () => {
  it('should call getMapping and receive modules, outcomes, relationships for both subject banks', function(done) {
    this.timeout(1000*60);

    const store = mockStore({})

    store.dispatch(getMapping())
    .then(res => {
      res.modules.should.be.a('array');
      res.modules.length.should.be.at.least(10);
      res.outcomes.should.be.a('array');
      res.outcomes.length.should.be.at.least(10);
      res.relationships.should.be.a('array');
      res.relationships.length.should.be.at.least(10); 

      done();
    });
  })
})
