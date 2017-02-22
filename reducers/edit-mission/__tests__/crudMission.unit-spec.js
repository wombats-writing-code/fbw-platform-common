import _ from 'lodash'
import moment from 'moment'
import Q from 'q'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

import nock from 'nock'
let chai = require('chai');
const chaiHttp = require('chai-http');

let should = require('should');
chai.should();
chai.use(chaiHttp);

import {
  createMission, CREATE_MISSION_OPTIMISTIC, RECEIVE_CREATE_MISSION,
  createMissions, CREATE_MISSIONS_OPTIMISTIC, RECEIVE_CREATE_MISSIONS
} from '../createMission'
import {deleteMission} from '../deleteMission'
import {missionConfig} from '../../Mission'
// import {updateMission} from '../updateMission'


let user = {
  Identifier: 1145644
}

describe('createMission, deleteMission actions', () => {

  afterEach(() => {
    nock.cleanAll()
  })

  let testMission;
  it('should create a phase 1 mission upon calling createMission', done => {
    const store = mockStore({})
    let mission = {
      displayName: 'platform unit test',
      type:  missionConfig.PHASE_I_MISSION_TYPE,
      startTime: moment(),
      deadline: moment().add(7, 'd'),
      goals: [1, 2, 3]
    };

    let course = {
      Id: "1724986"
    }

    store.dispatch(createMission(mission, course, user))
    .then((res) => {
      let actions = store.getActions();
      actions.length.should.eql(2)
      actions[0].type.should.eql(CREATE_MISSION_OPTIMISTIC)
      actions[1].type.should.eql(RECEIVE_CREATE_MISSION)
      actions[1].mission.displayName.should.eql('platform unit test');

      testMission = actions[1].mission;
      testMission.id = actions[1].mission._id;

      done();
    })
    .catch((err) => {
      console.log(err);
      done()
    });
  });

  let phase2Missions;
  it('should create an array of phase 2 missions upon calling createMissions', done => {
    nock('http://localhost:8888')
    .post(`/l4/missions/`)
    .reply(200, { body: {missions: ['mission1'] }})

    nock('http://localhost:8888')
    .post(`/l4/missions/`)
    .reply(200, { body: {missions: ['mission2'] }})

    const store = mockStore({})
    let missions = [
      {
        displayName: 'crud phase 2 platform unit test',
        description: 'for nutter',
        type:  missionConfig.PHASE_II_MISSION_TYPE,
        startTime: moment(),
        deadline: moment().add(7, 'd'),
        goals: [1, 2],
        userId: 1145644     // nutter butter
      },
      {
        displayName: 'crud phase 2 platform unit test',
        description: 'for shea',
        type:  missionConfig.PHASE_II_MISSION_TYPE,
        startTime: moment(),
        deadline: moment().add(7, 'd'),
        goals: [1],
        userId: 1145645     // nutter butter
      }
    ];

    let course = {
      Id: "1724986"
    }

    store.dispatch(createMissions(missions, course, user))
    .then((res) => {
      let actions = store.getActions();
      actions.length.should.eql(2)
      actions[0].type.should.eql(CREATE_MISSIONS_OPTIMISTIC)
      actions[1].type.should.eql(RECEIVE_CREATE_MISSIONS)
      actions[1].missions.length.should.eql(missions.length);

      phase2Missions = actions[1].missions;

      done();
    })
    .catch((err) => {
      console.log(err);
      done()
    });
  });

  it('should delete a mission upon calling deleteMission', done => {
    const store = mockStore({})
    // console.log('testMission', testMission);

    store.dispatch(deleteMission(testMission, user))
    .then((res) => {
      let actions = store.getActions();
      actions.length.should.eql(2);
      actions[1].mission.displayName.should.eql('platform unit test');

      done();
    })
    .catch((err) => {
      console.log(err);
      done()
    });
  });

});
