let chai = require('chai');
let should = require('should');
chai.should();
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

const _ = require('lodash')
const Q = require('q')

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
// import nock from 'nock'

import reducer from '../index'

import {selectOpenMission} from '../selectOpenMission'

describe('getMission', () => {
  it('should call selectOpenMission and receive a mission with just the Targets for Nutter Butter', function(done) {
    const store = mockStore({});

    store.dispatch(selectOpenMission({
      username: 'Nutter-Butter-1145644@acc.edu',
      mission: {
        _id: '589e4ce9f36d2837a7c67935'
      }
    }))
    .then(res => {
      let mission = res.data;
      // console.log('getMission.unit-spec', mission);
      console.log('getMission.unit-spec questions[0]', mission.questions[0]);

      mission._id.should.be.eql('589e4ce9f36d2837a7c67935');
      mission.goals.length.should.be.eql(3);
      mission.questions.length.should.be.eql(1);
      mission.questions[0].response.should.be.a('object');

      done();
    });
  });

})
