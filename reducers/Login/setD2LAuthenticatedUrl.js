
// ----
// Action types
export const SET_D2L_AUTHENTICATED_URL = 'SET_D2L_AUTHENTICATED_URL'

// ----

// ------------------------------------
// Actions
// ------------------------------------

export function setD2LAuthenticatedUrl (url) {
  return { type: SET_D2L_AUTHENTICATED_URL, url }
}
