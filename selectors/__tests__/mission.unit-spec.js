



var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);


var _mission=require('../mission');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var chai=require('chai');var path=require('path');should=chai.should();var sectionQuestions=require('./section-questions.json');







describe('mission selectors',function(){

it('should return the targets of a given section',function(done){
var result=(0,_mission.getSectionTargets)([],0);

result.should.be.eql([]);

done();
});

it('should say a route is navigated given the target',function(done){
var result=(0,_mission.isTargetRouteNavigated)(sectionQuestions[0],sectionQuestions);

result.should.be.eql(true);

done();
});

it('should say a route is navigated given the single target',function(done){
var result=(0,_mission.isTargetRouteNavigated)([
{
name:'foo',
responded:true}],

sectionQuestions);

result.should.be.eql(true);

done();
});

it('should say the given target is the last target in the section',function(done){
var section=[
[],
[],
[
{id:'1'},
{id:'2'}]];


var target=section[2][0];
var result=(0,_mission.isLastTargetInRoute)(target,section);

result.should.be.eql(true);

done();
});

it('should return the questions when target is the first in the list',function(){
var section=[
[{
id:'1',
referenceNumber:'1'},
{
id:'2',
referenceNumber:'1.2'}],

[{
id:'3',
referenceNumber:'2'}]];


var target={
id:'1'};

var questions=(0,_mission.getRouteQuestions)(section,target);
questions.should.be.eql(section[0]);
});

it('should return the questions when target is not the first in the list',function(){
var section=[
[{
id:'1',
referenceNumber:'1.1'},
{
id:'2',
referenceNumber:'1'}],

[{
id:'3',
referenceNumber:'2'}]];


var target={
id:'2'};

var questions=(0,_mission.getRouteQuestions)(section,target);

questions.should.be.eql([{
id:'1',
referenceNumber:'1.1'},
{
id:'2',
referenceNumber:'1'}]);

});
});

describe('(resultsSelector) pointsEarned',function(){

it('should calculate points earned for all correct',function(done){
var questions=[
{response:{
isCorrect:true}},

{response:{
isCorrect:true}},

{response:{
isCorrect:true}}];



var points=(0,_mission.pointsEarned)(questions);
points.should.eql('3 / 3; 100%');

done();
});

it('should calculate points earned for all wrong',function(done){
var questions=[
{response:{
isCorrect:false}},

{response:{
isCorrect:false}},

{response:{
isCorrect:false}}];



var points=(0,_mission.pointsEarned)(questions);
points.should.eql('0 / 3; 0%');

done();
});

it('should calculate points earned for none responded',function(done){
var questions=[
{response:{
isCorrect:null}},

{response:{
isCorrect:null}},

{response:{
isCorrect:null}}];



var points=(0,_mission.pointsEarned)(questions);
points.should.eql('0 / 3; 0%');

done();
});
});

describe('numberCorrectTargets selector',function(){

it('should count all correct',function(done){
var questions=[
{response:{
isCorrect:true}},

{response:{
isCorrect:true}},

{response:{
isCorrect:true}}];



var results=(0,_mission.numberCorrectTargets)(questions);
results.should.eql(3);

done();
});

it('should not count all wrong',function(done){
var questions=[
{response:{
isCorrect:false}},

{response:{
isCorrect:false}},

{response:{
isCorrect:false}}];



var results=(0,_mission.numberCorrectTargets)(questions);
results.should.eql(0);

done();
});

it('should not count none responded',function(done){
var questions=[
{response:{
isCorrect:null}},

{response:{
isCorrect:null}},

{response:{
isCorrect:null}}];



var results=(0,_mission.numberCorrectTargets)(questions);
results.should.eql(0);

done();
});
});

