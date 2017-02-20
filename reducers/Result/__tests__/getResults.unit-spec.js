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

import {getResults, GET_RESULTS_OPTIMISTIC, RECEIVE_RESULTS} from '../getResults'

describe('getResults', () => {
  it('should call getResults and receive a list of results', function(done) {
    this.timeout(15000);

    const store = mockStore({})

    store.dispatch(getResults({
      mission: {
        id: 'foo-mission'
      },
      user: {
        Identifier: 1145645     // shea butter
      },
    }))
    .then(res => {
      // console.log('getResults res', res);

      let actions = store.getActions();
      actions.length.should.eql(2);
      actions[0].type.should.eql(GET_RESULTS_OPTIMISTIC);
      actions[1].type.should.eql(RECEIVE_RESULTS);
      res.should.be.a('array');

      done();
    });
  })
})
