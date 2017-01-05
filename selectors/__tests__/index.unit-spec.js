
let chai = require('chai');
let path = require('path')
chai.should();

import {getUser, getD2LToken,
        getMapping,
        getPhaseIResults, getPhaseIIResults
} from '../index'

describe('selectors', () => {

  it('should get the user from state', () => {
    const mockUser =   {
      displayName: 'Darth Vader',
      isVisitor: true,
      username: '',
      d2l: null
    };

    let user = getUser({
      login: {
        user: mockUser
      }
    });
    user.should.be.eql(mockUser)
  });

  it('should get the d2lToken from state', () => {
    const mockUser =   {
      displayName: 'Darth Vader',
      isVisitor: true,
      username: '',
      d2l: {
        authenticatedUrl: 'foobarbaz'
      }
    };

    let result = getD2LToken({login: {user: mockUser}});
    result.should.be.eql('foobarbaz')
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
  it('should get phase I and phase II from state', () => {
    const mockState =   {
      result: {
        phaseIResults: [],
        phaseIIResults: [],
      }
    };

    let phaseIResults = getPhaseIResults(mockState);
    let phaseIIResults = getPhaseIIResults(mockState)
    phaseIResults.should.be.a('array');
    phaseIIResults.should.be.a('array');
  });

})
