let chai = require('chai');
let path = require('path')
chai.should();

import {agentDisplayName, agentIdFromTakingAgentId} from '../login/index'

describe('login selectors', () => {

  it('should get the agentDisplayName', () => {
    let result = agentDisplayName("osid.agent.Agent%3ADARTH_VADER%2540fbw-visitor.edu%40MIT-ODL");
    result.should.be.eql('DARTH_VADER')
  });

  it('should get the agentId', () => {
    let result = agentIdFromTakingAgentId("osid.agent.Agent%3ADARTH_VADER%2540fbw-visitor.edu%40MIT-ODL");
    result.should.be.eql('DARTH_VADER@fbw-visitor.edu')
  });

})
