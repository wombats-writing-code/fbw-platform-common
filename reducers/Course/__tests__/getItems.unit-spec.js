
let chai = require('chai');
let should = require('should');
chai.should();
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
import nock from 'nock'

const _ = require('lodash')
const Q = require('q')

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

import {getItems} from '../getItems'

describe('getItems', function() {
  this.timeout(3000);

  it('should call getItems and receive items for Accounting', function(done) {
    const store = mockStore({})

    store.dispatch(getItems({
      course: {Id: '1744153'},
      user: {
        Identifier: 1145645     // shea butter
      },
    }))
    .then(res => {
      // console.log('getItems res', res);
      res.should.be.a('array');
      res.length.should.be.at.least(194);    // as of Jan 10, 2017

      done();
    });
  })
})
