process.env.NODE_ENV = 'test'

import _ from 'lodash'
import thunk from 'redux-thunk'
let should = require('should');
import nock from 'nock'
import configureMockStore from 'redux-mock-store'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

import { authenticateD2L, RECEIVE_AUTHENTICATE_D2L } from '../authenticateD2L'

describe('authenticateD2L and authenticateD2LHelper', function(done) {
  // it('should create an action for authenticateD2L', done => {
  //   nock('http://localhost:8888')
  //   .get('/mock-d2l/d2l/api/lp/1.14/enrollments/myenrollments/*')
  //   .reply(200, {
  //     url: 'blah',
  //     d2lUser: {
  //       'Identifier': 'foo'
  //     }
  //   });
  //
  //   nock('http://localhost:8888')
  //   .get('/mock-d2l/d2l/api/lp/1.5/users/whoami?&role=instructor&sNumber=S99999991')
  //   .reply(200, {
  //     'Identifier': 'foo'
  //   });
  //
  //   let D2LConfig = _.assign({}, require('../../../d2lcredentials'), {
  //     role: 'instructor'
  //   })
  //
  //   const store = mockStore({})
  //
  //   store.dispatch(authenticateD2L(D2LConfig))
  //   .then( () => {
  //     let actions = store.getActions()
  //     actions.length.should.be.eql(1);
  //     actions[0].type.should.be.eql(RECEIVE_AUTHENTICATE_D2L);
  //     // console.log('actions', actions)
  //     actions[0].data.url.should.be.a('string')
  //     actions[0].data.d2lUser.should.be.a('object')
  //     done();
  //   })
  // })

  // it('should get instructor enrollments given instructor credentials', done => {
  // nock('http://localhost:8888')
  // .get('/mock-d2l/d2l/api/le/1.5/1724986/classlist/?x_t=1487894481&x_a=YDpql2AVTvFS26MznAudKw&x_c=Rvx97jTtSP6y0qucZ1mwN-uE0k7-Yo_nL5I6zhypJNU&x_b=&x_d=rq9_jTKmkx3_DtBmPlWFLdkxLeXdjlAXb9VFieHh7FE&role=instructor')
  // .reply(200, {
  //   url: 'blah',
  //   d2lUser: {
  //     'Identifier': 'foo'
  //   }
  // });
  //   let credentials = require('../../../d2lcredentials')
  //   credentials.role = 'instructor';
  //
  //   getD2LEnrollments(credentials, '/')
  //   .then( (courses) => {
  //     // console.log('courses', courses);
  //     courses[0].Code.should.be.a('string');
  //
  //     done();
  //   })
  // });

})
