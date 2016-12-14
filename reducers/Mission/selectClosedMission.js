import axios from 'axios'
import Q from 'q'
import { getDomain, convertImagePaths } from '../../utilities'

// ----
// Action types
export const RECEIVE_GET_USER_MISSION_RESULTS = 'RECEIVE_GET_USER_MISSION_RESULTS'
export const GET_USER_MISSION_RESULTS_OPTIMISTIC = 'GET_USER_MISSION_RESULTS_OPTIMISTIC'

// ----

// ------------------------------------
// Actions
// ------------------------------------

export function receiveGetUserMissionResults (mission, resultsExistForUser) {
  return { type: RECEIVE_GET_USER_MISSION_RESULTS, mission, resultsExistForUser }
}

export function getUserMissionResultsOptimistic (mission) {
  return { type: GET_USER_MISSION_RESULTS_OPTIMISTIC, mission }
}

export function selectClosedMission (data) {
  return function (dispatch) {
    // we need to send this data, so that the currentMission gets set in state
    // currentMission is needed to later on properly render the UI
    // in the QuestionCard -- to hide the Submit button, we need to be able to
    // calculate missionStatus
    dispatch(getUserMissionResultsOptimistic(data.mission))

    let options = {
      url: `${getDomain()}/middleman/banks/${data.mission.assignedBankIds[0]}/offereds/${data.mission.assessmentOfferedId}/results`,
      headers: {
        'x-fbw-username': data.username
      }
    }

    let resultSections
    return axios(options)
    .then((response) => {
      resultSections = response.data
      //console.log('received mission results', response)
      let flatQuestions = _.flatten(_.map(resultSections, 'questions'))
      return Q.all(_.map(flatQuestions, convertImagePaths))
    })
    .then((questionsWithImages) => {
      _.each(resultSections, (section) => {
        _.each(section.questions, (question) => {
          question = _.find(questionsWithImages, {id: question.id})
        })
      })
      dispatch(receiveGetUserMissionResults(response.data, true))
    })
    .catch((error) => {
      // this will get hit by a 500 when the user has no results
      dispatch(receiveGetUserMissionResults(null, false))
      // console.log('error getting mission results for user', error)
    })
  }
}
