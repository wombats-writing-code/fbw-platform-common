



var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);

var _reduxMockStore=require('redux-mock-store');var _reduxMockStore2=_interopRequireDefault(_reduxMockStore);


var _nock=require('nock');var _nock2=_interopRequireDefault(_nock);



var _authenticateGuest=require('../authenticateGuest');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}process.env.NODE_ENV='test';var chai=require('chai');var should=require('should');var middlewares=[_reduxThunk2['default']];var mockStore=(0,_reduxMockStore2['default'])(middlewares);chai.should();





describe('authenticateGuest',function(done){
it('should create an action for authenticateGuest with no name',function(done){
var D2LConfig=_lodash2['default'].assign({},require('../../../d2lcredentials'),{
role:'student'});


console.log(D2LConfig);

var store=mockStore({});

(0,_nock2['default'])('http://localhost:8888').
get('/mock-d2l/enrollments?role=student&name=undefined').
reply(200,['foo']);

(0,_nock2['default'])('http://localhost:8888').
get('/mock-d2l/whoami').
reply(200,{
name:'superman',
Identifier:321});


(0,_nock2['default'])('http://localhost:8888').
post('/l4/users').
reply(200,{name:'superman'});

store.dispatch((0,_authenticateGuest.authenticateGuest)(D2LConfig)).
then(function(){
var actions=store.getActions();
console.log(actions);
actions.length.should.be.eql(1);
actions[0].type.should.be.eql(_authenticateGuest.RECEIVE_AUTHENTICATE_GUEST);

actions[0].data.courses.should.be.a('array');
actions[0].data.url.should.be.a('string');
actions[0].data.d2lUser.should.be.a('object');
done();
});
});

it('should create an action for authenticateGuest with a guest-provided name',function(done){
var D2LConfig=_lodash2['default'].assign({},require('../../../d2lcredentials'),{
role:'instructor'});


var store=mockStore({});

(0,_nock2['default'])('http://localhost:8888').
get('/mock-d2l/enrollments?role=instructor&name=jane%20doe').
reply(200,['foo']);

(0,_nock2['default'])('http://localhost:8888').
post('/mock-d2l/whoami').
reply(200,{
name:'jane doe',
Identifier:123});


(0,_nock2['default'])('http://localhost:8888').
post('/l4/users').
reply(200,{name:'superman'});

store.dispatch((0,_authenticateGuest.authenticateGuest)(D2LConfig,'jane doe')).
then(function(){
var actions=store.getActions();
actions.length.should.be.eql(1);
actions[0].type.should.be.eql(_authenticateGuest.RECEIVE_AUTHENTICATE_GUEST);

actions[0].data.courses.should.be.a('array');
actions[0].data.url.should.be.a('string');
actions[0].data.d2lUser.should.be.a('object');
done();
});
});

it('should should dispatch event for failed guest login',function(done){
var D2LConfig=_lodash2['default'].assign({},require('../../../d2lcredentials'),{
role:'instructor',
name:'fakeinstructor'});


var store=mockStore({});
store.dispatch((0,_authenticateGuest.authenticateGuest)(D2LConfig)).
then(function(){
var actions=store.getActions();
actions.length.should.be.eql(1);
actions[0].type.should.be.eql(_authenticateGuest.FAILED_AUTHENTICATE_GUEST);
done();
});
});
});