process.env.NODE_ENV = 'test'

import reducer from '../index'

import thunk from 'redux-thunk'
let chai = require('chai');
let should = require('should');
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

import { instructorCourses, enrollments, whoami } from '../_authenticateD2LHelper'

const _ = require('lodash')
const Q = require('q')


import configureMockStore from 'redux-mock-store'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)


describe('authenticateD2LHelper', () => {

  it('should get instructor banks when given instructor credentials', done => {
    let credentials = require('../../../d2lcredentials')
    credentials.role = 'instructor';

    instructorCourses(credentials, '/')
    .then( (res) => {

      res.should.be.eql([
          { id: 'assessment.Bank%3A58498ccb71e482e47e0ed8ce%40bazzim.MIT.EDU',
          name: 'Fly-by-wire MAT121',
          term: 'Sandbox',
          department: 'Sandbox',
          displayName: 'Fly-by-wire MAT121 -- Sandbox' }
      ]);

      done();
    })
  });


});
