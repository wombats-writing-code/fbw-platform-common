

let chai = require('chai');
let should = require('should');
chai.should();

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

import reducer from '../index'

import {GET_MAPPING_OPTIMISTIC, RECEIVE_MAPPING} from '../getMapping'
import {getMapping} from '../getMapping'
import {VISUALIZE_ENTITY, CLOSE_VISUALIZE_ENTITY} from '../visualizeEntity'

describe('mapping reducer', () => {

  it('should update state upon GET_MAPPING_OPTIMISTIC', done => {
    let newState = reducer({}, {
      type: GET_MAPPING_OPTIMISTIC,
      mapping: null
    });

    newState.isGetMappingInProgress.should.eql(true);

    done();
  });

  it('should update state upon RECEIVE_MAPPING', done => {
    let newState = reducer({}, {
      type: RECEIVE_MAPPING,
      mapping: {
        entities: [
          {type: 'MODULE', name: 'foo'},
          {type: 'OUTCOME', name: 'bar'}
        ],
        relationships: []
      }
    });

    newState.modules.length.should.eql(1);
    newState.outcomes.length.should.eql(1);
    newState.relationships.length.should.eql(0);
    newState.isGetMappingInProgress.should.eql(false);

    done();
  });

  it(`should update state upon VISUALIZE_ENTITY`, done => {
    let newState = reducer({}, {
      type: VISUALIZE_ENTITY,
      entity: {
        name: 'foo'
      }
    })

    newState.currentEntity.name.should.eql('foo')
    done();
  })

  it(`should update state upon CLOSE_VISUALIZE_ENTITY`, done => {
    let newState = reducer({}, {
      type: CLOSE_VISUALIZE_ENTITY,
    })

    should.not.exist(newState.currentEntity)
    done()
  })
})
