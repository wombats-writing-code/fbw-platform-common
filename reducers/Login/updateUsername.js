// ----
// Action types
export const UPDATE_USERNAME = 'UPDATE_USERNAME'

// ----

// ------------------------------------
// Actions
// ------------------------------------

// update username in state tree
export function updateUsername (username) {
  return { type: UPDATE_USERNAME, username }
}
