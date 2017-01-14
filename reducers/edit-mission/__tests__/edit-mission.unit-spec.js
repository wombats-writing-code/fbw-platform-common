import _ from 'lodash'
import moment from 'moment'
import reducer from '../index'
import {ADD_MISSION} from '../addMission'
import {RECEIVE_CREATE_MISSION} from '../createMission'

import {UPDATE_SPAWN_DATE} from '../updateSpawnDate'

let chai = require('chai');
let should = require('should');
chai.should();

describe('edit-mission reducer', () => {

  it('should update the state upon the ADD_MISSION action', () => {
    let newState = reducer({}, {
      type: ADD_MISSION,
    });

    newState.newMission.selectedDirectives.should.eql([]);
  });

  it('should update the state upon the UPDATE_SPAWN_DATE action', () => {
    let newState = reducer({}, {
      type: UPDATE_SPAWN_DATE,
      data: {
        startDate: moment.now(),
        endDate: moment().add(7, 'd')
      }
    });

    newState.spawnDate.startTime.should.be.a('object')
    newState.spawnDate.deadline.should.be.a('object')

  });
})
