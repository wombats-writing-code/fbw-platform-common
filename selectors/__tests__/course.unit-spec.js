let chai = require('chai');
let path = require('path')
chai.should();

import {getCurrentCourse, getRoster, findCourseDomain, findCourseLibrary} from '../course/index'

describe('course selectors', () => {

  it('should select the current selected course from the courses', () => {
    let result = getCurrentCourse({
      course: {
        currentCourse: {id: 'my course'},
        courses: [{id: 'foo', displayName: 'bar'}]
      }
    });

    result.should.be.eql({id: 'my course'});
  })

  it('should get the class roster', () => {
    let result = getRoster({
      course: {
        roster: [{name: 'foo'}]
      }
    });
    result.length.should.be.eql(1);
  })

})
