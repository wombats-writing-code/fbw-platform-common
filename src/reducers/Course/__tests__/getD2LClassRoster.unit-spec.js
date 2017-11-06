let should = require('should');
import nock from 'nock'

const _ = require('lodash')
const Q = require('q')

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const D2LConfig = require('../../../d2lcredentials');
import {getD2LClassRoster, _getFbWUsers,
  GET_D2L_CLASS_ROSTER_OPTIMISTIC, RECEIVE_D2L_CLASS_ROSTER} from '../getD2LClassRoster'

describe('getD2LClassRoster', function() {
  it('should call getD2LClassRoster and receive an array of student names who are in the course', function(done) {
    const store = mockStore({})
    let calledCreateUser = false;

    nock('http://localhost:8888')
    .get('/l4/users')
    .reply(200, [
        {id: 'foo', Identifier: '1'},
        {id: 'bar', Identifier: '2'}
    ]);

    nock('http://localhost:8888')
    .post('/l4/users')
    .reply(200, () => {
      calledCreateUser = true;
    });

    nock("http://localhost:8888")
    .filteringPath(function(path){
       return '/'
     })
    .get('/')
    .reply(200, [
      {Identifier: '1'},
      {Identifier: '2'}
    ])

    D2LConfig.role = 'instructor';

    store.dispatch(getD2LClassRoster({
      courseId: "1724986",
      D2LConfig,
      url: 'blah',
      user: {Identifier: 'admin', token: 'foo'}
    }))
    .then(res => {
      // console.log('getD2LClassRoster res', res);

      let actions = store.getActions();
      actions.length.should.eql(2);
      actions[0].type.should.eql(GET_D2L_CLASS_ROSTER_OPTIMISTIC);
      actions[1].type.should.eql(RECEIVE_D2L_CLASS_ROSTER);

      res.should.be.a('array');
      res.length.should.eql(2);
      res[0].id.should.eql('foo')

      calledCreateUser.should.eql(true);

      done();
    });
  })
})
