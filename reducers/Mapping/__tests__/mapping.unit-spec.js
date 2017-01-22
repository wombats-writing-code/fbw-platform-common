import reducer from '../index'

import {RECEIVE_MAPPING} from '../getMapping'

let chai = require('chai');
let should = require('should');
chai.should();

describe('mapping reducer', () => {

  it('should update state upon RECEIVE_MAPPING', done => {
    let newState = reducer({}, {
      type: RECEIVE_MAPPING,
      mapping: {
        modules: ['foo'],
        outcomes: ['bar'],
        relationships: []
      }
    });

    newState.modules.length.should.eql(1);
    newState.outcomes.length.should.eql(1);
    newState.relationships.length.should.eql(0);

    done();
  })

})
