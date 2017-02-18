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

const EXPECTED_MAT_121_COURSE = {
  "Id": "1744153",
  "Name": "Fly-by-wire MAT121",
  "Code": "Fly-by-wire MAT121",
  "IsActive": true,
  "Path": "/content/enforced2012/1744153-Fly-by-wireMAT121/",
  "Department": {
    "Identifier": "6630",
    "Name": "Sandbox",
    "Code": "Sandbox"
  }
};


import configureMockStore from 'redux-mock-store'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)


describe('login reducer', function(done) {
  it('should update state upon RECEIVE_AUTHENTICATE_D2L', (done) => {
    const mockUrl = 'd2l-callback?x_a=94Uf24iaW4SWpQMzFvsMrH&x_b=uq9naj95YZ2bOzgZ8se69m&x_c=66IANU-TLdAJDIOmfvygR1tA110eoQe-bYdMFldm5rA';

    let newState = reducer({}, {
      type: RECEIVE_AUTHENTICATE_D2L,
      data: {
        url: mockUrl,
        username: 'Butter-Scotch-1145648@acc.edu',
        courses: [{department: 'Sandbox', id: "assessment.Bank%3A58498ccb71e482e47e0ed8ce%40bazzim.MIT.EDU"}]
      }
    });

    newState.user.username.should.be.eql('Butter-Scotch-1145648@acc.edu');
    newState.user.d2l.authenticatedUrl.should.be.eql(mockUrl)
    newState.isLoggedIn.should.be.eql(true);
    newState.isVisitor.should.be.eql(false);

    done();
  })

  it('should create an action for authenticateD2L', done => {
    let credentials = _.assign({}, require('../../../d2lcredentials'), {
      role: 'instructor'
    })

    const store = mockStore({})

    store.dispatch(authenticateD2L(credentials))
    .then( () => {
      let actions = store.getActions()
      actions.length.should.be.eql(1);
      actions[0].type.should.be.eql(RECEIVE_AUTHENTICATE_D2L);
      // console.log('actions', actions)
      actions[0].data.username.should.be.a('string')
      done();
    })
  })

})
