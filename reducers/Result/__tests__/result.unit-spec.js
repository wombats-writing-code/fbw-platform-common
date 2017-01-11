import reducer from '../index'

let chai = require('chai');
let should = require('should');
chai.should();

import {RECEIVE_PHASE_I_RESULTS} from '../getPhaseIResults'
import {RECEIVE_PHASE_II_RESULTS} from '../getPhaseIIResults'

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
  })

})
