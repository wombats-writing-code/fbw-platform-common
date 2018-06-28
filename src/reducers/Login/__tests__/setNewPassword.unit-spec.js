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
  setNewPassword,
  SET_NEW_PASSWORD_OPTIMISTIC,
  RECEIVE_SET_NEW_PASSWORD,
  FAILED_SET_NEW_PASSWORD
} from '../setNewPassword'

describe('setNewPassword', function(done) {
  it('should create an action for settings a new password', done => {
    const store = mockStore({})

    nock('http://localhost:8888')
    .post(`/l4/set-password`)
    .reply(200)

    store.dispatch(setNewPassword({
      _id: 321,
      password: 'new_password'
    }))
    .then( () => {
      let actions = store.getActions()
      actions.length.should.be.eql(2);
      actions[0].type.should.be.eql(SET_NEW_PASSWORD_OPTIMISTIC);
      actions[1].type.should.be.eql(RECEIVE_SET_NEW_PASSWORD);
      done();
    })
    .catch( (err) => {
      console.log('error...', err)
    })
  });

  it('should dispatch event for failed set new password', done => {
    nock('http://localhost:8888')
    .post(`/l4/set-password`)
    .reply(400, "Username not verified")

    const store = mockStore({})
    store.dispatch(setNewPassword({
      _id: 321,
      password: 'new_password'
    }))
    .then( () => {
      let actions = store.getActions()
      actions.length.should.be.eql(2);
      actions[0].type.should.be.eql(SET_NEW_PASSWORD_OPTIMISTIC);
      actions[1].type.should.be.eql(FAILED_SET_NEW_PASSWORD);
      done();
    })
    .catch((err) => {
      console.log('failed set new password', err);
    })
  });
})
