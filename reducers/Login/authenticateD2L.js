
import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'
let Q = require('q')
import D2L from 'valence'

// import { getDomain, getSchoolQBankId, BASE_BANKS, STUDENT_AUTHORIZATION_FUNCTIONS } from '../../utilities'
// import {momentToQBank} from '../../utilities/time'

export const RECEIVE_AUTHENTICATE_D2L = 'RECEIVE_AUTHENTICATE_D2L'
export const AUTHENTICATE_D2L_OPTIMISTIC = 'AUTHENTICATE_D2L_OPTIMISTIC'

// ------------------------------------
// Actions
// ------------------------------------
export function receiveAuthenticateUrl(data) {
  return { type: RECEIVE_AUTHENTICATE_D2L, data }
}

export function authenticateD2LOptimistic () {
  return { type: AUTHENTICATE_D2L_OPTIMISTIC }
}

export function authenticateD2LInstructor(credentials) {

  return function (dispatch) {
    dispatch(authenticateD2LOptimistic());

    console.log('authenticateD2LInstructor', credentials)

    let url = `${window.location.pathname}${window.location.search}`;
    let banks, username;
    console.log('mounted d2l callback!', url)

    // now get the user enrollments and set them in the global state
    instructorCourses(credentials, url)
    .then((banks) => {
      console.log("got banks", banks)

      return whoami(credentials, url)
    })
    .then((response) => {
      console.log('got whoami', response)
      username = stringifyUsername(response);

      dispatch(receiveAuthenticateUrl({url, banks, username}));

      return username;
    })
  }
}

export function authenticateD2LStudent(credentials) {

  return function (dispatch) {
    console.log('authenticateD2LStudent', credentials)

    let url = `${window.location.pathname}${window.location.search}`;
    let banks, username;
    console.log('mounted d2l callback!', url)

    enrollments(credentials, url)
    .then((banks) => {
      console.log("got bank ids", banks)

      // this.props.onSetEnrolledSubjects(studentBankIds)
      return whoami(credentials, url)
    })
    .then((response) => {
      console.log('got whoami', response)
      // this.props.login('acc', stringifyUsername(response))
      // browserHistory.push('/subjects')

      dispatch(receiveAuthenticateUrl({url, banks, username}));

      return response;
    })
  }
}


export function instructorCourses (credentials, url) {
  // need to get all of these, because paginated
  let AppContext = new D2L.ApplicationContext(credentials.appID, credentials.appKey);
  let userContext = AppContext.createUserContext(credentials.host, credentials.port, url)
  let enrollmentsUrl = '/d2l/api/lp/1.14/enrollments/myenrollments/'
  // 3 = Course Offering, I think
  // Do we need some sort of startDateTime / endDateTime filter???
  //   http://docs.valence.desire2learn.com/res/enroll.html
  let urlWithFilters = `${enrollmentsUrl}?isActive=true&canAccess=true&orgUnitTypeId=3`
  let options = {
    url: userContext.createAuthenticatedUrl(urlWithFilters, 'GET')
  }

  if (process.env.NODE_ENV !== 'production') {
    options.data = {role: credentials.role};
  }

  console.log('enrollments options', options)

  let instructorCourseBanks = []
  return axios(options)
  .then((response) => {
    console.log('instructor enrollments', response)
    let enrollments = response.data.Items
    enrollments = _.filter(enrollments, function (enrollment) {
      return enrollment.OrgUnit.Type.Code == 'Course Offering' &&
        enrollment.Access.IsActive &&
        enrollment.Access.CanAccess;
    });

    // instructors can get course terms
    let offeringPromises = []
    _.each(enrollments, (course) => {
      instructorCourseBanks.push({
        id: course.OrgUnit.Id,
        name: course.OrgUnit.Name.trim()
      })
      let url = `/d2l/api/lp/1.5/courses/${course.OrgUnit.Id}`
      let options = {
        url: userContext.createAuthenticatedUrl(url, 'GET')
      }

      if (process.env.NODE_ENV === 'development') {
        options.data = {role: credentials.role};
      }

      offeringPromises.push(axios(options))
    })
    return axios.all(offeringPromises)
  })
  .then((offerings) => {
    // we also need to replace the D2L ID here with the QBank ID
    // And create the QBank banks / aliases?
    console.log('offerings', offerings)
    let bankTestPromises = []
    _.each(offerings, (offering, index) => {
      instructorCourseBanks[index].term = offering.data.Semester.Name.trim()
      instructorCourseBanks[index].department = offering.data.Department.Name.trim()
      instructorCourseBanks[index].displayName = `${instructorCourseBanks[index].name} -- ${offering.data.Semester.Name.trim()}`

      let options = {
        url: `${getDomain()}/middleman/banks/${bankAliasId(instructorCourseBanks[index].id)}`,
        validateStatus: (status) => {return true}  // let's filter the non-existent ones out later
      }
      bankTestPromises.push(axios(options))
    })
    return axios.all(bankTestPromises)
  })
  .then((bankResponses) => {
    // Let's see if the banks exist. For the ones that do not,
    // create them and set alias.
    let createBankPromises = []
    _.each(bankResponses, (response, index) => {
      let offering = instructorCourseBanks[index]
      if (response.status !== 200) {
        // create the bank
        let options = {
          url: `${getDomain()}/middleman/banks`,
          method: 'post',
          data: {
            bankId: SCHOOL_TO_BANK['acc'],
            departmentName: offering.department,
            subjectName: offering.name,
            termName: offering.term,
            aliasId: bankAliasId(offering.id)
          }
        }
        createBankPromises.push(axios(options))
      } else {
        createBankPromises.push(Q.when(response))
      }
    })
    return axios.all(createBankPromises)
  })
  .then((newBanks) => {
    // replace the bankIds
    // console.log('newBanks', newBanks)
    _.each(newBanks, (bank, index) => {
      // console.log('bank', bank)
      instructorCourseBanks[index].id = bank.data.id
    })
    return Q.when(instructorCourseBanks)
  })
  .catch((error) => {
    console.log('error getting d2l enrollments', error)
  })
}

