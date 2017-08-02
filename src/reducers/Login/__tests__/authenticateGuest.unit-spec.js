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

import { authenticateGuest, RECEIVE_AUTHENTICATE_GUEST } from '../authenticateGuest'

describe('authenticateGuest', function(done) {
  it('should create an action for authenticateGuest with no name', done => {
    let D2LConfig = _.assign({}, require('../../../d2lcredentials'), {
      role: 'student'
    })

    console.log(D2LConfig);

    const store = mockStore({})

    nock('http://localhost:8888')
    .get(`/mock-d2l/enrollments?role=student&name=undefined`)
    .reply(200, ['foo'])

    nock('http://localhost:8888')
    .get(`/mock-d2l/whoami`)
    .reply(200, {
      name: 'superman',
      Identifier: 321
    })

    nock('http://localhost:8888')
    .post(`/l4/users`)
    .reply(200, {name: 'superman'})

    store.dispatch(authenticateGuest(D2LConfig))
    .then( () => {
      let actions = store.getActions()
      console.log(actions)
      actions.length.should.be.eql(1);
      actions[0].type.should.be.eql(RECEIVE_AUTHENTICATE_GUEST);
      // console.log('actions', actions)
      actions[0].data.courses.should.be.a('array')
      actions[0].data.url.should.be.a('string')
      actions[0].data.d2lUser.should.be.a('object')
      done();
    })
  });

  it('should create an action for authenticateGuest with a guest-provided name', done => {
    let D2LConfig = _.assign({}, require('../../../d2lcredentials'), {
      role: 'instructor'
    })

    const store = mockStore({})

    nock('http://localhost:8888')
    .get(`/mock-d2l/enrollments?role=instructor&name=jane%20doe`)
    .reply(200, ['foo'])

    nock('http://localhost:8888')
    .post(`/mock-d2l/whoami`)
    .reply(200, {
      name: 'jane doe',
      Identifier: 123
    })

    nock('http://localhost:8888')
    .post(`/l4/users`)
    .reply(200, {name: 'superman'})

    store.dispatch(authenticateGuest(D2LConfig, 'jane doe'))
    .then( () => {
      let actions = store.getActions()
      actions.length.should.be.eql(1);
      actions[0].type.should.be.eql(RECEIVE_AUTHENTICATE_GUEST);
      // console.log('actions', actions)
      actions[0].data.courses.should.be.a('array')
      actions[0].data.url.should.be.a('string')
      actions[0].data.d2lUser.should.be.a('object')
      done();
    })
  });
})
