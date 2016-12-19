import _ from 'lodash'
import axios from 'axios'
import Q from 'q'

let moment = require('moment')
let config = require('../configuration')

let Lockr
let store
let isBrowser = false
if (process.env.BROWSER) {
  isBrowser = true
  Lockr = require('lockr')
} else {
  store = require('react-native-simple-store')
}

import { isTarget, targetKey } from '../selectors'

export const isLocal = (conf) => conf === 'dev'

export const getDomain = () => isLocal(config) ? 'http://localhost:8888' : 'https://fbw-web-backend.herokuapp.com'

export function momentToQBank (momentObject) {
  let timeUTC = momentObject.utc().toObject()

  return {
    year: timeUTC.years,
    month: timeUTC.months + 1,
    day: timeUTC.date,
    hour: timeUTC.hours,
    minute: timeUTC.minutes,
    second: timeUTC.seconds
  }
}

export function afterMidnight (timeObject) {
  return {
    year: timeObject.year,
    month: timeObject.month,
    day: timeObject.day,
    hour: 0,
    minute: 0,
    second: 1
  }
}

export function beforeMidnight (timeObject) {
  return {
    year: timeObject.year,
    month: timeObject.month,
    day: timeObject.day,
    hour: 23,
    minute: 59,
    second: 59
  }
}

export function qbankToMoment(timeObject) {
  return moment.utc({
    years: timeObject.year,
    months: timeObject.month - 1,
    days: timeObject.day,
    hours: timeObject.hour,
    minutes: timeObject.minute,
    second: timeObject.second
  })
}

export function adjustedQBankToMomentObj(timeObject) {
  // for mission times that were already adjusted in stores,
  // and moment.js takes months as 1-12
  return {
    years: timeObject.year,
    months: timeObject.month + 1,
    days: timeObject.day,
    hours: timeObject.hour,
    minutes: timeObject.minute,
    second: timeObject.second
  }
}

export function convertPythonDateToJS (pythonTime) {
  return {
    year: pythonTime.year,
    month: pythonTime.month - 1,
    day: pythonTime.day,
    hour: pythonTime.hour,
    minute: pythonTime.minute,
    second: pythonTime.second
  }
}

export function getSchoolQBankId (school) {
  return `fbw-school%3A${school}%40FBW.MIT.EDU`
}


export function convertImagePaths (itemObject) {
  // Grabs the 302 CloudFront URL from the middleman and replaces it in the
  // question / choice / feedback text.
  var itemString = JSON.stringify(itemObject),
    mc3RegEx = /https:\/\/mc3.mit.edu\/fbw-author.*?\/url/g,
    matches = itemString.match(mc3RegEx),
    cloudFrontPromises = [],
    originalURLs = [];
  // console.log('matches', matches)
  if (matches) {
    _.each(matches, (match) => {
      let params = {
          url: match.replace('https://mc3.mit.edu/fbw-author/api/v2/repository', `${getDomain()}/middleman`)
        };
      originalURLs.push(match);
      // console.log('params', params)
      cloudFrontPromises.push(axios(params));
    })

    return axios.all(cloudFrontPromises)
    .then((responses) => {  // each res should have the CloudFront URL
      // console.log('axios responses', responses)
      _.each(responses, (response, index) => {
        let mc3URL = originalURLs[index];
        itemString = itemString.replace(mc3URL, response.data);
      });
      // console.log('modified item', itemString)
      return Q.when(JSON.parse(itemString));
    })
    .catch((error) => {
      console.log('error getting cloudfront urls!');
    });
  } else {
    // console.log("no promises")
    return Q.when(JSON.parse(itemString));
  }
}

export function updateQuestionWithResponse(question, response) {
  return _.assign({}, question, {
    responded: true,
    isCorrect: response.isCorrect,
    response: response
  })
}


export function updateAssessmentSectionsWithResponse (sections, response) {
  let submittedQuestion
  let _assessmentSections = _.map(sections, (section) => {
    let submittedQuestion = _.find(section.questions, {id: response.questionId});

    // find the section in which the submitted question belongs -- need to update it
    if (submittedQuestion) {
      let routeFinished = false;
      let updatedSection = _.assign({}, section, {
        questions: _.map(section.questions, (question, idx) => {
          // first we find and update the question that was just submitted (that generated this response)
          if (question.id === response.questionId) {
            return updateQuestionWithResponse(question, response);
          }

          return question;
        })
      });

      // we already have Target questions in our list, so we ignore them and only add Waypoints
      if (response.nextQuestion && !isTarget(response.nextQuestion)) {
        updatedSection.questions.push(response.nextQuestion);
      } else if (isTarget(response.nextQuestion) && !response.showAnswer) {
        // this one route is finished
        routeFinished = true;
      } else if (!response.nextQuestion) {
        // means you hit the end of the route / last target
        routeFinished = true;
      }

      console.log('response.nextQuestion?', response.nextQuestion)

      // if there is a next question, but it's a target, we know the user has done the scaffold
      // or, it might be the last target in the directive, so we need to
      // also check for that
      if (submittedQuestion) {
        // console.log('next question is target', submittedQuestion);

        //  we find the Target question to which this question belongs
        // let key = targetKey(submittedQuestion);
        // let target = _.find(_.filter(updatedSection.questions, isTarget), (question) => {
        //   return targetKey(question) === key;
        // });

        // and update the updated section to set a hasNavigated = Boolean flag on it
        // only set this flag if the route has been navigated, i.e. the last
        // question in the route has been responded to

        // updatedSection.questions = _.map(updatedSection.questions, (question, index) => {
        //   //console.log('route finished?', routeFinished, 'response show answer', response.showAnswer)
        //   if (question.id === target.id && routeFinished) {
        //     return _.assign({}, question, {
        //       hasNavigated: true
        //     });
        //   }
        //   // console.log('key', key, 'updatedSection', updatedSection, 'target', target);
        //
        //   return question;
        // });
      }


      return updatedSection;
    }

    return section;
  });

  return _assessmentSections
}

