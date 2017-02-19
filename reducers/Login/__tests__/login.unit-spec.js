process.env.NODE_ENV = 'test'

import _ from 'lodash'
import reducer from '../index'
import {
  authenticateD2L,
  RECEIVE_AUTHENTICATE_D2L
} from '../authenticateD2L'

import thunk from 'redux-thunk'
let chai = require('chai');
let should = require('should');
chai.should();


import configureMockStore from 'redux-mock-store'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)


describe('login reducer', function(done) {
  it('should update state upon RECEIVE_AUTHENTICATE_D2L', (done) => {

    let newState = reducer({}, {
      type: RECEIVE_AUTHENTICATE_D2L,
      data: {
        url: 'bah',
        d2lUser: {
          Identifier: 'foo'
        },
        courses: ['bar']
      }
    });

    newState.user.d2lUser.Identifier.should.be.eql('foo');
    newState.user.authenticatedUrl.should.be.eql('bah')
    newState.isLoggedIn.should.be.eql(true);

    done();
  })

  it('should create an action for authenticateD2L', done => {
    let D2LConfig = _.assign({}, require('../../../d2lcredentials'), {
      role: 'instructor'
    })

    const store = mockStore({})

    store.dispatch(authenticateD2L(D2LConfig))
    .then( () => {
      let actions = store.getActions()
      actions.length.should.be.eql(1);
      actions[0].type.should.be.eql(RECEIVE_AUTHENTICATE_D2L);
      // console.log('actions', actions)
      actions[0].data.url.should.be.a('string')
      actions[0].data.d2lUser.should.be.a('object')
      done();
    })
  })

})
