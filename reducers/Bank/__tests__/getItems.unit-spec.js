import reducer from '../index'

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

import {getItems} from '../getItems'

describe('getItems', () => {
  it('should call getItems and receive items for the Accounting bank', function(done) {
    this.timeout(15000);

    const store = mockStore({})

    store.dispatch(getItems('assessment.Bank:57279fbce7dde086c7fe20ff@bazzim.MIT.EDU'))
    .then(res => {
      // console.log('getItems res', res);
      res.should.be.a('array');
      res.length.should.be.at.least(194);    // as of Jan 10, 2017

      done();
    });
  })
})
