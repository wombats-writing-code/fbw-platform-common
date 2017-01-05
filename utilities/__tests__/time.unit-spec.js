let chai = require('chai');
let path = require('path')
chai.should();

import {checkMissionStatus} from '../time/index'

describe('time utilities', () => {

  it('should give the pending status for a pending mission', () => {
    let mission = {
      startTime: {
        "year": 2017,
        "month": 0,
        "day": 3,
        "hour": 0,
        "minute": 0,
        "second": 1
      },
      "year": 2017,
      "month": 6,
      "day": 3,
      "hour": 0,
      "minute": 0,
      "second": 1
    };
    let result = checkMissionStatus(mission);

    result.should.be.eql('pending')
  })

  it('should give the over status for an over mission', () => {
    let mission = {
      startTime: {
        "year": 2016,
        "month": 0,
        "day": 3,
        "hour": 0,
        "minute": 0,
        "second": 1
      },
      "year": 2017,
      "month": 0,
      "day": 1,
      "hour": 0,
      "minute": 0,
      "second": 1
    };
    let result = checkMissionStatus(mission);

    result.should.be.eql('over')
  })

  it('should give the future status for a future mission', () => {
    let mission = {
      startTime: {
        "year": 2020,
        "month": 0,
        "day": 3,
        "hour": 0,
        "minute": 0,
        "second": 1
      },
      deadline: {
        "year": 2022,
        "month": 0,
        "day": 3,
        "hour": 0,
        "minute": 0,
        "second": 1
      }
    };
    let result = checkMissionStatus(mission);

    result.should.be.eql('future')
  })

})
