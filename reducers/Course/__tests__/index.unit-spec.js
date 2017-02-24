const should = require('should');

import {SELECT_COURSE} from '../selectCourse'
import {RECEIVE_ITEMS} from '../getItems'
import {RECEIVE_AUTHENTICATE_D2L} from '../../Login/authenticateD2L'
import {RECEIVE_D2L_CLASS_ROSTER, GET_D2L_CLASS_ROSTER_OPTIMISTIC} from '../getD2LClassRoster'
import {LOG_OUT} from '../../Login/logOutUser'

import reducer from '../index'

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

  it('should update state upon RECEIVE_D2L_CLASS_ROSTER', () => {
    let newState = reducer({}, {
      type: RECEIVE_D2L_CLASS_ROSTER,
      roster: ['1', '2']
    });

    newState.roster.should.be.eql(['1', '2']);
    newState.isGetRosterInProgress.should.eql(false);
  });

  it('should clear everything in course state upon LOG_OUT', () => {
    let newState = reducer({}, {
      type: LOG_OUT
    });

    should.not.exist(newState.currentCourse);
    should.not.exist(newState.items);
    newState.courses.length.should.eql(0);
    newState.isGetRosterInProgress.should.eql(false);
  })

})
