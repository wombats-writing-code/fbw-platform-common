let chai = require('chai');
let path = require('path')
chai.should();

const sectionQuestions = require('./section-questions.json');
import {getSectionTargets, isTargetRouteNavigated, isLastTargetInRoute} from '../mission'

describe('mission selectors', () => {

  it('should return the targets of a given section', done => {
    let result = getSectionTargets([], 0);

    result.should.be.eql([]);

    done();
  });

  it('should say a route is navigated given the target', done => {
    let result = isTargetRouteNavigated(sectionQuestions[0], sectionQuestions);

    result.should.be.eql(true);

    done();
  });

  it('should say the given target is the last target in the section', done => {
    let section = [
      [],
      [],
      [
        {id: '1'},
        {id: '2'}
      ]
    ]
    let target = section[2][0];
    let result = isLastTargetInRoute(target, section)

    result.should.be.eql(true);

    done();
  })


})
