process.env.NODE_ENV = 'test'

import _ from 'lodash'
import axios from 'axios'

import {
  authenticateD2LStudent
} from '../reducers/Login/authenticateD2L'
import {logInUser} from '../reducers/Login/logInUser'
import {RECEIVE_MISSIONS, getMissions} from '../reducers/Mission/getMissions'
import {RECEIVE_CREATE_TAKE_MISSION, selectOpenMission} from '../reducers/Mission/selectOpenMission'

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

let chai = require('chai');
const chaiHttp = require('chai-http');

let should = require('should');
chai.should();
chai.use(chaiHttp);

const MAT_BANK_ID = 'assessment.Bank%3A58498ccb71e482e47e0ed8ce%40bazzim.MIT.EDU';
const TEST_MISSION_ID = 'assessment.AssessmentOffered%3A58768d4271e48263fb04feb8%40bazzim.MIT.EDU'

const BASE_URL = 'https://fbw-web-backend.herokuapp.com'

const UNIQUE_USERNAME = Math.floor(new Date().getTime()).toString()
const FAKE_SCHOOL = "testing"
const LOGGED_IN_USERNAME = `${UNIQUE_USERNAME}@${FAKE_SCHOOL}.edu`

let privateBankId

describe('student web app', () => {
  it('should not allow unauthorized students to make qbank calls', function (done) {
    // just verify that students without qbank authz cannot
    // hasBasicAuthz, as a contrast against the next `it` block
    chai.request(BASE_URL)
    .get(`/middleman/hasBasicAuthz`)
    .set('x-fbw-username', LOGGED_IN_USERNAME)
    .end((err, res) => {
      res.should.have.status(403);
      done();
    })
  })

  it('should create basic qbank authorizations upon LOGIN', function (done) {
    // which means that you should be able to make calls
    // under that proxyname to something like, hasBasicAuthz
    const store = mockStore({})

    store.dispatch(logInUser(FAKE_SCHOOL, UNIQUE_USERNAME))
    .then( () => {
      return chai.request(BASE_URL)
      .get(`/middleman/hasBasicAuthz`)
      .set('x-fbw-username', LOGGED_IN_USERNAME)
    })
    .then((res) => {
      res.should.have.status(200)
      done()
    })
    .catch((err) => {
      console.log(err)
    })
  })

  // @luwenh -- help here, getting a 400 error about http vs. https when I run
  // this block??
  // it('should create / retrieve the private bank when calling authenticateD2LStudent and create authz', done => {
  //   // You can now make middleman calls to getMission (which
  //   //   calculates the privateBankId for you)
  //   let credentials = _.assign({}, require('../d2lcredentials'), {
  //     role: 'student'
  //   })
  //
  //   const store = mockStore({
  //     login: {
  //       user: {
  //         username: LOGGED_IN_USERNAME
  //       },
  //       isLoggedIn: true,
  //       isVisitor: false
  //     }
  //   })
  //
  //   let expectedAction = {
  //     type: RECEIVE_MISSIONS,
  //
  //   }
  //
  //   store.dispatch(authenticateD2LStudent(credentials))
  //   .then( () => {
  //     // Here I want to check that I can getMissions for the MAT_BANK_ID
  //     // assuming that the mocked student is enrolled in that course??
  //   //   return store.dispatch(getMissions({
  //   //     subjectBankId: MAT_BANK_ID,
  //   //     username: LOGGED_IN_USERNAME
  //   //   }))
  //   // })
  //   // .then( () => {
  //     // privateBankId = state.bank.privateBankId -- need this for cleanup
  //     console.log(store.getActions())
  //     // store.getActions().should.be.eql(expectedAction)
  //     // list of missions should be > 0
  //   })
  // })

  //   it('should be able to get and respond to questions for a mission', done => {
  //     const expectedAction = {
  //       type: RECEIVE_CREATE_TAKE_MISSION,
  //       credentials
  //     }
  //     const store = mockStore({})
  //
  //     store.dispatch(selectOpenMission())
  //     .then( () => {
  //       // Submit to a question here???
  //     })
  //   })
  //

  function cleanUpPromise(student) {
    console.log('cleaning up for', student);

    return chai.request(BASE_URL)
    .delete(`/middleman/banks/${privateBankId}`)
    .then( (res) => {
      res.should.have.status(200);
      return chai.request(BASE_URL)
      .delete(`/middleman/authorizations`)
      .set('x-fbw-username', LOGGED_IN_USERNAME)
    })
    .then( (res) => {
      res.should.have.status(200)
      return Q.when('')
    })
    .catch( err => err);
  }

  // clean up all the newly-created authorizations, banks, and missions
  after( function(done) {
    this.timeout(20000);

    cleanUpPromise(LOGGED_IN_USERNAME)
    .then( res => {
      console.log('cleaned up for all newly created students', res.text);

      done();
    })
  })
})
