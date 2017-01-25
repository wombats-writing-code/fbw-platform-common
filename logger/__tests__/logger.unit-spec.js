process.env.NODE_ENV = 'test'

import _ from 'lodash'
import thunk from 'redux-thunk'
let chai = require('chai');
let should = require('should');
chai.should();

import logger from '../index'


describe('logger middleware', function() {

  it('should log', (done) => {
    let dispatched = logger();

    done();
  })

});
