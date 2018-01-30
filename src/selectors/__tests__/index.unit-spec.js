
let chai = require('chai');
let path = require('path')
chai.should();

import {getUser, getD2LToken,
        getMapping, getResults,
        failedLogIn
} from '../index'

describe('selectors', () => {

  it('should get the d2l user from state', () => {
    let user = getUser({
      login: {
        user: {
          d2lUser: {
            Identifier: 'foo'
          },
          authenticatedUrl: 'bar'
        }
      }
    });

    user.Identifier.should.eql('foo')
  });

  // =====
  // mapping
  // ======
  it('should get the mapping from state', () => {
    let mockState =   {
      mapping: {
        outcomes: [],
        modules: [],
        relationships: []
      }
    };

    let result = getMapping(mockState);
    result.outcomes.should.be.a('array');
    result.modules.should.be.a('array');
    result.relationships.should.be.a('array');
  });

  // =====
  // result
  // ======


  // =====
  // failed log in
  // =====
  it('should return any log in errors from state', () => {
    let mockState =   {
      login: {
        logInError: false
      }
    };

    let result = failedLogIn(mockState);
    result.should.eql(false);

    mockState =   {
      login: {
        logInError: true
      }
    };

    result = failedLogIn(mockState);
    result.should.eql(true);
  });

})