describe('grabTargetQuestionsFromRecords selector',function(){

it('should not return waypoint questions',function(done){
var records=[
{question:{
referenceNumber:'1',
id:'1'}},

{question:{
referenceNumber:'1.1',
id:'2'}},

{question:{
referenceNumber:'2',
id:'3'}}];



var targets=(0,_mission.grabTargetQuestionsFromRecords)(records);
targets.length.should.eql(2);
_lodash2['default'].map(targets,'question.id').should.eql(['1','3']);

done();
});

it('should not return duplicate target questions',function(done){

var records=[
{question:{
referenceNumber:'1',
id:'1'}},

{question:{
referenceNumber:'1.1',
id:'2'}},

{question:{
referenceNumber:'2',
id:'1'}}];



var targets=(0,_mission.grabTargetQuestionsFromRecords)(records);
targets.length.should.eql(1);
_lodash2['default'].map(targets,'question.id').should.eql(['1']);

done();
});

});

describe('grabTargetQuestionsFromMission selector',function(){

it('should not return waypoint questions',function(done){
var records=[
{
referenceNumber:'1',
id:'1'},

{
referenceNumber:'1.1',
id:'2'},

{
referenceNumber:'2',
id:'3'}];



var targets=(0,_mission.grabTargetQuestionsFromMission)(records);
targets.length.should.eql(2);
_lodash2['default'].map(targets,'id').should.eql(['1','3']);

done();
});

it('should not return duplicate target questions',function(done){

var records=[
{
referenceNumber:'1',
id:'1'},

{
referenceNumber:'1.1',
id:'2'},

{
referenceNumber:'2',
id:'1'}];



var targets=(0,_mission.grabTargetQuestionsFromMission)(records);
targets.length.should.eql(1);
_lodash2['default'].map(targets,'id').should.eql(['1']);

done();
});

});

describe('numberUnattemptedTargets selector',function(){

it('should calculate 0 targets remaining when all have responseResult',function(done){
var questions=[
{responseResult:{},
referenceNumber:'1',
id:'1'},
{responseResult:{},
referenceNumber:'2',
id:'2'},
{responseResult:{},
referenceNumber:'3',
id:'3'}];


var results=(0,_mission.numberUnattemptedTargets)(questions);
results.should.eql(0);

done();
});

it('should not calculate unresponded targets with responseResult',function(done){
var questions=[
{responseResult:{},
referenceNumber:'1',
id:'1'},
{foo:'bar',
referenceNumber:'2',
id:'2'},
{responseResult:{},
referenceNumber:'3',
id:'3'}];


var results=(0,_mission.numberUnattemptedTargets)(questions);
results.should.eql(1);

done();
});

it('should calculate 0 targets remaining when all responded',function(done){
var questions=[
{response:{},
referenceNumber:'1',
id:'1'},
{response:{},
referenceNumber:'2',
id:'2'},
{response:{},
referenceNumber:'3',
id:'3'}];


var results=(0,_mission.numberUnattemptedTargets)(questions);
results.should.eql(0);

done();
});

it('should not calculate unresponded targets',function(done){
var questions=[
{response:{},
referenceNumber:'1',
id:'1'},
{foo:'bar',
referenceNumber:'2',
id:'2'},
{response:{},
referenceNumber:'3',
id:'3'}];


var results=(0,_mission.numberUnattemptedTargets)(questions);
results.should.eql(1);

done();
});
});

describe('numberAttemptedTargets selector',function(){

it('should calculate 3 attempted targets when all have responseResult',function(done){
var questions=[
{responseResult:{},
referenceNumber:'1',
id:'1'},
{responseResult:{},
referenceNumber:'2',
id:'2'},
{responseResult:{},
referenceNumber:'3',
id:'3'}];


var results=(0,_mission.numberAttemptedTargets)(questions);
results.should.eql(3);

done();
});

it('should not calculate non-responseResult targets',function(done){
var questions=[
{responseResult:{},
referenceNumber:'1',
id:'1'},
{foo:'bar',
referenceNumber:'2',
id:'2'},
{responseResult:{},
referenceNumber:'3',
id:'3'}];


var results=(0,_mission.numberAttemptedTargets)(questions);
results.should.eql(2);

done();
});

it('should calculate 3 attempted targets when all have response',function(done){
var questions=[
{response:{},
referenceNumber:'1',
id:'1'},
{response:{},
referenceNumber:'2',
id:'2'},
{response:{},
referenceNumber:'3',
id:'3'}];


var results=(0,_mission.numberAttemptedTargets)(questions);
results.should.eql(3);

done();
});

it('should not calculate non-response targets',function(done){
var questions=[
{response:{},
referenceNumber:'1',
id:'1'},
{foo:'bar',
referenceNumber:'2',
id:'2'},
{response:{},
referenceNumber:'3',
id:'3'}];


var results=(0,_mission.numberAttemptedTargets)(questions);
results.should.eql(2);

done();
});
});

