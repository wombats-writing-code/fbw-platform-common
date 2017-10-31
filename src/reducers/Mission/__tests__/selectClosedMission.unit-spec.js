let should = require('should');
const _ = require('lodash')
const Q = require('q')
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
import nock from 'nock'

import reducer from '../index'

import {selectClosedMission, RECEIVE_CLOSED_MISSION, GET_CLOSED_MISSION_OPTIMISTIC} from '../selectClosedMission'

describe('selectClosedMission', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should call selectClosedMission and receive a mission with array of array of array of questions', function(done) {
    let missionId = '58a302bcf36d2837a7c8042e';
    let userId = 'darth-vader'

    nock('http://localhost:8888')
    .get(`/l4/results?missionId=${missionId}&userId=${userId}&reconstruction=true`)
    .reply(200, [['bar'], ['foo']]);

    const store = mockStore({});

    store.dispatch(selectClosedMission({
      user: {
        Identifier: userId,
        token: 'foo'
      },
      mission: {
        _id: missionId
      }
    }))
    .then(res => {
      let mission = res;
      let actions = store.getActions();
      actions[0].type.should.eql(GET_CLOSED_MISSION_OPTIMISTIC);
      actions[1].type.should.eql(RECEIVE_CLOSED_MISSION);
      actions[1].mission._id.should.eql(missionId);
      actions[1].questions.length.should.eql(2);

      // console.log('res', res);
      // console.log('selectClosedMission.unit-spec', mission);
      // console.log('selectClosedMission.unit-spec questions[0][0][0]', mission.questions[0][0][0]);

      done();
    });
  });

})
