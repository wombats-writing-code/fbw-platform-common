import reducer, {missionConfig} from '../index'

let chai = require('chai');
let should = require('should');
chai.should();

const _ = require('lodash')

import {RECEIVE_MISSIONS} from '../getMissions'
import {SELECT_DIRECTIVE} from '../selectDirective'
import {SELECT_TARGET} from '../selectTarget'
import {RECEIVE_SUBMIT_RESPONSE} from '../submitResponse'
import {RECEIVE_CREATE_TAKE_MISSION, CREATE_TAKE_MISSION_OPTIMISTIC} from '../selectOpenMission'
import {RECEIVE_CLOSED_MISSION, GET_CLOSED_MISSION_OPTIMISTIC} from '../selectClosedMission'

import {RECEIVE_UPDATE_MISSION, RECEIVE_UPDATE_MISSIONS} from '../../edit-mission/updateMission'
import {RECEIVE_CREATE_MISSION, RECEIVE_CREATE_MISSIONS} from '../../edit-mission/createMission'
import {RECEIVE_DELETE_MISSION} from '../../edit-mission/deleteMission'
import {LOG_OUT} from '../../Login/logOutUser'

import {GET_STUDENT_RESULT_SUCCESS} from '../../Result/getStudentResult'
import {RESET_DASHBOARD_MISSION} from '../resetDashboardMission'


