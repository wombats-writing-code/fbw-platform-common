
let should = require('should');
import nock from 'nock'
const _ = require('lodash')
const Q = require('q')
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

import {getItems} from '../getItems'

describe('getItems', function() {
  it('should call getItems and receive items for Accounting', function(done) {
    nock('http://localhost:8888')
    .get('/l4/questions?courseId=1744153')
    .reply(200, ['q1', 'q2']);

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
      res.length.should.eql(2);

      done();
    });
  })
})
