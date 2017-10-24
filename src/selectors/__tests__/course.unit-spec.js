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

  it('should try to calculate the roster from phase 1, for guest', () => {
    // Test the QCC case
    let result = getRoster({
      course: {
        roster: []
      },
      mission: {
        currentMission: {
          id: '123'
        }
      },
      result: {
        resultsByMission: {
          '123': [{
            user: {
              Identifier: 's1'
            }
          }, {
            user: {
              Identifier: 's2'
            }
          }, {
            user: {
              Identifier: 's1'
            }
          }]
        }
      }
    });

    result.length.should.eql(2);
    result[0].Identifier.should.eql('s1');
    result[1].Identifier.should.eql('s2');
  });

})
