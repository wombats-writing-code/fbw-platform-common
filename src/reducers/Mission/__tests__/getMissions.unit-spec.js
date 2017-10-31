let should = require('should');
const _ = require('lodash')
const Q = require('q')
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
import nock from 'nock'

import reducer from '../index'

import {getMissions, GET_MISSIONS_OPTIMISTIC, RECEIVE_MISSIONS} from '../getMissions'

describe('getMissions', () => {
  it('should call getMissions and receive a list of missions', function(done) {
    nock('http://localhost:8888/l4')
    .get('/missions?courseId=1744153')
    .reply(200, ['mission1', 'mission2']);

    const store = mockStore({});

    store.dispatch(getMissions({
      user: {
        Identifier: 1145645,     // shea butter
        token: '123'
      },
      course: {Id: '1744153'}
    }))
    .then(res => {
      let missions = res.data;
      let actions = store.getActions();
      // console.log('getMissions.unit-spec actions', actions);

      actions[0].type.should.eql(GET_MISSIONS_OPTIMISTIC);
      actions[1].type.should.eql(RECEIVE_MISSIONS);
      actions[1].missions.should.eql(['mission1', 'mission2']);

      done();
    });
  });

})
