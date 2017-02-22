import _ from 'lodash'
import moment from 'moment'

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

let chai = require('chai');
const chaiHttp = require('chai-http');

let should = require('should');
chai.should();
chai.use(chaiHttp);

import {createMission, CREATE_MISSION_OPTIMISTIC, RECEIVE_CREATE_MISSION} from '../createMission'
import {deleteMission} from '../deleteMission'
import {PHASE_I_MISSION_TYPE} from '../../Mission'
// import {updateMission} from '../updateMission'


let user = {
  Identifier: 1145644
}

describe('createMission, deleteMission actions', () => {

  let testMission;
  it('should create a phase 1 mission upon calling createMission', done => {
    const store = mockStore({})
    let mission = {
      displayName: 'front end test foo',
      type:  PHASE_I_MISSION_TYPE,
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
      actions[1].mission.displayName.should.eql('front end test foo');

      testMission = actions[1].mission;
      testMission.id = actions[1].mission._id;

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
      actions[1].mission.displayName.should.eql('front end test foo');

      done();
    })
    .catch((err) => {
      console.log(err);
      done()
    });
  });
});
