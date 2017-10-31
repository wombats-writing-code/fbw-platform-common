import axios from 'axios'
import { getDomain } from '../../utilities'
export const GET_STUDENT_RESULT_OPTIMISTIC = 'GET_STUDENT_RESULT_OPTIMISTIC';
export const GET_STUDENT_RESULT_SUCCESS = 'GET_STUDENT_RESULT_SUCCESS'

function getStudentResultOptimistic(student, mission) {
  return {type: GET_STUDENT_RESULT_OPTIMISTIC, student, mission}
}

function getStudentResultSuccess(student, mission, questions) {
  return {type: GET_STUDENT_RESULT_SUCCESS, student, mission, questions}
}

export function getStudentResult(student, mission, user) {
  if (!student) {
    throw new Error('A student must be provided.')
  }

  return function(dispatch) {
    dispatch(getStudentResultOptimistic(student, mission))

    return axios({
      url: `${getDomain()}/l4/results?missionId=${mission.id}&reconstruction=true&userId=${student.Identifier}`,
      headers: {
        'x-fbw-user': user.Identifier,
        'x-fbw-token': user.token
      }
    })
    .then( res => {
      dispatch(getStudentResultSuccess(student, mission, res.data))
      return res.data;
    })
  }
}
