
import _ from 'lodash'
import axios from 'axios'

import { getDomain } from '../../utilities'

// ----
// Action types
export const RECEIVE_SECTION_QUESTIONS = 'RECEIVE_SECTION_QUESTIONS'
export const GET_SECTION_QUESTIONS = 'GET_SECTION_QUESTIONS'
export const GET_SECTION_QUESTIONS_OPTIMISTIC = 'GET_SECTION_QUESTIONS_OPTIMISTIC'

// ----

// ------------------------------------
// Actions
// ------------------------------------

export function receiveSectionQuestions (questions) {
  return { type: RECEIVE_SECTION_QUESTIONS, questions }
}

export function getSectionQuestionsOptimistic (data) {
  return { type: GET_SECTION_QUESTIONS_OPTIMISTIC, data }
}

// returns a list of questions in the specific section
export function getSectionQuestions (data) {
  return function (dispatch) {
    dispatch(getSectionQuestionsOptimistic())

    let options = {
      url: `${getDomain()}/middleman/banks/${data.mission.assignedBankIds[0]}/sections/${data.sectionId}/questions`,
      headers: {
        'x-fbw-username': data.username
      }
    }

    return axios(options)
    .then(({data: questions}) => {
      dispatch(receiveSectionQuestions(questions))
    })
    .catch((error) => {
      console.log('error getting section questions', error)
    })
  }
}

function _getPrivateBankId(data) {
  let options = {
    url: `${getDomain()}/middleman/banks/${data.subjectBankId}/privatebankid`,
    headers: {
      'x-fbw-username': data.username
    }
  }

  return axios(options)
  .then((privateBankId) => {
    // console.log('got from middleman the selected subject\'s privateBankId of:', privateBankId);

    save('privateBankId', privateBankId.data)

    return privateBankId.data;
  })
  .catch((error) => {
    console.log('error getting private bank id', error)
  })
}
