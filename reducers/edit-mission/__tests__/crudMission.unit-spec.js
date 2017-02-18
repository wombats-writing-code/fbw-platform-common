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

import {createMission} from '../createMission'
import {deleteMission} from '../deleteMission'
// import {updateMission} from '../updateMission'

describe('createMission, deleteMission actions', () => {

  let testMission;
  it('should create a mission upon calling createMission', done => {
    const store = mockStore({})
    let mission = {
      displayName: 'front end test foo',
      type:  'PHASE_I_MISSION_TYPE',
      startTime: moment(),
      deadline: moment().add(7, 'd'),
      goals: [1, 2, 3]
    }

    let course = {
      _id: 'bar',
      Id: 'baz'
    }

    store.dispatch(createMission(mission, course))
    .then((res) => {
      let actions = store.getActions();
      actions.length.should.eql(2);
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

    store.dispatch(deleteMission(testMission))
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
