import reducer from '../index'

let chai = require('chai');
let should = require('should');
chai.should();

import {RECEIVE_BANKS} from '../getBanks'
import {RECEIVE_AUTHENTICATE_D2L} from '../../Login/authenticateD2L'
import {LOG_OUT} from '../../Login/logOutUser'

const mockBanks = require('./banks.mock.json')

describe('Bank reducer', () => {

  it('should update the banks upon RECEIVE_AUTHENTICATE_D2L', () => {
    let mockBank = {department: 'Sandbox', id: "assessment.Bank%3A58498ccb71e482e47e0ed8ce%40bazzim.MIT.EDU"};
    let newState = reducer({}, {
      type: RECEIVE_AUTHENTICATE_D2L,
      data: {
        banks: [mockBank]
      }
    });

    newState.banks.should.be.eql([mockBank]);
  });

  it('should clear everything in bank state upon LOG_OUT', () => {
    let newState = reducer({
      banks: ['superman'],
      privateBankId: 'lexluther',
      getPrivateBankIdInProgress: false
    }, {
      type: LOG_OUT
    });

    should.not.exist(newState.banks);
    should.not.exist(newState.privateBankId);
    newState.getPrivateBankIdInProgress.should.eql(false);
  })

})
