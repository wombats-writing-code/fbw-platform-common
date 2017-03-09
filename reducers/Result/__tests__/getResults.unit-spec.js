








var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);
var _reduxMockStore=require('redux-mock-store');var _reduxMockStore2=_interopRequireDefault(_reduxMockStore);



var _index=require('../index');var _index2=_interopRequireDefault(_index);


var _getResults=require('../getResults');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var chai=require('chai');var should=require('should');chai.should();chai.should();var _=require('lodash');var Q=require('q');var nock=require('nock');var middlewares=[_reduxThunk2['default']];var mockStore=(0,_reduxMockStore2['default'])(middlewares);

describe('getResults',function(){
afterEach(function(){
nock.cleanAll();
});

it('should call getResults and receive a list of records for a user',function(done){
nock('http://localhost:8888').
get('/l4/results?missionId=fooMission').
reply(200,['1','2']);

var store=mockStore({});

store.dispatch((0,_getResults.getResults)({
mission:{
id:'fooMission'},

user:{
Identifier:1145645}})).


then(function(res){


var actions=store.getActions();
actions.length.should.eql(2);
actions[0].type.should.eql(_getResults.GET_RESULTS_OPTIMISTIC);
actions[1].type.should.eql(_getResults.RECEIVE_RESULTS);
actions[1].results.should.eql(['1','2']);


done();
});
});
});