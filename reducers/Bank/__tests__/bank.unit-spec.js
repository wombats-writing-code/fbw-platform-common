import reducer from '../index'

let chai = require('chai');
let should = require('should');
chai.should();

import {RECEIVE_BANKS} from '../getBanks'


const mockBanks = require('./banks.mock.json')

describe('Bank reducer', () => {

  it('should RECEIVE_BANKS', () => {
    let newState = reducer({}, {
      type: RECEIVE_BANKS,
      banks: mockBanks
    });

    newState.banks.length.should.eql(2);
  })

})
