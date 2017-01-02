import _ from 'lodash'

import reducer from '../index'
import {ADD_MISSION} from '../addMission'

let chai = require('chai');
let should = require('should');
chai.should();

describe('edit-mission reducer', () => {

  it('should create a mission', () => {
    let newState = reducer([], {
      type: ADD_MISSION,
    });

    newState.newMission.selectedDirectives.should.eql([]);
  })
})
