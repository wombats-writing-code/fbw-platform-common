
export const getUser = (state) => state.login.user.d2lUser;

export const isLoggedIn = (state) => state.login.isLoggedIn;

export const failedLogIn = (state) => state.login.logInError;

export const getD2LToken = (state) => state.login.user.d2l ? state.login.user.d2l.authenticatedUrl : null

export const getMapping = (state) => state.mapping

export const getCourses = (state) => state.course.courses

export const getPhaseIResults = (state) => state.result.phaseIResults

export const getPhaseIIResults = (state) => state.result.phaseIIResults

export const isInstructorApp = () => window.location.hostname.indexOf('instructor') > -1
