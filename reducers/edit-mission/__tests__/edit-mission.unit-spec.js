import _ from 'lodash'

import reducer from '../index'
import {ADD_MISSION} from '../addMission'
import {RECEIVE_CREATE_MISSION} from '../createMission'

let chai = require('chai');
let should = require('should');
chai.should();

describe('edit-mission reducer', () => {

  it('should reduce the ADD_MISSION action', () => {
    let newState = reducer([], {
      type: ADD_MISSION,
    });

    newState.newMission.selectedDirectives.should.eql([]);
  })

  it('should reduce the RECEIVE_CREATE_MISSION action', () => {
    let newState = reducer({}, {
      type: RECEIVE_CREATE_MISSION,
      mission: {
        name: 'foo'
      }
    });

    newState.missions.length.should.eql(1);
    newState.currentMission.name.should.be.eql('foo')
  })
})
