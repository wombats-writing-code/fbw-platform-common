process.env.NODE_ENV = 'test'

import _ from 'lodash'
import thunk from 'redux-thunk'
let should = require('should');
import nock from 'nock'
import configureMockStore from 'redux-mock-store'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

import reducer from '../index'
import {RECEIVE_AUTHENTICATE_D2L} from '../authenticateD2L'

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
  });

})
