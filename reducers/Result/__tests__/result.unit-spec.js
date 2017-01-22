import reducer from '../index'

let chai = require('chai');
let should = require('should');
chai.should();

import {RECEIVE_PHASE_I_RESULTS} from '../getPhaseIResults'
import {RECEIVE_PHASE_II_RESULTS} from '../getPhaseIIResults'
import {SELECT_MISSION_RESULT} from '../../Mission/selectMissionResult'
import {CREATE_MISSION_OPTIMISTIC} from '../../edit-mission/createMission'

describe('result reducer', () => {

  it('should update phaseIResults and progress in state upon RECEIVE_PHASE_I_RESULTS results', () => {
    let newState = reducer({}, {
      type: RECEIVE_PHASE_I_RESULTS,
      results: ['foo', 'bar', 'twee']
    });

    newState.phaseIResults.should.be.eql(['foo', 'bar', 'twee']);
    newState.isGetPhaseIResultsInProgress.should.be.eql(false);
  })

  it('should update phaseIIResults and progress in state upon RECEIVE_PHASE_II_RESULTS results', () => {
    let newState = reducer({}, {
      type: RECEIVE_PHASE_II_RESULTS,
      results: ['superman', 'batman']
    });

    newState.phaseIIResults.should.be.eql(['superman', 'batman']);
    newState.isGetPhaseIIResultsInProgress.should.be.eql(false);
  });

  it('should update the current result state upon SELECT_MISSION_RESULT', () => {
    let newState = reducer({}, {
      type: SELECT_MISSION_RESULT,
      missionResult: {
        takingAgentId: 'batman',
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

    newState.currentResult.takingAgentId.should.eql('batman');
  });

  it('should update the current result state upon CREATE_MISSION_OPTIMISTIC', () => {
    let newState = reducer({}, {
      type: CREATE_MISSION_OPTIMISTIC,
      newMission: 'foo'
    });

    should.not.exist(newState.phaseIResults);
    should.not.exist(newState.phaseIIResults);
  });

})
