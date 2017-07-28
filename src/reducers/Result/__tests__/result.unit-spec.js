let chai = require('chai');
let should = require('should');
chai.should();

import reducer from '../index'

import {GET_RESULTS_OPTIMISTIC, RECEIVE_RESULTS} from '../getResults'
import {GET_STUDENT_RESULT_SUCCESS} from '../getStudentResult'
import {CREATE_MISSION_OPTIMISTIC, RECEIVE_DELETE_MISSION} from '../../edit-mission/createMission'

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

  it('should update the current result state upon GET_STUDENT_RESULT', () => {
    let newState = reducer({}, {
      type: GET_STUDENT_RESULT_SUCCESS,
      student: 'batman',
      mission: {displayName: 'foo'},
      questions: [1, 2]
    });

    newState.currentStudent.should.eql('batman');
    newState.currentMission.displayName.should.eql('foo');
    newState.currentMission.questions.should.eql([1,2]);
    newState.isGetStudentResultInProgress.should.eql(false);
  });

  it('should update the dictionary of results state upon RECEIVE_DELETE_MISSION', () => {
    let newState = reducer({
      resultsByMission: {
        foo: ['1', '2', '3'],
        bar: ['another', 'series', 'of', 'records']
      }
    }, {
      type: RECEIVE_DELETE_MISSION,
      mission: {id: 'foo'},
    });

    should.not.exist(newState.resultsByMission['foo']);
    newState.resultsByMission['bar'].should.eql(['another', 'series', 'of', 'records'])
  });

})
