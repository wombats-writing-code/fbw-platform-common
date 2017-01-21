process.env.NODE_ENV = 'test'

import _ from 'lodash'
import reducer from '../index'
import {
  authenticateD2LStudent, authenticateD2LInstructor,
  RECEIVE_AUTHENTICATE_D2L, AUTHENTICATE_D2L_OPTIMISTIC
} from '../authenticateD2L'

import thunk from 'redux-thunk'
let chai = require('chai');
let should = require('should');
chai.should();

const EXPECTED_MAT_121_BANK = {
  displayName:
     { text: 'Fly-by-wire MAT121',
       languageTypeId: '639-2%3AENG%40ISO',
       formatTypeId: 'TextFormats%3APLAIN%40okapia.net',
       scriptTypeId: '15924%3ALATN%40ISO' },
    recordTypeIds: [],
    license:
     { text: '',
       languageTypeId: '639-2%3AENG%40ISO',
       formatTypeId: 'TextFormats%3APLAIN%40okapia.net',
       scriptTypeId: '15924%3ALATN%40ISO' },
    providerId: '',
    _links:
     { items: 'https://qbank.mit.edu/api/v2/assessment/banks/assessment.Bank%3A1744153%40ACC.D2L.COM/items/',
       self: 'https://qbank.mit.edu/api/v2/assessment/banks/assessment.Bank%3A1744153%40ACC.D2L.COM/',
       assessments: 'https://qbank.mit.edu/api/v2/assessment/banks/assessment.Bank%3A1744153%40ACC.D2L.COM/assessments/' },
    brandingIds: [],
    genusTypeId: 'assessment-bank-genus%3Afbw-term%40ODL.MIT.EDU',
    type: 'Bank',
    id: 'assessment.Bank%3A58498ccb71e482e47e0ed8ce%40bazzim.MIT.EDU',
    description:
     { text: 'Sandbox',
       languageTypeId: '639-2%3AENG%40ISO',
       formatTypeId: 'TextFormats%3APLAIN%40okapia.net',
       scriptTypeId: '15924%3ALATN%40ISO' } }


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
    newState.isVisitor.should.be.eql(false);

  })

  it('should create an action for authenticateD2LInstructor', done => {
    let credentials = _.assign({}, require('../../../d2lcredentials'), {
      role: 'instructor'
    })

    const expectedAction = [{
      type: AUTHENTICATE_D2L_OPTIMISTIC
    },{
      type: RECEIVE_AUTHENTICATE_D2L,
      data: {
        url: 'blank',
        username: 'Butter-Scotch-1145648@acc.edu',
        banks: [EXPECTED_MAT_121_BANK]
      }
    }]
    const store = mockStore({})

    store.dispatch(authenticateD2LInstructor(credentials))
    .then( () => {
      let actions = store.getActions()
      actions.length.should.be.eql(2)
      actions[0].type.should.be.eql(AUTHENTICATE_D2L_OPTIMISTIC)
      actions[1].type.should.be.eql(RECEIVE_AUTHENTICATE_D2L)
      actions[1].data.username.should.be.eql(expectedAction[1].data.username)
      actions[1].data.banks[0].id.should.be.eql(EXPECTED_MAT_121_BANK.id)
      done()
    })
  })

  it('should create an action for authenticateD2LStudent', done => {
    let credentials = _.assign({}, require('../../../d2lcredentials'), {
      role: 'student'
    })

    const expectedAction = [{
      type: RECEIVE_AUTHENTICATE_D2L,
      data: {
        url: 'blank',
        banks: [EXPECTED_MAT_121_BANK],
        username: 'Shea-Butter-1145645@acc.edu' }
    }]
    const store = mockStore({})

    store.dispatch(authenticateD2LStudent(credentials))
    .then( () => {
      let actions = store.getActions()
      actions.length.should.be.eql(1)
      actions[0].type.should.be.eql(RECEIVE_AUTHENTICATE_D2L)
      actions[0].data.username.should.be.eql(expectedAction[0].data.username)
      actions[0].data.banks[0].id.should.be.eql(EXPECTED_MAT_121_BANK.id)
      done()
    })
  })

})
