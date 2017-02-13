import reducer from '../index'

let chai = require('chai');
let should = require('should');
chai.should();

import {RECEIVE_ITEMS} from '../getItems'
import {RECEIVE_BANKS} from '../getCourses'
import {SELECT_COURSE} from '../selectCourse'
import {RECEIVE_AUTHENTICATE_D2L} from '../../Login/authenticateD2L'
import {LOG_OUT} from '../../Login/logOutUser'


describe('Course reducer', () => {

  it('should update state upon SELECT_COURSE', () => {
    let newState = reducer({}, {
      type: SELECT_COURSE,
      course: {"name": "foo"}
    });

    newState.currentCourse.name.should.be.eql('foo');
  });

  it('should update state upon RECEIVE_AUTHENTICATE_D2L', () => {
    let mockCourse = {"name": "foo"};
    let newState = reducer({}, {
      type: RECEIVE_AUTHENTICATE_D2L,
      data: {
        courses: [mockCourse]
      }
    });

    newState.courses.should.be.eql([mockCourse]);
  });

  it('should update state upon RECEIVE_ITEMS', () => {
    let newState = reducer([], {
      type: RECEIVE_ITEMS,
      items: ['one', 'two']
    });

    newState.items.should.be.eql(['one', 'two']);
  });

  it('should clear everything in course state upon LOG_OUT', () => {
    let newState = reducer({
      courses: ['superman'],
    }, {
      type: LOG_OUT
    });

    newState.courses.length.should.eql(0);
  })

})