describe('isSyntheticDivision selector',function(){

it('should throw exception when nothing passed in',function(done){
should.Throw(function(){
(0,_mission.isSyntheticDivision)(null);
});
done();
});

it('should throw exception when question arg has no displayName',function(done){
should.Throw(function(){
(0,_mission.isSyntheticDivision)({
foo:'bar'});

});
done();
});

it('should return true for "synthetic division"',function(done){
var results=(0,_mission.isSyntheticDivision)({
displayName:'synthetic division #3'});

results.should.eql(true);
done();
});

it('should return true for "SYNTHETIC DIVISION"',function(done){
var results=(0,_mission.isSyntheticDivision)({
displayName:'SYNTHETIC DIVISION #3'});

results.should.eql(true);
done();
});

it('should return false for "synthetic multiplication"',function(done){
var results=(0,_mission.isSyntheticDivision)({
displayName:'synthetic multiplication #3'});

results.should.eql(false);
done();
});

it('should return false for "real division"',function(done){
var results=(0,_mission.isSyntheticDivision)({
displayName:'real division #3'});

results.should.eql(false);
done();
});
});

describe('questionResponded selector',function(){

it('should return true for responseResult',function(done){
var results=(0,_mission.questionResponded)({
responseResult:{}});

results.should.eql(true);
done();
});

it('should return true for response',function(done){
var results=(0,_mission.questionResponded)({
response:{}});

results.should.eql(true);
done();
});

it('should return false for no responseResult or response',function(done){
var results=(0,_mission.questionResponded)({
foo:'bar'});

results.should.eql(false);
done();
});
});



describe('numberUnfinishedRoutes selector',function(){

it('should calculate 0 when all have responseResult',function(done){
var questions=[
{responseResult:{},
referenceNumber:'1',
id:'1'},
{responseResult:{},
referenceNumber:'1.1',
id:'2'},
{responseResult:{},
referenceNumber:'2',
id:'3'}];


var results=(0,_mission.numberUnfinishedRoutes)(questions);
results.should.eql(0);

done();
});

it('should include non-targets in the calculation',function(done){
var questions=[
{responseResult:{},
referenceNumber:'1',
id:'1'},
{foo:'bar',
referenceNumber:'1.1',
id:'2'},
{responseResult:{},
referenceNumber:'2',
id:'3'},
{foo:'bar',
referenceNumber:'2.1',
id:'4'}];


var results=(0,_mission.numberUnfinishedRoutes)(questions);
results.should.eql(2);

done();
});

it('should include targets in the calcuation',function(done){
var questions=[
{referenceNumber:'1',
id:'1'},
{referenceNumber:'2',
id:'2'},
{referenceNumber:'3',
id:'3'}];


var results=(0,_mission.numberUnfinishedRoutes)(questions);
results.should.eql(3);

done();
});
});

describe('numberUnfinishedGoals selector',function(){
it('should only count each goal once, even if multiple routes unfinished',function(done){
var questions=[
{
isComplete:false},

{
isComplete:false}];


var result=(0,_mission.numberUnfinishedGoals)(questions);
result.should.eql(2);
done();
});

it('should not count goals where all routes finished',function(done){
var indicators=[
{
isComplete:false},

{
isComplete:true}];


var result=(0,_mission.numberUnfinishedGoals)(indicators);
result.should.eql(1);
done();
});
});