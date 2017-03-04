process.env.NODE_ENV = 'test'

import _ from 'lodash'
import thunk from 'redux-thunk'
let should = require('should');
import configureMockStore from 'redux-mock-store'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
import nock from 'nock'

import { authenticateGuest, RECEIVE_AUTHENTICATE_GUEST } from '../authenticateGuest'

describe('authenticateGuest', function(done) {
  it('should create an action for authenticateGuest', done => {
    const store = mockStore({})

    nock('http://localhost:8888')
    .get(`/mock-d2l/enrollments`)
    .reply(200, ['foo'])

    nock('http://localhost:8888')
    .get(`/mock-d2l/whoami`)
    .reply(200, {name: 'superman'})

    nock('http://localhost:8888')
    .post(`/l4/users`)
    .reply(200, {name: 'superman'})

    store.dispatch(authenticateGuest())
    .then( () => {
      let actions = store.getActions()
      actions.length.should.be.eql(1);
      actions[0].type.should.be.eql(RECEIVE_AUTHENTICATE_GUEST);
      console.log('actions', actions)
      actions[0].data.courses.should.be.a('array')
      actions[0].data.url.should.be.a('string')
      actions[0].data.d2lUser.should.be.a('object')
      done();
    })
  });
})
