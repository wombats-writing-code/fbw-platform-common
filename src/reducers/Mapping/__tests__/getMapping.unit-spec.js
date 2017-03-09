let should = require('should');
import _ from 'lodash'
const Q = require('q')
import nock from 'nock'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

import {getMapping, GET_MAPPING_OPTIMISTIC, RECEIVE_MAPPING} from '../getMapping'

describe('getMapping', () => {

  it('should create 2 actions when getMapping() is called', done => {
    const store = mockStore({});

    nock('http://localhost:8888')
    .get('/l4/mapping?courseId=1744153&entities=outcome')
    .reply(200, {
      entities: ['superman', 'batman'],
      relationships: ['foo']
    });


    store.dispatch(getMapping({
      user: {
        Identifier: 1145645     // shea butter
      },
      course: {Id: '1744153'},
      entityTypes: ['outcome']
    }))
    .then( () => {
      let actions = store.getActions();
      // console.log('actions', actions)

      actions.length.should.be.eql(2);
      actions[0].type.should.be.eql(GET_MAPPING_OPTIMISTIC);
      actions[1].type.should.be.eql(RECEIVE_MAPPING);
      actions[1].mapping.entities.length.should.eql(2);
      actions[1].mapping.relationships.length.should.eql(1);

      done();
    });
  });

})
