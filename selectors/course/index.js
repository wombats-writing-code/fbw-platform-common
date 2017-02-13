import _ from 'lodash'

import { BANK_TO_DOMAIN, DOMAIN_TO_LIBRARY, BANK_TO_LIBRARY } from '../../utilities'

export function getRoster(state) {
  return state.course.roster;
}

export function getCurrentCourse(state) {
  return state.course.currentCourse;
}


export function findCourseDomain (courseId, enrolledCourses) {
  // handles both simple login (hardcoded courseIds) and D2L-linked courses
  if (_.keys(BANK_TO_DOMAIN).indexOf(courseId) >= 0) {
    return BANK_TO_DOMAIN[courseId]
  } else {
    // console.log('courseId', courseId, 'enrolledCourses', enrolledCourses)
    let department = _.find(enrolledCourses, {id: courseId}).department.toLowerCase()
    // console.log('department', department)
    switch (department) {
      case 'accounting':
      case 'acc':
        return 'accounting'

      case 'algebra':
      case 'alg':
      case 'mat':
        return 'algebra'

      default:
        return 'accounting'
    }
  }
}

export function findCourseLibrary (courseId, enrolledCourses) {
  let department = findCourseDomain(courseId, enrolledCourses)
  return DOMAIN_TO_LIBRARY[department]
}


function isMAT121(name) {
  return name.indexOf('mat') >= 0 &&
    name.indexOf('121') >= 0 &&
    (name.indexOf('142') >= 0 || name.indexOf('103') >= 0)
}

function isACC(name) {
  return name.indexOf('acc') >= 0 &&
    name.indexOf('202') >= 0
}
