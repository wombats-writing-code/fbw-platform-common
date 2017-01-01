import _ from 'lodash'
let moment = require('moment')

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
  return {
    year: timeObject.year,
    month: timeObject.month,
    day: timeObject.day,
    hour: 0,
    minute: 0,
    second: 1
  }
}

export function beforeMidnight (timeObject) {
  return {
    year: timeObject.year,
    month: timeObject.month,
    day: timeObject.day,
    hour: 23,
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

export function convertPythonDateToJS (pythonTime) {
  return {
    year: pythonTime.year,
    month: pythonTime.month - 1,
    day: pythonTime.day,
    hour: pythonTime.hour,
    minute: pythonTime.minute,
    second: pythonTime.second
  }
}
