import _ from 'lodash'
import moment from 'moment'
import Q from 'q'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const should = require('should');
import nock from 'nock'


import {
  createMission, CREATE_MISSION_OPTIMISTIC, RECEIVE_CREATE_MISSION,
  createMissions, CREATE_MISSIONS_OPTIMISTIC, RECEIVE_CREATE_MISSIONS
} from '../createMission'
import {
  updateMission, UPDATE_MISSION_OPTIMISTIC, RECEIVE_UPDATE_MISSION,
  updateMissions, UPDATE_MISSIONS_OPTIMISTIC, RECEIVE_UPDATE_MISSIONS
} from '../updateMission'
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

    nock('http://localhost:8888')
    .post(`/l4/missions/`)
    .reply(200, mission)


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

  it('should update a mission upon calling updateMission', done => {
    const store = mockStore({})
    let mission = {
      id: '12345678',
      displayName: 'updated platform unit test',
      type:  missionConfig.PHASE_I_MISSION_TYPE,
      startTime: moment(),
      deadline: moment().add(7, 'd'),
      goals: [1, 2, 3]
    };

    let course = {
      Id: "1724986"
    }

    nock('http://localhost:8888')
    .put(`/l4/missions/12345678/`)
    .reply(200, mission)


    store.dispatch(updateMission(mission, user))
    .then((res) => {
      let actions = store.getActions();
      actions.length.should.eql(2)
      actions[0].type.should.eql(UPDATE_MISSION_OPTIMISTIC)
      actions[1].type.should.eql(RECEIVE_UPDATE_MISSION)
      actions[1].mission.displayName.should.eql('updated platform unit test');

      done();
    })
    .catch((err) => {
      console.log(err);
      done()
    });
  })

  let phase2Missions;
  it('should create an array of phase 2 missions upon calling createMissions', done => {
    nock('http://localhost:8888')
    .post(`/l4/missions-bulk/`)
    .reply(200, ['mission1', 'mission2'])

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

  it(`should update the newly-created phase II missions`, done => {
    let missions = [
      {name: 'foo'},
      {name: 'bar'}
    ];

    nock('http://localhost:8888')
    .post(`/l4/missions-bulk/`)
    .reply(200, missions)

    const store = mockStore({})

    store.dispatch(updateMissions(missions, user))
    .then((res) => {
      let actions = store.getActions();
      actions.length.should.eql(2)
      actions[0].type.should.eql(UPDATE_MISSIONS_OPTIMISTIC)
      actions[1].type.should.eql(RECEIVE_UPDATE_MISSIONS)
      actions[1].missions.length.should.eql(missions.length);

      done();
    })
    .catch((err) => {
      console.log(err);
      done()
    });
  })

  it('should delete a mission upon calling deleteMission', done => {
    let mission = {id: 'bar'}

    nock('http://localhost:8888')
    .delete(`/l4/missions/bar`)
    .reply(200, mission)

    const store = mockStore({})

    store.dispatch(deleteMission(mission, user))
    .then((res) => {
      let actions = store.getActions();
      actions.length.should.eql(2);
      actions[1].mission.id.should.eql('bar');

      done();
    })
    .catch((err) => {
      console.log(err);
      done()
    });
  });

});
