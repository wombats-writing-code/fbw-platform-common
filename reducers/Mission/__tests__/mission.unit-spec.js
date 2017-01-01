import reducer from '../index'

import {RECEIVE_MISSIONS} from '../getMissions'
import {SELECT_DIRECTIVE} from '../selectDirective'
import {SELECT_TARGET} from '../selectTarget'
import {RECEIVE_CREATE_TAKE_MISSION, CREATE_TAKE_MISSION_OPTIMISTIC} from '../selectOpenMission'

let chai = require('chai');
let should = require('should');
chai.should();

const mockMissions = require('./missions.mock.json')
const mockTarget = require('./target.mock.json')
const mockTakeMission = require('./take-mission.mock.json')

describe('mission reducer', () => {
  it('should RECEIVE_MISSIONS', () => {
    let newState = reducer([], {
      type: RECEIVE_MISSIONS,
      missions: mockMissions
    });

    newState.missions.should.be.deep.equal(mockMissions);
    newState.isGetMissionsInProgress.should.eql(false);
  });

  it('should SELECT_DIRECTIVE', () => {
    let newState = reducer([], {
      type: SELECT_DIRECTIVE,
      directiveIndex: 3
    });

    newState.currentDirectiveIndex.should.eql(3);
    should.not.exist(newState.currentTarget);
    should.not.exist(newState.selectedChoiceId);
  });

  it('should SELECT_TARGET', () => {
    let newState = reducer([], {
      type: SELECT_TARGET,
      target: mockTarget
    });

    newState.currentTarget.should.eql(mockTarget);
    newState.heightByChoice.should.eql({});
    newState.questionListHeight.should.eql(0);
    should.not.exist(newState.selectedChoiceId);
  })

  it('should RECEIVE_CREATE_TAKE_MISSION_OPTIMISTIC with an open mission of 14 sections', () => {
    let newState = reducer([], {
      type: CREATE_TAKE_MISSION_OPTIMISTIC,
      mission: mockTakeMission
    });

    newState.currentMission.should.eql(mockTakeMission);
    newState.resultsExistForUser.should.eql(true);
    newState.isSubmitTakeMissionInProgress.should.eql(true);
    should.not.exist(newState.currentMissionSections);
  });

  it('should RECEIVE_CREATE_TAKE with an open mission of 14 sections', () => {
    let newState = reducer([], {
      type: RECEIVE_CREATE_TAKE_MISSION,
      mission: mockTakeMission
    });

    newState.isSubmitTakeMissionInProgress.should.eql(false);
    newState.currentMissionSections.length.should.eql(mockTakeMission.length);
  });


})
