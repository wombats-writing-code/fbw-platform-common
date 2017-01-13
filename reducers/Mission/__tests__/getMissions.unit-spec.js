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

import {getMissions} from '../getMissions'

describe('getMissions', () => {
  it('should call getMissions and receive a list of missions for Nutter Butter', function(done) {
    this.timeout(15000);

    const store = mockStore({})

    store.dispatch(getMissions({
      subjectBankId: 'assessment.Bank%3A58498ccb71e482e47e0ed8ce%40bazzim.MIT.EDU',     // this is from currentBank.id
      username: 'Nutter-Butter-1145644@acc.edu'
    }))
    .then(res => {
      // console.log(' res', res);
      res.should.be.a('array');
      res.length.should.be.at.least(4);    // as of Jan 10, 2017

      done();
    });
  });

  it('should call getMissions and receive a list of missions for YODA', function(done) {
    this.timeout(15000);

    const store = mockStore({})

    store.dispatch(getMissions({
      subjectBankId: "assessment.Bank%3A576d6d3271e4828c441d721a%40bazzim.MIT.EDU",     // this is from currentBank.id
      username: 'YODA@fbw-visitor.edu'
    }))
    .then(res => {
      // console.log(' res', res);
      res.should.be.a('array');
      res.length.should.be.at.least(6);    // as of Jan 10, 2017

      done();
    });
  });
})