export function get (key) {
  if (isBrowser) {
    return Q.when(Lockr.get(key))
  } else {
    return store.get(key)
  }

}

export function save (key, value) {
  if (isBrowser) {
    Lockr.set(key, value)
  } else {
    store.save(key, value)
  }

}

export function flush () {
  if (isBrowser) {
    Lockr.flush()
  } else {
    store.keys()
    .then((keys) => {
      _.each(keys, (key) => {
        store.delete(key)
      })
    })
  }
}

export const SCHOOL_TO_BANK = {"acc": "assessment.Bank%3A57279fc2e7dde08807231e61%40bazzim.MIT.EDU",
                               "qcc": "assessment.Bank%3A57279fcee7dde08832f93420%40bazzim.MIT.EDU"}

export const BANK_TO_DOMAIN = {"assessment.Bank%3A57d70ed471e482a74879349a%40bazzim.MIT.EDU": "accounting",
                               "assessment.Bank%3A576d6d3271e4828c441d721a%40bazzim.MIT.EDU": "algebra"}

export const DOMAIN_TO_LIBRARY = {"accounting": "assessment.Bank%3A57279fbce7dde086c7fe20ff%40bazzim.MIT.EDU",
                                  "algebra": "assessment.Bank%3A57279fb9e7dde086d01b93ef%40bazzim.MIT.EDU"}

export const BANK_TO_LIBRARY = {"assessment.Bank%3A57d70ed471e482a74879349a%40bazzim.MIT.EDU": "assessment.Bank%3A57279fbce7dde086c7fe20ff%40bazzim.MIT.EDU",
                                "assessment.Bank%3A576d6d3271e4828c441d721a%40bazzim.MIT.EDU": "assessment.Bank%3A57279fb9e7dde086d01b93ef%40bazzim.MIT.EDU"}

export const LO_SCAFFOLD_MISSION_GENUS_TYPE = "assessment-part-genus-type%3Afbw-specify-lo%40ODL.MIT.EDU"
export const TEST_FLIGHT_MISSION = "assessment-genus%3Afbw-in-class-mission%40ODL.MIT.EDU"
export const PRE_FLIGHT_MISSION = "assessment-genus%3Afbw-homework-mission%40ODL.MIT.EDU"
export const PHASE_I_MISSION_RECORD_TYPE = "assessment-record-type%3Afbw-phase-i%40ODL.MIT.EDU"
export const PHASE_II_MISSION_RECORD_TYPE = "assessment-record-type%3Afbw-phase-ii%40ODL.MIT.EDU"

export const BASE_BANKS = ['assessment.Bank%3AROOT%40ODL.MIT.EDU',
  'assessment.Bank%3A000000000000000000000000%40ODL.MIT.EDU',
  'assessment.Bank%3A000000000000000000000000%40bazzim.MIT.EDU']
export const STUDENT_AUTHORIZATION_FUNCTIONS = ['assessment.AssessmentTaken%3Acreate%40ODL.MIT.EDU',
  'assessment.AssessmentTaken%3Alookup%40ODL.MIT.EDU',
  'assessment.Assessment%3Atake%40ODL.MIT.EDU',
  'assessment.Bank%3Alookup%40ODL.MIT.EDU',
  'commenting.Book%3Alookup%40ODL.MIT.EDU',
  'commenting.Comment%3Alookup%40ODL.MIT.EDU',
  'hierarchy.Hierarchy%3Alookup%40ODL.MIT.EDU',
  'logging.Log%3Alookup%40ODL.MIT.EDU',
  'repository.Asset%3Acreate%40ODL.MIT.EDU',
  'repository.Asset%3Adelete%40ODL.MIT.EDU',
  'repository.Asset%3Alookup%40ODL.MIT.EDU',
  'repository.Asset%3Asearch%40ODL.MIT.EDU',
  'repository.Repository%3Alookup%40ODL.MIT.EDU',
  'resource.Bin%3Alookup%40ODL.MIT.EDU',
  'resource.Resource%3Alookup%40ODL.MIT.EDU']