export function whoami (credentials, url) {
  let AppContext = new D2L.ApplicationContext(credentials.appID, credentials.appKey);
  let userContext = AppContext.createUserContext(credentials.host,
    credentials.port,
    url)
  let whoamiUrl = '/d2l/api/lp/1.5/users/whoami'
  let options = {
    url: userContext.createAuthenticatedUrl(whoamiUrl, 'GET')
  }

  if (process.env.NODE_ENV === 'development') {
    options.data = {role: credentials.role};
  }

  return axios(options)
  .then((response) => {
    return Q.when(response.data)
  })
  .catch((error) => {
    console.log('error getting whoami', error)
  })
}

export function enrollments (credentials, url) {
  // need to get all of these, because paginated
  let AppContext = new D2L.ApplicationContext(credentials.appID, credentials.appKey);
  let userContext = AppContext.createUserContext(credentials.host,
    credentials.port,
    url)
  let enrollmentsUrl = '/d2l/api/lp/1.14/enrollments/myenrollments/'
  // 3 = Course Offering, I think
  let urlWithFilters = `${enrollmentsUrl}?isActive=true&canAccess=true&orgUnitTypeId=3`
  let options = {
    url: userContext.createAuthenticatedUrl(urlWithFilters, 'GET')
  }

  if (process.env.NODE_ENV === 'development') {
    options.data = {role: credentials.role};
  }

  console.log('enrollments options', options)

  return axios(options)
  .then((response) => {
    let enrollments = response.data.Items
    enrollments = _.filter(enrollments, function (enrollment) {
      return enrollment.OrgUnit.Type.Code == 'Course Offering' &&
        enrollment.Access.IsActive &&
        enrollment.Access.CanAccess;
    });

    // students cannot view terms
    let d2lCourses = []
    let qbankPromises = []
    _.each(enrollments, function (subject) {
      d2lCourses.push({
        id: subject.OrgUnit.Id,
        name: subject.OrgUnit.Name.trim()
      });
      let url = `${getDomain()}/middleman/banks/${bankAliasId(subject.OrgUnit.Id)}`
      qbankPromises.push(axios({
        url: url,
        validateStatus: (status) => {return true} // let's filter this out later
      }))
    });
    // for students, this looks like (JSON stringified):
    // "[{"id":1583886,"name":"Fly-by-Wire FBW1"}]"
    // console.log('filtered courses', d2lCourses)
    // Now, get the QBank corresponding banks
    return axios.all(qbankPromises)
  })
  .then((responses) => {
    let courseResponses = _.filter(responses, (res) => {return res.status == 200})
    let courseIds
    if (_.isArray(courseResponses) && courseResponses.length > 0) {
      let courseResponsesData = _.map(courseResponses, 'data')
      courseIds = _.map(courseResponsesData, 'id')
    }
    return Q.when(courseIds)
  })
  .catch((error) => {
    console.log('error getting d2l enrollments', error)
  })
}


export function stringifyUsername (whoami) {
  return `${whoami.FirstName}-${whoami.LastName}-${whoami.Identifier}`
}

export function extractDisplayName (username) {
  if (username.indexOf('-') >= 0) {
    return `${username.split('-')[0]} ${username.split('-')[1]}`
  } else {
    return username
  }
}

export function bankAliasId (courseId) {
  return `assessment.Bank%3A${courseId}%40ACC.D2L.COM`
}
