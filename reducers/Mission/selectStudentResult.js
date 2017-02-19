


export const SELECT_STUDENT_RESULT = 'SELECT_STUDENT_RESULT';

export function selectStudentResult(missionResult, currentDirectiveIndex, question) {
  if (!missionResult) {
    throw new Error('A result of a student mission must be provided.')
  }

  if (!question) {
    throw new Error('The question on which to focus must be provided.')
  }

  return { type: SELECT_MISSION_RESULT, missionResult, currentDirectiveIndex, question }
}