describe('mission reducer', () => {
  it('should update the missions in state upon RECEIVE_MISSIONS', () => {
    let newState = reducer([], {
      type: RECEIVE_MISSIONS,
      missions: ['foo', 'bar']
    });

    newState.missions.should.eql(['foo', 'bar']);
    newState.isGetMissionsInProgress.should.eql(false);
  });

  it('should update the selected currentDirectiveIndex in state upon SELECT_DIRECTIVE', () => {
    let newState = reducer([], {
      type: SELECT_DIRECTIVE,
      directiveIndex: 3,
    });

    newState.currentDirectiveIndex.should.eql(3);
    // should.not.exist(newState.currentTarget);
    should.not.exist(newState.selectedChoiceId);
  });

  it('should update the selected currentTarget in state upon SELECT_TARGET', () => {
    let target = {name: 'foo'};
    let newState = reducer([], {
      type: SELECT_TARGET,
      target: target
    });

    newState.currentTarget.should.eql(target);
    should.not.exist(newState.selectedChoiceId);
  })

  it('should optimistically update state upon RECEIVE_CREATE_TAKE_MISSION_OPTIMISTIC', () => {
    let newState = reducer([], {
      type: CREATE_TAKE_MISSION_OPTIMISTIC,
      mission: {name: 'baz'}
    });

    newState.currentMission.should.eql({name: 'baz'});
    newState.isGetMissionInProgress.should.eql(true);
  });

  it('should update state upon RECEIVE_CREATE_TAKE_MISSION', () => {
    let newState = reducer([], {
      type: RECEIVE_CREATE_TAKE_MISSION,
      mission: {
        name: 'superman',
        questions: [
          [
            ['foo']
          ]
        ]
      }
    });

    newState.currentMission.name.should.eql('superman')
    newState.currentTarget.should.eql('foo')
    newState.isGetMissionInProgress.should.eql(false);
  });

  it('should update state upon RECEIVE_CLOSED_MISSION', () => {
    let newState = reducer([], {
      type: RECEIVE_CLOSED_MISSION,
      mission: {
        name: 'superman',
      },
      questions: [
        [
          ['foo']
        ]
      ]
    });

    newState.currentMission.name.should.eql('superman')
    newState.currentDirectiveIndex.should.eql(0)
    newState.currentTarget.should.eql('foo')
    newState.isGetMissionInProgress.should.eql(false);
  });

  it('should update the questions in state upon RECEIVE_SUBMIT_RESPONSE', () => {
    let newState = reducer({
      currentMission: {
        questions: [
          // section 1
          [
            [{instanceId: '0'}]
          ],
          // section 2
          [
            [{instanceId: '12'}, {instanceId: '1'}],    // the first target route
            [{instanceId: '9'}, {instanceId: '3'}],    // the 2nd target route
          ]
        ]
      }
    }, {
      type: RECEIVE_SUBMIT_RESPONSE,
      responseResult: {
        question: {
          instanceId: '1',
          solution: 'foo',
          feedback: 'bar',
          response: {
            isCorrect: false,
            choice: {
              id: 'foo'
            }
          }
        }
      }
    });

    // console.log('new state questions[1][0][1]', newState.currentMission.questions[1][0][1])

    newState.currentMission.questions[1][0][1].solution.should.eql('foo');
    newState.currentMission.questions[1][0][1].feedback.should.eql('bar');
    newState.currentMission.questions[1][0][1].responded.should.eql(true);
    newState.currentMission.questions[1][0][1].response.isCorrect.should.eql(false);
    newState.currentMission.questions[1][0][1].response.choice.should.be.a('object');

  })

  it('should update missions in state upon RECEIVE_DELETE_MISSION', () => {
    let newState = reducer({
      missions: [
        { id: 'foo'},
        {
          id: 'bar',
          leadsToMissions: ['foo']
        }
      ],
      currentMission: {
        id: 'superman',
        leadsToMissions: ['foo', 'bar']
      }
    }, {
      type: RECEIVE_DELETE_MISSION,
      mission: {
        id: 'foo'
      }
    });

    newState.missions.length.should.eql(1);
    newState.missions[0].id.should.be.eql('bar');
    newState.missions[0].leadsToMissions.should.eql([])
    newState.currentMission.leadsToMissions.should.eql(['bar'])
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

  it('should update state upon RECEIVE_CREATE_MISSIONS action', () => {
    let newState = reducer({
      missions: [
        {id: '1'},
        {id: '2'}
      ]
    }, {
      type: RECEIVE_CREATE_MISSIONS,
      missions: [
        { id: 'foo', followsFromMissions: ['1', '2'] },
        {id: 'baz', followsFromMissions: ['1', '2']},
        { id: 'bar', followsFromMissions: ['1', '2'] }
      ]
    });

    _.find(newState.missions, {id: '1'}).leadsToMissions.should.be.eql(['foo', 'baz', 'bar']);
    _.find(newState.missions, {id: '2'}).leadsToMissions.should.be.eql(['foo', 'baz', 'bar']);
    newState.missions.length.should.eql(5);
    newState.currentMission.leadsToMissions.should.be.eql(['foo', 'baz', 'bar']);
  })

  it('should update the current result state upon GET_STUDENT_RESULT_SUCCESS', () => {
    let newState = reducer({}, {
      type: GET_STUDENT_RESULT_SUCCESS,
      student: 'batman',
      mission: {displayName: 'foo'},
      questions: [1, 2]
    });

    newState.currentMission.displayName.should.eql('foo');
    newState.currentMission.questions.should.eql([1,2]);
  });

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
  });

  it('should keep currentMission as phase when call RESET_DASHBOARD_MISSION', () => {
    const originalMission = {
      name: 'foo',
      _id: 123,
      type: missionConfig.PHASE_I_MISSION_TYPE
    };
    let newState = reducer({
      missions: [{
        _id: 321,
        type: missionConfig.PHASE_II_MISSION_TYPE,
        followsFromMissions: [123]
      }, originalMission],
      currentMission: originalMission
    }, {
      type: RESET_DASHBOARD_MISSION,
      mission: originalMission
    });

    newState.currentMission.should.eql(originalMission);
  });

  it('should find the followsFrom phase I on RESET_DASHBOARD_MISSION, when currentMission is phase II', () => {
    const originalMission = {
      name: 'foo',
      _id: 123,
      type: missionConfig.PHASE_I_MISSION_TYPE
    };
    const phaseIIMission = {
      _id: 124,
      type: missionConfig.PHASE_II_MISSION_TYPE,
      followsFromMissions: [123]
    }
    let newState = reducer({
      missions: [{
        _id: 125,
        type: missionConfig.PHASE_I_MISSION_TYPE
      },
      originalMission, phaseIIMission],
      currentMission: phaseIIMission
    }, {
      type: RESET_DASHBOARD_MISSION,
      mission: phaseIIMission
    });

    newState.currentMission.should.eql(originalMission);
  });

  it('should do nothing on RESET_DASHBOARD_MISSION, when currentMission is undefined', () => {
    const originalMission = {
      name: 'foo',
      _id: 123,
      type: missionConfig.PHASE_I_MISSION_TYPE
    };
    const phaseIIMission = {
      _id: 124,
      type: missionConfig.PHASE_II_MISSION_TYPE,
      followsFromMissions: [123]
    }
    let newState = reducer({
      missions: [{
        _id: 125,
        type: missionConfig.PHASE_I_MISSION_TYPE
      },
      originalMission, phaseIIMission],
      currentMission: phaseIIMission
    }, {
      type: RESET_DASHBOARD_MISSION,
      mission: null
    });

    newState.currentMission.should.eql(phaseIIMission);
  });

  it('should update the right mission for RECEIVE_UPDATE_MISSION', () => {
    let newState = reducer({
      missions: [{
        id: 125,
        displayName: 'foo'
      }, {
        id: 1,
        displayName: 'baz'
      }, {
        id: 321,
        displayName: 'zim'
      }]
    }, {
      type: RECEIVE_UPDATE_MISSION,
      mission: {
        id: 125,
        displayName: 'bar'
      }
    });

    newState.missions.length.should.eql(3);
    newState.missions[0].displayName.should.eql('bar');
    newState.missions[1].displayName.should.eql('baz');
    newState.missions[2].displayName.should.eql('zim');
  });

  it('should update all relevant missions for RECEIVE_UPDATE_MISSIONS', () => {
    let newState = reducer({
      missions: [{
        id: 125,
        displayName: 'foo'
      }, {
        id: 1,
        displayName: 'baz'
      }, {
        id: 321,
        displayName: 'zim'
      }]
    }, {
      type: RECEIVE_UPDATE_MISSIONS,
      missions: [{
        id: 125,
        displayName: 'bar'
      }, {
        id: 1,
        displayName: 'bar2'
      }]
    });

    newState.missions.length.should.eql(3);
    newState.missions[0].displayName.should.eql('bar');
    newState.missions[1].displayName.should.eql('bar2');
    newState.missions[2].displayName.should.eql('zim');
  });
})
