let chai = require('chai');
let path = require('path')
chai.should();

import {getEnrolledSubject, findBankDomain, findBankLibrary} from '../bank/index'

describe('bank selectors', () => {

  it('should select the enrolled subject from the banks', () => {
    let result = getEnrolledSubject({
      bank: {
        banks: [{id: 'foo', displayName: 'bar'}]
      }
    });

    result.should.be.eql({id: 'foo', displayName: 'bar'});
  })

  it('should find the bank libarary');

})
