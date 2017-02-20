
let chai = require('chai');
let path = require('path')
chai.should();

import {getUser, getD2LToken,
        getMapping, getResults
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
    const mockState =   {
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


})
