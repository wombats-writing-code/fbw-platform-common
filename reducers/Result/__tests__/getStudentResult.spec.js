
let chai = require('chai');
let should = require('should');
chai.should();
chai.should();

const _ = require('lodash')
const Q = require('q')
const nock = require('nock')

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

import {getStudentResult, GET_STUDENT_RESULT_OPTIMISTIC, GET_STUDENT_RESULT_SUCCESS} from '../getStudentResult'

describe('getResults', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should call getResults and receive a list of records for a user', function(done) {
    const USER = {
      Identifier: 1145645     // shea butter
    }

    const MISSION = {
      id: 'fooMission'
    }

    nock('http://localhost:8888')
    .get(`/l4/results?missionId=${MISSION.id}&reconstruction=true&userId=${USER.Identifier}`)
    .reply(200, ['1', '2'])

    const store = mockStore({})

    store.dispatch(getStudentResult({
      student: USER,
      mission: MISSION,
      user: USER
    }))
    .then(res => {
      // console.log('getResults res', res);

      let actions = store.getActions();
      actions.length.should.eql(2);
      actions[0].type.should.eql(GET_STUDENT_RESULT_OPTIMISTIC);
      actions[0].student.should.eql(USER);
      actions[0].mission.should.eql(MISSION);

      actions[1].type.should.eql(GET_STUDENT_RESULT_SUCCESS);
      actions[1].student.should.eql(USER);
      actions[1].mission.should.eql(MISSION);
      actions[1].questions.should.eql(['1', '2'])

      done();
    });
  })
})
