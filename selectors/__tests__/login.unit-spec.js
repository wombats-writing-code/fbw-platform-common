let chai = require('chai');
let path = require('path')
chai.should();

import {osidToDisplayName, agentIdFromTakingAgentId, usernameToDisplayName} from '../login/index'

describe('login selectors', () => {

  it('should get the agentDisplayName of DARTH_VADER', () => {
    let result = osidToDisplayName("osid.agent.Agent%3ADARTH_VADER%2540fbw-visitor.edu%40MIT-ODL");
    result.should.be.eql('DARTH_VADER')
  });

  it('should get the agentDisplayName of Nutter Butter', () => {
    let result = osidToDisplayName("osid.agent.Agent%3ANutter-Butter-1145644%2540acc.edu%40MIT-ODL");
    result.should.be.eql('Nutter Butter')
  });

  it('should get the agentId', () => {
    let result = agentIdFromTakingAgentId("osid.agent.Agent%3ADARTH_VADER%2540fbw-visitor.edu%40MIT-ODL");
    result.should.be.eql('DARTH_VADER@fbw-visitor.edu')
  });

  it('should output a displayName given the username', () => {
    let result = usernameToDisplayName("Nutter-Butter-1145644@acc.edu");
    result.should.be.eql('Nutter Butter')
  })

})
