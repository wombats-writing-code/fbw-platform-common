import reducer from '../index'
import {RECEIVE_AUTHENTICATE_D2L} from '../../Login/authenticateD2L'

let chai = require('chai');
let should = require('should');
chai.should();

describe('subject reducer', () => {

  it('should update the enrolled banks in Subject upon RECEIVE_AUTHENTICATE_D2L', () => {
    let mockBank = {department: 'Sandbox', id: "assessment.Bank%3A58498ccb71e482e47e0ed8ce%40bazzim.MIT.EDU"};
    let newState = reducer({}, {
      type: RECEIVE_AUTHENTICATE_D2L,
      data: {
        banks: [mockBank]
      }
    });

    newState.enrolledBankIds.should.be.eql([mockBank.id]);
  })

})
