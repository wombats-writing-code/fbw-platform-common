import reducer from '../index'

let chai = require('chai');
let should = require('should');
chai.should();

import {RECEIVE_BANKS} from '../getBanks'
import {RECEIVE_AUTHENTICATE_D2L} from '../../Login/authenticateD2L'

const mockBanks = require('./banks.mock.json')

describe('Bank reducer', () => {

  it('should RECEIVE_BANKS', () => {
    let newState = reducer({}, {
      type: RECEIVE_BANKS,
      banks: mockBanks
    });

    newState.banks.length.should.eql(2);
  });

  it('should update the enrolled banks upon RECEIVE_AUTHENTICATE_D2L', () => {
    let mockBank = {department: 'Sandbox', id: "assessment.Bank%3A58498ccb71e482e47e0ed8ce%40bazzim.MIT.EDU"};
    let newState = reducer({}, {
      type: RECEIVE_AUTHENTICATE_D2L,
      data: {
        banks: [mockBank]
      }
    });

    newState.enrolledBanks.should.be.eql([mockBank]);
  })

})
