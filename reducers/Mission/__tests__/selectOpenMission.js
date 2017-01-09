import reducer from '../index'

let chai = require('chai');
let should = require('should');
chai.should();
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

const _ = require('lodash')
const Q = require('q')

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)


import {selectOpenMission} from '../selectOpenMission'

describe('selectOpenMission', () => {
  it('should select an open mission and get a taken', done => {
    const store = mockStore({})

    store.dispatch(selectOpenMission({
      username: 'Nutter-Butter-1145644@acc.edu',
      bankId: 'assessment.Bank%3A58498ccb71e482e47e0ed8ce%40bazzim.MIT.EDU',
      mission: mockTakeMission
    }))
    .then(res => {
      // console.log('res', res);
      res.should.be.a('array');
      res.should.be.eql('foo');

      done();
    });
  })
})
