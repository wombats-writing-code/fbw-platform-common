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
  resetPassword,
  RESET_PASSWORD_OPTIMISTIC,
  RECEIVE_RESET_PASSWORD,
  FAILED_RESET_PASSWORD
} from '../resetPassword'

describe('resetPassword', function(done) {
  it('should create an action for resetting password', done => {
    const store = mockStore({})

    nock('http://localhost:8888')
    .post(`/l4/reset-password`)
    .reply(200)

    store.dispatch(resetPassword({
      Identifier: 321
    }))
    .then( () => {
      let actions = store.getActions()
      actions.length.should.be.eql(2);
      actions[0].type.should.be.eql(RESET_PASSWORD_OPTIMISTIC);
      actions[1].type.should.be.eql(RECEIVE_RESET_PASSWORD);
      done();
    })
    .catch( (err) => {
      console.log('error...', err)
    })
  });

  it('should dispatch event for failed password reset', done => {
    nock('http://localhost:8888')
    .post(`/l4/reset-password`)
    .reply(400, "Username not verified")

    const store = mockStore({})
    store.dispatch(resetPassword({
      Identifier: 321
    }))
    .then( () => {
      let actions = store.getActions()
      actions.length.should.be.eql(2);
      actions[0].type.should.be.eql(RESET_PASSWORD_OPTIMISTIC);
      actions[1].type.should.be.eql(FAILED_RESET_PASSWORD);
      done();
    })
    .catch((err) => {
      console.log('failed reset password', err);
    })
  });
})
