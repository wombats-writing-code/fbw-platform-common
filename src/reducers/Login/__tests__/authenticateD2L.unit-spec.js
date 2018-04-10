process.env.NODE_ENV = 'test'

import _ from 'lodash'
import thunk from 'redux-thunk'

import configureMockStore from 'redux-mock-store'
import nock from 'nock'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const chai = require('chai')
let should = require('should');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
chai.should();

import {
  authenticateD2L,
  RECEIVE_AUTHENTICATE_D2L,
  FAILED_AUTHENTICATE_D2L
} from '../authenticateD2L'
import {getD2LEnrollments} from '../_authenticateD2LHelper';

describe('authenticateD2L and authenticateD2LHelper', function(done) {
  it('should create an action for authenticateD2L', done => {
    let D2LConfig = _.assign({}, require('../../../d2lcredentials'), {
      role: 'instructor'
    })

    nock('http://localhost:8888')
    .get(`/mock-d2l/d2l/api/lp/1.14/enrollments/myenrollments/`)
    .query(true)
    .reply(200, ['foo'])

    nock('http://localhost:8888')
    .get(`/mock-d2l/d2l/api/lp/1.5/users/whoami`)
    .query(true)
    .reply(200, {
      "Identifier": "1145644"
    })

    nock('http://localhost:8888')
    .post('/l4/users', {
      'user': {
        'Identifier': '1145644'
      }
    })
    .reply(200, {
      "Identifier": "1145644"
    })

    const store = mockStore({})

    store.dispatch(authenticateD2L(D2LConfig))
    .then( () => {
      let actions = store.getActions()
      actions.length.should.be.eql(1);
      actions[0].type.should.be.eql(RECEIVE_AUTHENTICATE_D2L);
      // console.log('actions', actions)
      actions[0].data.courses.should.be.a('array')
      actions[0].data.url.should.be.a('string')
      actions[0].data.d2lUser.should.be.a('object')
      done();
    })
  })

  it('should get instructor enrollments given instructor credentials', done => {
    nock('http://localhost:8888')
    .get(`/mock-d2l/d2l/api/lp/1.14/enrollments/myenrollments/`)
    .query(true)
    .reply(200, {
      PagingInfo: {},
      Items: [{
        Access: {
          IsActive: true,
          CanAccess: true
        },
        OrgUnit: {
          Id: 123,
          Type: {
            Code: 'Course Offering'
          },
          Name: 'fbw sp18 test'
        }
      }]
    })

    nock('http://localhost:8888')
    .get(`/mock-d2l/d2l/api/lp/1.5/courses/123`)
    .query(true)
    .reply(200, [{
      Code: 'Course Offering'
    }])
    let credentials = require('../../../d2lcredentials')
    credentials.role = 'instructor';

    getD2LEnrollments(credentials, '/')
    .then( (courses) => {
      // console.log('courses', courses);
      courses[0].Code.should.be.a('string');

      done();
    })
  });

  it('should dispatch event for failed D2L login', done => {
    let D2LConfig = _.assign({}, require('../../../d2lcredentials'), {
      role: 'instructor',
      name: 'fakeinstructor'
    })

    nock('http://localhost:8888')
    .get(`/mock-d2l/d2l/api/lp/1.14/enrollments/myenrollments/`)
    .query(true)
    .reply(500)

    const store = mockStore({})
    store.dispatch(authenticateD2L(D2LConfig))
    .then( () => {
      let actions = store.getActions()
      actions.length.should.be.eql(1);
      actions[0].type.should.be.eql(FAILED_AUTHENTICATE_D2L);
      done();
    })
  });

})
