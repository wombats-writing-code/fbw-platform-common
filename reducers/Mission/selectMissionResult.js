


export const SELECT_MISSION_RESULT = 'SELECT_MISSION_RESULT';

export function selectMissionResult(missionResult, currentDirectiveIndex, question) {
  if (!missionResult) {
    throw new Error('A result of a student mission must be provided.')
  }

  if (!currentDirectiveIndex) {
    throw new Error('The currentDirectiveIndex must be provided.')
  }

  if (!question) {
    throw new Error('The question on which to focus must be provided.')
  }

  return { type: SELECT_MISSION_RESULT, missionResult, currentDirectiveIndex, question }
}
