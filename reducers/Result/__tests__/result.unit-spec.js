import reducer from '../index'

let chai = require('chai');
let should = require('should');
chai.should();

import {GET_RESULTS_OPTIMISTIC, RECEIVE_RESULTS} from '../getResults'
import {SELECT_STUDENT_RESULT} from '../../Mission/selectStudentResult'
import {CREATE_MISSION_OPTIMISTIC} from '../../edit-mission/createMission'

describe('result reducer', () => {

  it('should update results and progress in state upon RECEIVE_RESULTS results', () => {
    let newState = reducer({}, {
      type: RECEIVE_RESULTS,
      results: [
        {name: 'baz', mission: '1'},
        {name: 'foo', mission: '1'},
      ]
    });
    
    newState.resultsByMission['1'][0].name.should.be.eql('baz');
    newState.resultsByMission['1'][1].name.should.be.eql('foo');
    newState.isGetResultsInProgress.should.be.eql(false);
  })

  it('should update the current result state upon SELECT_STUDENT_RESULT', () => {
    let newState = reducer({}, {
      type: SELECT_STUDENT_RESULT,
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

})
