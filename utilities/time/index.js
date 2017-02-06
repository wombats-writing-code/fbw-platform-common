import _ from 'lodash'
const moment = require('moment-timezone')


export function checkMissionStatus (mission) {
  let st = mission.startTime
  let dl = mission.deadline
  
  let startTime = moment.utc(st)
  let deadline = moment.utc(dl)
  let now = moment.utc()

  if (deadline < now) {
    return 'over'
  } else if (startTime <= now && now <= deadline) {
    return 'pending'
  } else {
    return 'future'
  }
};

export const localDateTime = (utcDateObject) => {
  // convert UTC date / time to local timezone
  let timezone = moment.tz.guess()

  return moment.utc(utcDateObject).clone().tz(timezone)
}

export const utcNoon = (localDateMoment) => {
  return moment.utc({
    year: localDateMoment.year(),
    month: localDateMoment.month(),
    day: localDateMoment.date(),
    hour: 12,
    minute: 0,
    second: 0
  })
}

export function momentToQBank (momentObject) {
  let timeUTC = momentObject.utc().toObject()

  return {
    year: timeUTC.years,
    month: timeUTC.months + 1,
    day: timeUTC.date,
    hour: timeUTC.hours,
    minute: timeUTC.minutes,
    second: timeUTC.seconds
  }
}

export function afterMidnight (timeObject) {
  // This needs to account for local time (on client-side) versus
  // UTC time (what the server expects).
  // Input timeObject is local...needs to convert from
  //   local "afterMidnight" to UTC equivalent
  let midnight = moment({
    year: timeObject.year,
    month: timeObject.month - 1,  // 0-indexed
    day: timeObject.day,
    hour: 0,
    minute: 0,
    second: 1
  })
  midnight.utc()
  return {
    year: midnight.year(),
    month: midnight.month() + 1,  // 0-indexed
    day: midnight.date(),
    hour: midnight.hour(),
    minute: 0,
    second: 1
  }
}

export function beforeMidnight (timeObject) {
  // This needs to account for local time (on client-side) versus
  // UTC time (what the server expects).
  // Input timeObject is local...needs to convert from
  //   local "beforeMidnight" to UTC equivalent
  let almostMidnight = moment({
    year: timeObject.year,
    month: timeObject.month - 1,   // 0-indexed
    day: timeObject.day,
    hour: 23,
    minute: 59,
    second: 59
  })
  almostMidnight.utc()
  return {
    year: almostMidnight.year(),
    month: almostMidnight.month() + 1,  // 0-indexed
    day: almostMidnight.date(),
    hour: almostMidnight.hour(),
    minute: 59,
    second: 59
  }
}

export function qbankToMoment(timeObject) {
  return moment.utc({
    years: timeObject.year,
    months: timeObject.month - 1,
    days: timeObject.day,
    hours: timeObject.hour,
    minutes: timeObject.minute,
    second: timeObject.second
  })
}

export function adjustedQBankToMomentObj(timeObject) {
  // for mission times that were already adjusted in stores,
  // and moment.js takes months as 1-12
  return {
    years: timeObject.year,
    months: timeObject.month + 1,
    days: timeObject.day,
    hours: timeObject.hour,
    minutes: timeObject.minute,
    second: timeObject.second
  }
}

export function convertUTCPythonDateToJSUTC (pythonTime) {
  // converts the server-side UTC time (python) to
  // JS UTC time, where month is 0-indexed
  let jsUTCTime = moment.utc({
    year: pythonTime.year,
    month: pythonTime.month - 1,
    day: pythonTime.day,
    hour: pythonTime.hour,
    minute: pythonTime.minute,
    second: pythonTime.second
  })
  return {
    year: jsUTCTime.year(),
    month: jsUTCTime.month(),
    day: jsUTCTime.date(),
    hour: jsUTCTime.hour(),
    minute: jsUTCTime.minute(),
    second: jsUTCTime.second()
  }
}
