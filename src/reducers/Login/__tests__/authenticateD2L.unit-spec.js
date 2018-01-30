process.env.NODE_ENV = 'test'

import _ from 'lodash'
import thunk from 'redux-thunk'

import configureMockStore from 'redux-mock-store'
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
    chai.request('http://localhost:8888')
    .get('/mock-d2l/d2l/api/le/1.5/1724986/classlist/?x_t=1487894481&x_a=YDpql2AVTvFS26MznAudKw&x_c=Rvx97jTtSP6y0qucZ1mwN-uE0k7-Yo_nL5I6zhypJNU&x_b=&x_d=rq9_jTKmkx3_DtBmPlWFLdkxLeXdjlAXb9VFieHh7FE&role=instructor')

    let credentials = require('../../../d2lcredentials')
    credentials.role = 'instructor';

    getD2LEnrollments(credentials, '/')
    .then( (courses) => {
      // console.log('courses', courses);
      courses[0].Code.should.be.a('string');

      done();
    })
  });

  it('should should dispatch event for failed D2L login', done => {
    let D2LConfig = _.assign({}, require('../../../d2lcredentials'), {
      role: 'instructor',
      name: 'fakeinstructor'
    })

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
