process.env.NODE_ENV = 'test'

import _ from 'lodash'
import axios from 'axios'

import {
  authenticateD2LStudent
} from '../reducers/Login/authenticateD2L'
import {LOGGED_IN, logInUser} from '../reducers/Login/logInUser'

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

  // it('should create / retrieve the private bank when calling authenticateD2LStudent and create authz', done => {
  //   // You can now make middleman calls to getMission (which
  //   //   calculates the privateBankId for you)
  //   let credentials = _.assign({}, require('../../../d2lcredentials'), {
  //     role: 'student'
  //   })
  //
  //   const store = mockStore({})
  //
  //   store.dispatch(authenticateD2LStudent(credentials))
  //   .then( (data) => {
  //     // data = {url, banks, username} but we shouldn't care what it is...
  //     return chai.request(BASE_URL)
  //     .get(`/middleman/banks/${MAT_BANK_ID}`)
  //     .set('x-fbw-username', LOGGED_IN_USERNAME)
  //     store.getActions().should.be.eql(expectedAction)
  //   })
  // })
  // //
  // // it('should be able to get a list of D2L shared missions', done => {
  // //   // this verifies that the private bank was inserted into the hierarchy
  // //   //    correctly
  // //   let credentials = _.assign({}, require('../../../d2lcredentials'), {
  // //     role: 'student'
  // //   })
  // //
  // //   const expectedAction = {
  // //     type: RECEIVE_AUTHENTICATE_D2L,
  // //     credentials
  // //   }
  // //   const store = mockStore({})
  // //
  // //   store.dispatch(authenticateD2LStudent(credentials))
  // //   .then( () => {
  // //     store.getActions().should.be.eql(expectedAction)
  // //   })
  // // })
  // //   it('should be able to get questions for a mission', done => {
  // //     let credentials = _.assign({}, require('../../../d2lcredentials'), {
  // //       role: 'student'
  // //     })
  // //
  // //     const expectedAction = {
  // //       type: RECEIVE_AUTHENTICATE_D2L,
  // //       credentials
  // //     }
  // //     const store = mockStore({})
  // //
  // //     store.dispatch(authenticateD2LStudent(credentials))
  // //     .then( () => {
  // //       store.getActions().should.be.eql(expectedAction)
  // //     })
  // //   })
  // //
  // //   it('should be able to get submit responses for a mission', done => {
  // //     let credentials = _.assign({}, require('../../../d2lcredentials'), {
  // //       role: 'student'
  // //     })
  // //
  // //     const expectedAction = {
  // //       type: RECEIVE_AUTHENTICATE_D2L,
  // //       credentials
  // //     }
  // //     const store = mockStore({})
  // //
  // //     store.dispatch(authenticateD2LStudent(credentials))
  // //     .then( () => {
  // //       store.getActions().should.be.eql(expectedAction)
  // //     })
  // //   })
  // function deleteMissionAsync(missionId) {
  //   return chai.request(BASE_URL)
  //    .delete(`/middleman/banks/${ALGEBRA_BANK_ID}/missions/${missionId}`)
  //    .then((res) => {
  //     //  console.log('delete res', res.text)
  //      return res.text ? JSON.parse(res.text) : null;
  //    });
  // }
  //
  // function deleteAuthzAsync(student) {
  //   return chai.request(BASE_URL)
  //    .delete(`/middleman/banks/${ALGEBRA_BANK_ID}/missions/${missionId}`)
  //    .then((res) => {
  //     //  console.log('delete res', res.text)
  //      return res.text ? JSON.parse(res.text) : null;
  //    });
  // }
  //
  // function cleanUpPromise(student) {
  //   console.log('cleaning up for', student);
  //
  //   return chai.request(BASE_URL)
  //   .get(`/middleman/banks/${ALGEBRA_BANK_ID}/missions`)
  //   .set('x-fbw-username', student.agentId)
  //   .then( (res) => {
  //     res.should.have.status(200);
  //
  //     let result = JSON.parse(res.text);
  //     let phaseIIs = _.filter(result, mission => mission.displayName.text.indexOf('Phase II') > -1 || mission.offereds.length == 0);
  //     // console.log('all missions', result);
  //     // console.log(result[0].displayName);
  //
  //     // console.log('missions to be deleted', _.map(phaseIIs, 'displayName.text'));
  //
  //     // need to delete the bank
  //     // need to delete the bank hierarchy
  //     return Q.all(_.map(phaseIIs, mission => deleteMissionAsync(mission.id)))
  //   })
  //   .then( res => res)
  //   .catch( err => err);
  // }
  //
  // // clean up all the newly-created authorizations, banks, and missions
  // after( function(done) {
  //   this.timeout(20000);
  //
  //   Q.all(cleanUpPromise(UNIQUE_USERNAME))
  //   .then( res => {
  //     console.log('cleaned up for all newly created students', res.text);
  //
  //     done();
  //   })
  // })
})
