
// ----
// Action types
export const SET_ENROLLED_SUBJECTS = 'SET_ENROLLED_SUBJECTS'

// ----

// ------------------------------------
// Actions
// ------------------------------------

// sets the enrolled (d2l) bankIds in the global state / local storage
export function setEnrolledSubjects (bankIds) {
  return { type: SET_ENROLLED_SUBJECTS, bankIds }
}
