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

describe('selectOpenMission', () => {
  it('should call selectOpenMission and receive a mission with array of array of array of questions', function(done) {
    const store = mockStore({});

    store.dispatch(selectOpenMission({
      user: {
        Identifier: 1145645     // shea butter
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
      // console.log('res', res);
      // console.log('selectOpenMission.unit-spec', mission);
      // console.log('selectOpenMission.unit-spec questions[0][0][0]', mission.questions[0][0][0]);

      mission._id.should.be.eql('58a302bcf36d2837a7c8042e');
      mission.goals.length.should.be.eql(2);
      mission.questions.length.should.be.eql(2);
      mission.questions[0][0][0].choices.should.be.a('array');

      done();
    });
  });

})
