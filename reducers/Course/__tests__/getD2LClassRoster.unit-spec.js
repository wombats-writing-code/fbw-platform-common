
var _nock=require('nock');var _nock2=_interopRequireDefault(_nock);




var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);
var _reduxMockStore=require('redux-mock-store');var _reduxMockStore2=_interopRequireDefault(_reduxMockStore);




var _getD2LClassRoster=require('../getD2LClassRoster');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var should=require('should');var _=require('lodash');var Q=require('q');var middlewares=[_reduxThunk2['default']];var mockStore=(0,_reduxMockStore2['default'])(middlewares);var D2LConfig=require('../../../d2lcredentials');


describe('getD2LClassRoster',function(){
it('should call getD2LClassRoster and receive an array of student names who are in the course',function(done){
var store=mockStore({});
var calledCreateUser=false;

(0,_nock2['default'])('http://localhost:8888').
get('/l4/users').
reply(200,[
{id:'foo',Identifier:'1'},
{id:'bar',Identifier:'2'}]);


(0,_nock2['default'])('http://localhost:8888').
post('/l4/users').
reply(200,function(){
calledCreateUser=true;
});

(0,_nock2['default'])("http://localhost:8888").
filteringPath(function(path){
return'/';
}).
get('/').
reply(200,[
{Identifier:'1'},
{Identifier:'2'}]);


D2LConfig.role='instructor';

store.dispatch((0,_getD2LClassRoster.getD2LClassRoster)({
courseId:"1724986",
D2LConfig:D2LConfig,
url:'blah',
user:{Identifier:'admin',token:'foo'}})).

then(function(res){


var actions=store.getActions();
actions.length.should.eql(2);
actions[0].type.should.eql(_getD2LClassRoster.GET_D2L_CLASS_ROSTER_OPTIMISTIC);
actions[1].type.should.eql(_getD2LClassRoster.RECEIVE_D2L_CLASS_ROSTER);

res.should.be.a('array');
res.length.should.eql(2);
res[0].id.should.eql('foo');

calledCreateUser.should.eql(true);

done();
});
});
});