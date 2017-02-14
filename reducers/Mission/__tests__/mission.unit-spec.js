import reducer from '../index'

let chai = require('chai');
let should = require('should');
chai.should();
const chaiHttp = require('chai-http');
chai.should();

const _ = require('lodash')

import {RECEIVE_MISSIONS} from '../getMissions'
import {SELECT_DIRECTIVE} from '../selectDirective'
import {SELECT_TARGET} from '../selectTarget'
import {SELECT_MISSION_RESULT} from '../selectMissionResult'
import {RECEIVE_SUBMIT_RESPONSE} from '../submitResponse'
import {RECEIVE_CREATE_TAKE_MISSION, CREATE_TAKE_MISSION_OPTIMISTIC} from '../selectOpenMission'

import {RECEIVE_CREATE_MISSION} from '../../edit-mission/createMission'
import {RECEIVE_DELETE_MISSION} from '../../edit-mission/deleteMission'
import {LOG_OUT} from '../../Login/logOutUser'

const mockMissions = require('./missions.mock.json')
const mockTarget = require('./target.mock.json')
const mockTakeMission = require('./take-mission.mock.json')
const mockReceiveTakeMission = require('./receive-take-mission.mock.json')

describe('mission reducer', () => {
  it('should update the missions in state upon RECEIVE_MISSIONS', () => {
    let newState = reducer([], {
      type: RECEIVE_MISSIONS,
      missions: mockMissions
    });

    newState.missions.should.be.deep.equal(mockMissions);
    newState.isGetMissionsInProgress.should.eql(false);
  });

  it('should update the selected currentDirectiveIndex in state upon SELECT_DIRECTIVE', () => {
    let newState = reducer([], {
      type: SELECT_DIRECTIVE,
      directiveIndex: 3
    });

    newState.currentDirectiveIndex.should.eql(3);
    should.not.exist(newState.currentTarget);
    should.not.exist(newState.selectedChoiceId);
  });

  it('should update the selected currentTarget in state upon SELECT_TARGET', () => {
    let newState = reducer([], {
      type: SELECT_TARGET,
      target: mockTarget
    });

    newState.currentTarget.should.eql(mockTarget);
    newState.heightByChoice.should.eql({});
    newState.questionListHeight.should.eql(0);
    should.not.exist(newState.selectedChoiceId);
  })

  it('should optimistically update state upon RECEIVE_CREATE_TAKE_MISSION_OPTIMISTIC', () => {
    let newState = reducer([], {
      type: CREATE_TAKE_MISSION_OPTIMISTIC,
      mission: mockTakeMission
    });

    newState.currentMission.should.eql(mockTakeMission);
    newState.isGetMissionInProgress.should.eql(true);
  });

  it('should update state upon RECEIVE_CREATE_TAKE_MISSION', () => {
    let newState = reducer([], {
      type: RECEIVE_CREATE_TAKE_MISSION,
      mission: mockReceiveTakeMission
    });

    newState.currentMission.should.eql(mockReceiveTakeMission)
    newState.isGetMissionInProgress.should.eql(false);
  });

  it('should update the questions in state upon RECEIVE_SUBMIT_RESPONSE', () => {
    let newState = reducer({
      currentMission: {
        questions: [
          // section 1
          [
            [{id: '0'}]
          ],
          // section 2
          [
            [{id: '12'}, {id: '1'}],    // the first target route
            [{id: '9'}, {id: '3'}],    // the 2nd target route
          ]
        ]
      }
    }, {
      type: RECEIVE_SUBMIT_RESPONSE,
      responseResult: {
        question: {
          id: '1',
          solution: 'foo',
          feedback: 'bar',
          isCorrect: false
        }
      }
    });

    // console.log('new state questions[1][0][1]', newState.currentMission.questions[1][0][1])

    newState.currentMission.questions[1][0][1].solution.should.eql('foo');
    newState.currentMission.questions[1][0][1].feedback.should.eql('bar');
    newState.currentMission.questions[1][0][1].responded.should.eql(true);
    newState.currentMission.questions[1][0][1].isCorrect.should.eql(false);
  })

  it('should update missions in state upon RECEIVE_DELETE_MISSION', () => {
    let newState = reducer({
      missions: [
        {id: 'foo'},
        {id: 'bar'}
      ]
    }, {
      type: RECEIVE_DELETE_MISSION,
      mission: {
        id: 'foo'
      }
    });

    newState.missions.length.should.eql(1);
    newState.missions[0].id.should.be.eql('bar')
  });

  it('should update state upon SELECT_MISSION_RESULT', () => {
    let newState = reducer({}, {
      type: SELECT_MISSION_RESULT,
      missionResult: {
        sections: [
          {name: 'foo', questions: [
            {id: 'superman'}
          ]},
          {name: 'bar'}
        ]
      },
      currentDirectiveIndex: 1,
      question: {id: 'superman'}
    });

    newState.currentMissionSections.length.should.eql(2);
    newState.currentDirectiveIndex.should.eql(1);
    newState.currentTarget.id.should.eql('superman')
  });

  it('should update state upon RECEIVE_CREATE_MISSION action', () => {
    let newState = reducer({}, {
      type: RECEIVE_CREATE_MISSION,
      mission: {
        name: 'foo'
      }
    });

    newState.missions.length.should.eql(1);
    newState.currentMission.name.should.be.eql('foo');
  })

  it('should clear everything in this part of mission state upon LOG_OUT', () => {
    let newState = reducer({
      missions: [],
      currentMission: {name: 'foo'},
      isGetMissionsInProgress: true
    }, {
      type: LOG_OUT
    });

    should.not.exist(newState.missions);
    should.not.exist(newState.currentMission);
    newState.isGetMissionsInProgress.should.eql(false);
  })
})
