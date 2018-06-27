process.env.NODE_ENV = 'test'

let chai = require('chai');

import _ from 'lodash'
import thunk from 'redux-thunk'
let should = require('should');
import configureMockStore from 'redux-mock-store'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
import nock from 'nock'

chai.should();

import {
  loginGuest,
  LOGIN_GUEST_OPTIMISTIC,
  RECEIVE_LOGIN_GUEST,
  FAILED_LOGIN_GUEST
} from '../loginGuest'

describe('loginGuest', function(done) {
  it('should create an action for logging in a user', done => {
    const store = mockStore({})

    nock('http://localhost:8888')
    .post(`/l4/guest-login`)
    .reply(200, {
      name: 'superman',
      Identifier: 321,
      token: '123'
    })

    store.dispatch(loginGuest({
      Identifier: 321,
      password: 'foo'
    }))
    .then( () => {
      let actions = store.getActions()
      actions.length.should.be.eql(2);
      actions[0].type.should.be.eql(LOGIN_GUEST_OPTIMISTIC);
      actions[1].type.should.be.eql(RECEIVE_LOGIN_GUEST);
      actions[1].data.d2luser.token.should.be.a('string')
      actions[1].data.d2luser.Identifier.should.be.eql(321)
      done();
    })
    .catch( (err) => {
      console.log('error...', err)
    })
  });

  it('should dispatch event for failed login', done => {
    nock('http://localhost:8888')
    .post(`/l4/guest-login`)
    .reply(400, "Username already exists")

    const store = mockStore({})
    store.dispatch(loginGuest({
      Identifier: 321,
      password: 'foo'
    }))
    .then( () => {
      let actions = store.getActions()
      actions.length.should.be.eql(2);
      actions[0].type.should.be.eql(LOGIN_GUEST_OPTIMISTIC);
      actions[1].type.should.be.eql(FAILED_LOGIN_GUEST);
      done();
    })
    .catch((err) => {
      console.log('failed login', err);
    })
  });
})
