process.env.NODE_ENV = 'test'

import reducer from '../index'
import {
  authenticateD2LStudent, authenticateD2LInstructor,
  RECEIVE_AUTHENTICATE_D2L
} from '../authenticateD2L'

import thunk from 'redux-thunk'
let chai = require('chai');
let should = require('should');
chai.should();


import configureMockStore from 'redux-mock-store'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)


describe('login reducer', () => {

  it('should set the username and authenticatedUrl upon RECEIVE_AUTHENTICATE_D2L', () => {
    const mockUrl = 'd2l-callback?x_a=94Uf24iaW4SWpQMzFvsMrH&x_b=uq9naj95YZ2bOzgZ8se69m&x_c=66IANU-TLdAJDIOmfvygR1tA110eoQe-bYdMFldm5rA';

    let newState = reducer({}, {
      type: RECEIVE_AUTHENTICATE_D2L,
      data: {
        url: mockUrl,
        username: 'Butter-Scotch-1145648@acc.edu',
        banks: [{department: 'Sandbox', id: "assessment.Bank%3A58498ccb71e482e47e0ed8ce%40bazzim.MIT.EDU"}]
      }
    });

    newState.user.username.should.be.eql('Butter-Scotch-1145648@acc.edu');
    newState.user.d2l.authenticatedUrl.should.be.eql(mockUrl)
    newState.isLoggedIn.should.be.eql(true);
  })

  it('should create an action for authenticateD2LInstructor', () => {
    let credentials = require('../../../d2lcredentials')
    credentials.role = 'instructor';

    const expectedAction = {
      type: RECEIVE_AUTHENTICATE_D2L,
      credentials
    }
    const store = mockStore({})

    store.dispatch(authenticateD2LInstructor(credentials))
    .then( () => {
      store.getActions().should.be.eql(expectedAction)
    })
  })

})
