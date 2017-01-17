let chai = require('chai');
let path = require('path')
chai.should();

import {getEnrolledSubject, findBankDomain, findBankLibrary} from '../bank/index'

describe('bank selectors', () => {

  it('should select the enrolled subject from the banks for visitors', () => {
    let result = getEnrolledSubject({
      bank: {
        currentBank: {id: 'my bank'},
        banks: [{id: 'foo', displayName: 'bar'}]
      },
      login: {
        isVisitor: true,
        isLoggedIn: true
      }
    });

    result.should.be.eql({id: 'my bank'});
  })

  it('should select the enrolled subject from the banks for D2L', () => {
    let result = getEnrolledSubject({
      bank: {
        currentBank: {id: 'my bank'},
        banks: [{id: 'foo', displayName: {text: 'fbw bar'}}]
      },
      login: {
        isVisitor: false,
        isLoggedIn: true
      }
    });
    result.id.should.be.eql('foo');
  })

})
