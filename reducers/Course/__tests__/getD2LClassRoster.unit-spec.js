let chai = require('chai');
let should = require('should');
chai.should();
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);
import nock from 'nock'

const _ = require('lodash')
const Q = require('q')

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const D2LConfig = require('../../../d2lcredentials');
import {getD2LClassRoster, GET_D2L_CLASS_ROSTER_OPTIMISTIC, RECEIVE_D2L_CLASS_ROSTER} from '../getD2LClassRoster'

// describe('getD2LClassRoster', function() {
//   it('should call getD2LClassRoster and receive an array of student names who are in the course', function(done) {
//     const store = mockStore({})
//
//     D2LConfig.role = 'instructor';
//
//     store.dispatch(getD2LClassRoster({
//       courseId: "1724986",
//       D2LConfig,
//       url: 'blah'
//     }))
//     .then(res => {
//       // console.log('getD2LClassRoster res', res);
//       let actions = store.getActions();
//       actions.length.should.eql(2);
//       actions[0].type.should.eql(GET_D2L_CLASS_ROSTER_OPTIMISTIC);
//       actions[1].type.should.eql(RECEIVE_D2L_CLASS_ROSTER);
//
//       res.should.be.a('array');
//       res.length.should.be.at.least(1);
//
//       done();
//     });
//   })
// })
