import _ from 'lodash'
import axios from 'axios'
import moment from 'moment'
let Q = require('q')
import D2L from 'valence'

import { getDomain } from '../../utilities'

export function getD2LEnrollments(credentials, url) {
  // need to get all of these, because paginated
  let AppContext = new D2L.ApplicationContext(credentials.appID, credentials.appKey);
  let userContext = AppContext.createUserContext(credentials.host, credentials.port, url)
  let enrollmentsUrl = '/d2l/api/lp/1.14/enrollments/myenrollments/'
  // 3 = Course Offering, I think
  // Do we need some sort of startDateTime / endDateTime filter???
  //   http://docs.valence.desire2learn.com/res/enroll.html
  let urlWithFilters = `${enrollmentsUrl}?isActive=true&canAccess=true&orgUnitTypeId=3`
  let options = {
    url: userContext.createAuthenticatedUrl(urlWithFilters, 'GET') + _appendDevRole(credentials)
  }

  // console.log('enrollments options', options)

  return axios(options)
  .then((response) => {
    if (process.env.NODE_ENV !== 'test') console.log('got d2l enrollments', response.data);

    let enrollments = response.data.Items;
    enrollments = _.filter(enrollments, function (enrollment) {
      return enrollment.OrgUnit.Type.Code == 'Course Offering' &&
        enrollment.Access.IsActive &&
        enrollment.Access.CanAccess &&
        isCurrentFbW(enrollment.OrgUnit.Name);
    });

    if (process.env.NODE_ENV !== 'test') console.log('filtered enrollments', enrollments)

    if (credentials.role === 'student') {
      let courses = _.map(enrollments, 'OrgUnit');
      return courses;
    }

    // instructors can get course terms
    let courseTermPromises = [];
    _.each(enrollments, (course) => {

      let url = `/d2l/api/lp/1.5/courses/${course.OrgUnit.Id}`
      let options = {
        url: userContext.createAuthenticatedUrl(url, 'GET') + _appendDevRole(credentials),
        validateStatus: () => {return true}  // evaluate this later, in case of 403s
      }

      courseTermPromises.push(axios(options))
    });

    return axios.all(courseTermPromises)
    .then(res => {
      let courses = _.uniqBy(_.flatten(_.map(res, 'data')), 'Code');
      return courses;
    });
  })
  .catch((error) => {
    console.log('error getting d2l enrollments', error)
    return error;
  })
}


/**
  whoami returns info on logged in user
*/
export function whoami(credentials, url) {
  let AppContext = new D2L.ApplicationContext(credentials.appID, credentials.appKey);
  let userContext = AppContext.createUserContext(credentials.host,
    credentials.port,
    url)
  let whoamiUrl = '/d2l/api/lp/1.5/users/whoami'
  let options

  if (process.env.NODE_ENV === 'test') {
    options = {
      url: `http://localhost:8888/mock-d2l${whoamiUrl}?${_appendDevRole(credentials)}&sNumber=S99999991`
    }
  } else {
    options = {
      url: userContext.createAuthenticatedUrl(whoamiUrl, 'GET') + _appendDevRole(credentials)
    }
  }

  return axios(options)
  .then((response) => {
    return Q.when(response.data)
  })
  .catch((error) => {
    console.log('error getting whoami', error)
  })
}

function _appendDevRole(credentials) {
  if (process.env.NODE_ENV !== 'production') {
    return '&role=' + credentials.role
  }

  return '';
}

export function isCurrentFbW(name) {
  let lowercased = name.toLowerCase()
  return lowercased.indexOf('fly-by-wire') >= 0 || lowercased.indexOf('fbw') >= 0 ||
        lowercased.indexOf('sp18') > -1 && _isValidClass(lowercased);

        // old code for fall 2017
        // lowercased.indexOf('fa17') > -1 && _isValidClass(lowercased);

          // old code for spring 2017
          // (lowercased.indexOf('sp17') >= 0 &&
          // (isMAT121(lowercased) || isACC(lowercased)))
}

function _isValidClass(name) {
  return name.indexOf('mat121') > -1 || name.indexOf('acc121202') > -1;
}


// function isMAT121(name) {
//   return name.indexOf('mat') >= 0 &&
//         name.indexOf('121') >= 0 &&
//         (name.indexOf('142') >= 0 || name.indexOf('103') >= 0)
// }
//
// function isACC(name) {
//   return name.indexOf('acc') >= 0 &&
//     name.indexOf('202') >= 0
// }
