import _ from 'lodash'

import { BANK_TO_DOMAIN, DOMAIN_TO_LIBRARY, BANK_TO_LIBRARY } from '../../utilities'

export function getRoster(state) {
  return state.course.roster;
}

export function getCurrentCourse(state) {
  return state.course.currentCourse;
}
