
// action type
export const SELECT_COURSE = 'SELECT_COURSE'

export function selectCourse (course) {
  return { type: SELECT_COURSE, course }
}
