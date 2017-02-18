let chai = require('chai');
let should = require('should');
chai.should();
const chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

import _ from 'lodash'
const Q = require('q')

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

import {getMapping, GET_MAPPING_OPTIMISTIC, RECEIVE_MAPPING} from '../getMapping'

describe('getMapping', () => {

  it('should create 2 actions when getMapping() is called', done => {
    const store = mockStore({});

    store.dispatch(getMapping({
      course: {Id: '1744153'},
      entityTypes: ['outcome']
    }))
    .then( () => {
      let actions = store.getActions();
      // console.log('actions', actions)

      actions.length.should.be.eql(2);
      actions[0].type.should.be.eql(GET_MAPPING_OPTIMISTIC);
      actions[1].type.should.be.eql(RECEIVE_MAPPING);
      actions[1].mapping.entities.length.should.be.above(0);
      done();
    });
  });

})
