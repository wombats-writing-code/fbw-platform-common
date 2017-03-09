

var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);

var _reduxMockStore=require('redux-mock-store');var _reduxMockStore2=_interopRequireDefault(_reduxMockStore);


var _nock=require('nock');var _nock2=_interopRequireDefault(_nock);

var _authenticateGuest=require('../authenticateGuest');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}process.env.NODE_ENV='test';var should=require('should');var middlewares=[_reduxThunk2['default']];var mockStore=(0,_reduxMockStore2['default'])(middlewares);

describe('authenticateGuest',function(done){
it('should create an action for authenticateGuest',function(done){
var store=mockStore({});

(0,_nock2['default'])('http://localhost:8888').
get('/mock-d2l/enrollments').
reply(200,['foo']);

(0,_nock2['default'])('http://localhost:8888').
get('/mock-d2l/whoami').
reply(200,{name:'superman'});

(0,_nock2['default'])('http://localhost:8888').
post('/l4/users').
reply(200,{name:'superman'});

store.dispatch((0,_authenticateGuest.authenticateGuest)()).
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
});