process.env.NODE_ENV = 'test'

import reducer from '../index'

import thunk from 'redux-thunk'
let chai = require('chai');
let should = require('should');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

import {getD2LEnrollments} from '../_authenticateD2LHelper'

const _ = require('lodash')
const Q = require('q')


import configureMockStore from 'redux-mock-store'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)


describe('authenticateD2LHelper', () => {

  it('should get instructor enrollments given instructor credentials', done => {
    let credentials = require('../../../d2lcredentials')
    credentials.role = 'instructor';

    getD2LEnrollments(credentials, '/')
    .then( (courses) => {
      // console.log('courses', courses);
      courses[0].name.should.be.eql('Fly-by-wire MAT121');

      done();
    })
  });


});
