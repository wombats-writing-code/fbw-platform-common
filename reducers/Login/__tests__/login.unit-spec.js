import reducer from '../index'
import {RECEIVE_AUTHENTICATE_D2L} from '../authenticateD2L'

let chai = require('chai');
let should = require('should');
chai.should();


describe('login reducer', () => {

  it('should authenticate d2l for an instructor', () => {
    const mockUrl = 'd2l-callback?x_a=94Uf24iaW4SWpQMzFvsMrH&x_b=uq9naj95YZ2bOzgZ8se69m&x_c=66IANU-TLdAJDIOmfvygR1tA110eoQe-bYdMFldm5rA';

    let newState = reducer({}, {
      type: RECEIVE_AUTHENTICATE_D2L,
      url: mockUrl,
      username: 'Butter-Scotch-1145648@acc.edu',
      banks: [{department: 'Sandbox', id: "assessment.Bank%3A58498ccb71e482e47e0ed8ce%40bazzim.MIT.EDU"}]
    });

    newState.user.username.should.be.eql('Butter-Scotch-1145648@acc.edu');
    newState.user.d2l.authenticatedUrl.should.be.eql(mockUrl)
    newState.isLoggedIn.should.be.eql(true);
  })

  it('should login with a visitor user')

})
