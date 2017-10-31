let should = require('should');
const _ = require('lodash')
const Q = require('q')
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
import nock from 'nock'

import reducer from '../index'

import {selectOpenMission, CREATE_TAKE_MISSION_OPTIMISTIC, RECEIVE_CREATE_TAKE_MISSION} from '../selectOpenMission'

describe('selectOpenMission', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('should call selectOpenMission and receive a mission with array of array of array of questions', function(done) {
      nock('http://localhost:8888')
      .post(`/l4/missions/58a302bcf36d2837a7c8042e`)
      .reply(200, {
        _id: '58a302bcf36d2837a7c8042e',
        goals: ['1', '2'],
        questions: [['bar'], ['foo']],
      });

    const store = mockStore({});

    store.dispatch(selectOpenMission({
      user: {
        Identifier: 1145645,     // shea butter
        token: '123'
      },
      mission: {
        _id: '58a302bcf36d2837a7c8042e'
      },
      course: {
        Id: '1744153'
      }
    }))
    .then(res => {
      let mission = res;
      let actions = store.getActions();
      actions[0].type.should.eql(CREATE_TAKE_MISSION_OPTIMISTIC);
      actions[1].type.should.eql(RECEIVE_CREATE_TAKE_MISSION);
      actions[1].mission._id.should.eql('58a302bcf36d2837a7c8042e');

      // console.log('res', res);
      // console.log('selectOpenMission.unit-spec', mission);
      // console.log('selectOpenMission.unit-spec questions[0][0][0]', mission.questions[0][0][0]);

      mission._id.should.be.eql('58a302bcf36d2837a7c8042e');
      mission.goals.length.should.be.eql(2);
      mission.questions.length.should.be.eql(2);

      done();
    });
  });

})
