







var _index=require('../time/index');var chai=require('chai');var path=require('path');chai.should();var moment=require('moment-timezone');var isUTC=moment.utc()==moment();

describe('time utilities',function(){

it('should detect a mission that\'s over',function(){
var status=(0,_index.checkMissionStatus)({
startTime:"2017-03-21T13:00:00.000Z",
deadline:"2017-03-22T03:59:00.000Z"});


status.should.eql('over');
});

it('should detect a mission that\'s pending',function(){
var status=(0,_index.checkMissionStatus)({
startTime:"2017-03-17T02:00:00.000Z",
deadline:"2057-04-30T04:00:00.000Z"});


status.should.eql('pending');
});

it('should detect a mission that\'s in the future',function(){
var status=(0,_index.checkMissionStatus)({
startTime:"2019-03-17T02:00:00.000Z",
deadline:"2022-04-30T04:00:00.000Z"});


status.should.eql('future');
});
































































































































































});