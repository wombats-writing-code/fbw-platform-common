// course reducer

import thunk from 'redux-thunk';
import _ from 'lodash'

import {RECEIVE_COURSES} from './getCourses'
import {SELECT_COURSE} from './selectCourse'
import {RECEIVE_ITEMS} from './getItems'
import {RECEIVE_D2L_CLASS_ROSTER, GET_D2L_CLASS_ROSTER_OPTIMISTIC} from './getD2LClassRoster'

import {RECEIVE_AUTHENTICATE_D2L} from '../Login/authenticateD2L'   // updates courses with d2l course info
import {LOG_OUT} from '../Login/logOutUser'


// ------------------------------------
// Reducer
// ------------------------------------

import VISITOR_COURSES from './visitor-courses'

const initialState = {
  courses: VISITOR_COURSES
}
export default function courseReducer (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_COURSES:
      return _.assign({}, state, {
        courses: action.courses,
      });

    case SELECT_COURSE:
      return _.assign({}, state, {
        currentCourse: action.course,
      });

    case RECEIVE_ITEMS:
      return _.assign({}, state, {
        items: action.items
      });

    case RECEIVE_AUTHENTICATE_D2L:
      // console.log('RECEIVE_AUTHENTICATE_D2L in course reducer', action)
      return _.assign({}, state, {
        courses: action.data.courses
      })

    case GET_D2L_CLASS_ROSTER_OPTIMISTIC:
      return _.assign({}, state, {
        roster: []
      })

    case RECEIVE_D2L_CLASS_ROSTER:
      return _.assign({}, state, {
        roster: action.roster
      })

    case LOG_OUT:
      return _.assign({}, state, {
        courses: VISITOR_COURSES,
        currentCourse: null,
        items: null,
      })

    default:
      return state
  }
}
