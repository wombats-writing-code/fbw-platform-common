let chai = require('chai');
let path = require('path')
chai.should();

const moment = require('moment-timezone')

const isUTC = moment.utc() == moment()

import {
  checkMissionStatus,
  localDateTime,
  afterMidnight,
  beforeMidnight,
  convertPythonDateToJS} from '../time/index'

describe('time utilities', () => {

  it('should convert a JS date object to local timezone', () => {
    let date = {
      "year": 2017,
      "month": 6,
      "day": 3,
      "hour": 0,
      "minute": 0,
      "second": 1
    };
    let result = localDateTime(date);

    result.should.be.a('object')
  })

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
      deadline: {
        "year": 2017,
        "month": 6,
        "day": 3,
        "hour": 0,
        "minute": 0,
        "second": 1
      }
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
      deadline: {
        "year": 2017,
        "month": 0,
        "day": 1,
        "hour": 0,
        "minute": 0,
        "second": 1
      }
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

  it('should convert a local datetime to UTC datetime for afterMidnight', () => {
    let localTimeObject = {
      "year": 2020,
      "month": 0,
      "day": 3,
      "hour": 0,
      "minute": 0,
      "second": 1
    };
    let result = afterMidnight(localTimeObject);

    if (isUTC) {
      result.hour.should.be.eql(0)
    } else {
      result.hour.should.not.be.eql(0)
    }
  })

  it('should convert a local datetime to UTC datetime for beforeMidnight', () => {
    let localTimeObject = {
      "year": 2020,
      "month": 0,
      "day": 3,
      "hour": 23,
      "minute": 59,
      "second": 59
    };
    let result = beforeMidnight(localTimeObject);

    if (isUTC) {
      result.hour.should.be.eql(23)
    } else {
      result.hour.should.not.be.eql(23)
    }
  })

  it('should convert a UTC datetime to local datetime for convertPythonDateToJS', () => {
    let utcTimeObject = {
      "year": 2020,
      "month": 1,
      "day": 3,
      "hour": 0,
      "minute": 0,
      "second": 1
    };
    let result = convertPythonDateToJS(utcTimeObject);

    if (isUTC) {
      result.hour.should.be.eql(0)
    } else {
      result.hour.should.not.be.eql(0)
    }
  })
})
