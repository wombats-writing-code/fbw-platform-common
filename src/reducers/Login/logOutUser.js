
// ----
// Action types
export const LOG_OUT = 'LOG_OUT'

// ----

// ------------------------------------
// Actions
// ------------------------------------

export function logOutUser (data) {
  return { type: LOG_OUT, data }
}
