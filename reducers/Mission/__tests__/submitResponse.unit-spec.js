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

import {submitResponse} from '../submitResponse'

describe('submitResponse', () => {
  it('should call submitResponse and submit a response from Nutter Butter', function(done) {
    this.timeout(15000);

    const store = mockStore({})

    store.dispatch(submitResponse({
      bankId: 'assessment.Bank%3A58498ccb71e482e47e0ed8ce%40bazzim.MIT.EDU',
      section: '',
      questionId: '',
      choiceId: '',
      username: 'Nutter-Butter-1145644@acc.edu'
    }))
    .then(res => {
      // console.log(' res', res);
      res.should.be.a('array');
      res.length.should.be.at.least(10);    // as of Jan 10, 2017

      done();
    });
  })
})
