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
    this.timeout(30000);

    const store = mockStore({})

    store.dispatch(submitResponse({
      bankId: 'assessment.Bank%3A58498ccb71e482e47e0ed8ce%40bazzim.MIT.EDU',
      section: {id: "assessment.AssessmentSection%3A58779aa871e482361c77ab83%40bazzim.MIT.EDU"},
      questionId: 'assessment.Item%3A58779aa971e482361c77ab9b%40assessment-session',
      choiceId: "574dde9ee7dde0b3c6c66523",
      username: 'Nutter-Butter-1145644@acc.edu'
    }))
    .then(res => {
      // console.log(' res', res);
      res.isCorrect.should.eql(false);
      res.confusedLearningObjectiveIds[0].should.be.a('string');

      done();
    });
  })
})
