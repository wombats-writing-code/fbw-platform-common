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
  registerUser,
  REGISTER_USER_OPTIMISTIC,
  RECEIVE_REGISTER_USER,
  FAILED_REGISTER_USER
} from '../registerUser'

describe('registerUser', function(done) {
  it('should create an action for register new user', done => {
    const store = mockStore({})

    nock('http://localhost:8888')
    .post(`/l4/register`)
    .reply(200, {
      name: 'superman',
      Identifier: 321,
      token: '123'
    })

    store.dispatch(registerUser({
      user: {
        Identifier: 321,
        password: 'foo'
      }
    }))
    .then( () => {
      let actions = store.getActions()
      actions.length.should.be.eql(2);
      actions[0].type.should.be.eql(REGISTER_USER_OPTIMISTIC);
      actions[1].type.should.be.eql(RECEIVE_REGISTER_USER);
      actions[1].user.token.should.be.a('string')
      actions[1].user.Identifier.should.be.eql(321)
      done();
    })
    .catch( (err) => {
      console.log('error...', err)
    })
  });

  it('should dispatch event for failed registration', done => {
    nock('http://localhost:8888')
    .post(`/l4/register`)
    .reply(400, "Username already exists")

    const store = mockStore({})
    store.dispatch(registerUser({
      user: {
        Identifier: 321,
        password: 'foo'
      }
    }))
    .then( () => {
      let actions = store.getActions()
      actions.length.should.be.eql(2);
      actions[0].type.should.be.eql(REGISTER_USER_OPTIMISTIC);
      actions[1].type.should.be.eql(FAILED_REGISTER_USER);
      done();
    })
    .catch((err) => {
      console.log('failed registration', err);
    })
  });
})
