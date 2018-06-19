

var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);

var _reduxMockStore=require('redux-mock-store');var _reduxMockStore2=_interopRequireDefault(_reduxMockStore);
var _nock=require('nock');var _nock2=_interopRequireDefault(_nock);








var _authenticateD2L=require('../authenticateD2L');




var _authenticateD2LHelper=require('../_authenticateD2LHelper');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}process.env.NODE_ENV='test';var middlewares=[_reduxThunk2['default']];var mockStore=(0,_reduxMockStore2['default'])(middlewares);var chai=require('chai');var should=require('should');var chaiHttp=require('chai-http');chai.use(chaiHttp);chai.should();

describe('authenticateD2L and authenticateD2LHelper',function(done){
it('should create an action for authenticateD2L',function(done){
var D2LConfig=_lodash2['default'].assign({},require('../../../d2lcredentials'),{
role:'instructor'});


(0,_nock2['default'])('http://localhost:8888').
get('/mock-d2l/d2l/api/lp/1.14/enrollments/myenrollments/').
query(true).
reply(200,['foo']);

(0,_nock2['default'])('http://localhost:8888').
get('/mock-d2l/d2l/api/lp/1.5/users/whoami').
query(true).
reply(200,{
"Identifier":"1145644"});


(0,_nock2['default'])('http://localhost:8888').
post('/l4/users',{
'user':{
'Identifier':'1145644'}}).


reply(200,{
"Identifier":"1145644"});


var store=mockStore({});

store.dispatch((0,_authenticateD2L.authenticateD2L)(D2LConfig)).
then(function(){
var actions=store.getActions();
actions.length.should.be.eql(1);
actions[0].type.should.be.eql(_authenticateD2L.RECEIVE_AUTHENTICATE_D2L);

actions[0].data.courses.should.be.a('array');
actions[0].data.url.should.be.a('string');
actions[0].data.d2lUser.should.be.a('object');
done();
});
});

it('should get instructor enrollments given instructor credentials',function(done){
(0,_nock2['default'])('http://localhost:8888').
get('/mock-d2l/d2l/api/lp/1.14/enrollments/myenrollments/').
query(true).
reply(200,{
PagingInfo:{},
Items:[{
Access:{
IsActive:true,
CanAccess:true},

OrgUnit:{
Id:123,
Type:{
Code:'Course Offering'},

Name:'fbw sp18 test'}}]});




(0,_nock2['default'])('http://localhost:8888').
get('/mock-d2l/d2l/api/lp/1.5/courses/123').
query(true).
reply(200,[{
Code:'Course Offering'}]);

var credentials=require('../../../d2lcredentials');
credentials.role='instructor';

(0,_authenticateD2LHelper.getD2LEnrollments)(credentials,'/').
then(function(courses){

courses[0].Code.should.be.a('string');

done();
});
});

it('should dispatch event for failed D2L login',function(done){
var D2LConfig=_lodash2['default'].assign({},require('../../../d2lcredentials'),{
role:'instructor',
name:'fakeinstructor'});


(0,_nock2['default'])('http://localhost:8888').
get('/mock-d2l/d2l/api/lp/1.14/enrollments/myenrollments/').
query(true).
reply(500);

var store=mockStore({});
store.dispatch((0,_authenticateD2L.authenticateD2L)(D2LConfig)).
then(function(){
var actions=store.getActions();
actions.length.should.be.eql(1);
actions[0].type.should.be.eql(_authenticateD2L.FAILED_AUTHENTICATE_D2L);
done();
});
});

});

describe('_isFbWTerm',function(){
it('should return true for valid terms',function(){
var validNames=['fake sp18',
'fake fa18',
'fake sp19',
'fake fa19',
'fake sp20'];
_lodash2['default'].each(validNames,function(name){
var result=(0,_authenticateD2LHelper._isFbWTerm)(name);
result.should.eql(true);
});
});

it('should return false for past terms',function(){
var result=(0,_authenticateD2LHelper._isFbWTerm)('fake fa17');
result.should.be.eql(false);
});
});

describe('_isValidClass',function(){
it('should return true for valid class names',function(){
var validNames=['mat121',
'acc121202'];
_lodash2['default'].each(validNames,function(name){
var result=(0,_authenticateD2LHelper._isValidClass)(name);
result.should.eql(true);
});
});

it('should return false for other classes',function(){
var result=(0,_authenticateD2LHelper._isValidClass)('acc121201');
result.should.be.eql(false);
result=(0,_authenticateD2LHelper._isValidClass)('mat122');
result.should.be.eql(false);
});
});