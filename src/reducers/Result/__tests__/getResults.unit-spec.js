
let chai = require('chai');
let should = require('should');
chai.should();
chai.should();
const _ = require('lodash')
const Q = require('q')
const nock = require('nock')

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

import reducer from '../index'


import {getResults, GET_RESULTS_OPTIMISTIC, RECEIVE_RESULTS} from '../getResults'

describe('getResults', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should call getResults and receive a list of records for a user', function(done) {
    nock('http://localhost:8888')
    .get(`/l4/results?missionId=fooMission`)
    .reply(200, ['1', '2'])

    const store = mockStore({})

    store.dispatch(getResults({
      mission: {
        id: 'fooMission'
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
      actions[1].results.should.eql(['1', '2'])


      done();
    });
  })
})
