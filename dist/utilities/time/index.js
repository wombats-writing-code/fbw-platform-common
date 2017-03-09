Object.defineProperty(exports,"__esModule",{value:true});exports.utcNoon=exports.localDateTime=undefined;exports.



checkMissionStatus=checkMissionStatus;exports.


































momentToQBank=momentToQBank;exports.












afterMidnight=afterMidnight;exports.























beforeMidnight=beforeMidnight;exports.























qbankToMoment=qbankToMoment;exports.










adjustedQBankToMomentObj=adjustedQBankToMomentObj;exports.












convertUTCPythonDateToJSUTC=convertUTCPythonDateToJSUTC;var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var moment=require('moment-timezone');function checkMissionStatus(mission){var st=mission.startTime;var dl=mission.deadline;var startTime=moment.utc(st);var deadline=moment.utc(dl);var now=moment.utc();if(deadline<now){return'over';}else if(startTime<=now&&now<=deadline){return'pending';}else{return'future';}};var localDateTime=exports.localDateTime=function(){function localDateTime(utcDateObject){var timezone=moment.tz.guess();return moment.utc(utcDateObject).clone().tz(timezone);}return localDateTime;}();var utcNoon=exports.utcNoon=function(){function utcNoon(localDateMoment){return moment.utc({year:localDateMoment.year(),month:localDateMoment.month(),day:localDateMoment.date(),hour:12,minute:0,second:0});}return utcNoon;}();function momentToQBank(momentObject){var timeUTC=momentObject.utc().toObject();return{year:timeUTC.years,month:timeUTC.months+1,day:timeUTC.date,hour:timeUTC.hours,minute:timeUTC.minutes,second:timeUTC.seconds};}function afterMidnight(timeObject){var midnight=moment({year:timeObject.year,month:timeObject.month-1,day:timeObject.day,hour:0,minute:0,second:1});midnight.utc();return{year:midnight.year(),month:midnight.month()+1,day:midnight.date(),hour:midnight.hour(),minute:0,second:1};}function beforeMidnight(timeObject){var almostMidnight=moment({year:timeObject.year,month:timeObject.month-1,day:timeObject.day,hour:23,minute:59,second:59});almostMidnight.utc();return{year:almostMidnight.year(),month:almostMidnight.month()+1,day:almostMidnight.date(),hour:almostMidnight.hour(),minute:59,second:59};}function qbankToMoment(timeObject){return moment.utc({years:timeObject.year,months:timeObject.month-1,days:timeObject.day,hours:timeObject.hour,minutes:timeObject.minute,second:timeObject.second});}function adjustedQBankToMomentObj(timeObject){return{years:timeObject.year,months:timeObject.month+1,days:timeObject.day,hours:timeObject.hour,minutes:timeObject.minute,second:timeObject.second};}function convertUTCPythonDateToJSUTC(pythonTime){


var jsUTCTime=moment.utc({
year:pythonTime.year,
month:pythonTime.month-1,
day:pythonTime.day,
hour:pythonTime.hour,
minute:pythonTime.minute,
second:pythonTime.second});

return{
year:jsUTCTime.year(),
month:jsUTCTime.month(),
day:jsUTCTime.date(),
hour:jsUTCTime.hour(),
minute:jsUTCTime.minute(),
second:jsUTCTime.second()};

}