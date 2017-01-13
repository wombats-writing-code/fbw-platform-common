let chai = require('chai');
let path = require('path')
chai.should();

const sectionQuestions = require('./section-questions.json');
import {isTargetRouteNavigated} from '../mission'

describe('mission selectors', () => {

  it('should say a route is navigated given the target', done => {
    let result = isTargetRouteNavigated(sectionQuestions[0], sectionQuestions);

    result.should.be.eql(true);

    done();
  })
})
