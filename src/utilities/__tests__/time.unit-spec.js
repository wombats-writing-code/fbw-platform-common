let chai = require('chai');
let path = require('path')
chai.should();

const moment = require('moment-timezone')

const isUTC = moment.utc() == moment()

import { checkMissionStatus } from '../time/index'

describe('time utilities', () => {

  it(`should detect a mission that's over`, () => {
    let status = checkMissionStatus({
      startTime: "2017-03-21T13:00:00.000Z",
      deadline: "2017-03-22T03:59:00.000Z"
    })

    status.should.eql('over')
  })

  it(`should detect a mission that's pending`, () => {
    let status = checkMissionStatus({
      startTime: "2017-03-17T02:00:00.000Z",
      deadline: "2057-04-30T04:00:00.000Z"
    })

    status.should.eql('pending')
  })

  it(`should detect a mission that's in the future`, () => {
    let status = checkMissionStatus({
      startTime: "2019-03-17T02:00:00.000Z",
      deadline: "2022-04-30T04:00:00.000Z"
    })

    status.should.eql('future')
  })

  // it('should convert a JS UTC date object to local timezone', () => {
  //   let utcNow = moment.utc()
  //   let localNow = moment()
  //   let date = {
  //     "year": utcNow.year(),
  //     "month": utcNow.month(),
  //     "day": utcNow.date(),
  //     "hour": utcNow.hours(),
  //     "minute": utcNow.minutes(),
  //     "second": utcNow.seconds()
  //   };
  //   let result = localDateTime(date);
  //   result.should.be.a('object')
  //
  //   result.hour().should.eql(localNow.hours())
  //   result.utcOffset().should.eql(localNow.utcOffset())
  // })
  //
  // it('should give the pending status for a pending mission', () => {
  //   let mission = {
  //     startTime: {
  //       "year": 2017,
  //       "month": 0,
  //       "day": 3,
  //       "hour": 0,
  //       "minute": 0,
  //       "second": 1
  //     },
  //     deadline: {
  //       "year": 2017,
  //       "month": 6,
  //       "day": 3,
  //       "hour": 0,
  //       "minute": 0,
  //       "second": 1
  //     }
  //   };
  //   let result = checkMissionStatus(mission);
  //
  //   result.should.be.eql('pending')
  // })
  //
  // it('should give the over status for an over mission', () => {
  //   let mission = {
  //     startTime: {
  //       "year": 2016,
  //       "month": 0,
  //       "day": 3,
  //       "hour": 0,
  //       "minute": 0,
  //       "second": 1
  //     },
  //     deadline: {
  //       "year": 2017,
  //       "month": 0,
  //       "day": 1,
  //       "hour": 0,
  //       "minute": 0,
  //       "second": 1
  //     }
  //   };
  //   let result = checkMissionStatus(mission);
  //
  //   result.should.be.eql('over')
  // })
  //
  // it('should give the future status for a future mission', () => {
  //   let mission = {
  //     startTime: {
  //       "year": 2020,
  //       "month": 0,
  //       "day": 3,
  //       "hour": 0,
  //       "minute": 0,
  //       "second": 1
  //     },
  //     deadline: {
  //       "year": 2022,
  //       "month": 0,
  //       "day": 3,
  //       "hour": 0,
  //       "minute": 0,
  //       "second": 1
  //     }
  //   };
  //   let result = checkMissionStatus(mission);
  //
  //   result.should.be.eql('future')
  // })
  //
  // it('should convert a local datetime to UTC datetime for afterMidnight', () => {
  //   let localTimeObject = {
  //     "year": 2020,
  //     "month": 1,
  //     "day": 3,
  //     "hour": 0,
  //     "minute": 0,
  //     "second": 1
  //   };
  //   let result = afterMidnight(localTimeObject);
  //
  //   if (isUTC) {
  //     result.hour.should.be.eql(0)
  //   } else {
  //     result.hour.should.not.be.eql(0)
  //   }
  // })
  //
  // it('should convert a local datetime to UTC noon for utcNoon', () => {
  //   let localTime = moment({
  //     year: 2020,
  //     month: 1,
  //     day: 3,
  //     hour: 0,
  //     minute: 0,
  //     second: 1
  //   });
  //   let result = utcNoon(localTime);
  //
  //   result.hour().should.be.eql(12)
  //   result.date().should.be.eql(3)
  // })
  //
  // it('should convert a local datetime to UTC datetime for beforeMidnight', () => {
  //   let localTimeObject = {
  //     "year": 2020,
  //     "month": 1,
  //     "day": 3,
  //     "hour": 23,
  //     "minute": 59,
  //     "second": 59
  //   };
  //   let result = beforeMidnight(localTimeObject);
  //
  //   if (isUTC) {
  //     result.hour.should.be.eql(23)
  //   } else {
  //     result.hour.should.not.be.eql(23)
  //   }
  // })
  //
  // it('should convert a Python UTC datetime to JS UTC datetime for convertUTCPythonDateToJSUTC', () => {
  //   let utcTimeObject = {
  //     "year": 2020,
  //     "month": 1,
  //     "day": 3,
  //     "hour": 0,
  //     "minute": 0,
  //     "second": 1
  //   };
  //   let result = convertUTCPythonDateToJSUTC(utcTimeObject);
  //
  //   result.year.should.be.eql(2020)
  //   result.month.should.be.eql(0)
  //   result.day.should.be.eql(3)
  //   result.hour.should.be.eql(0)
  //   result.minute.should.be.eql(0)
  //   result.second.should.be.eql(1)
  // })
})
