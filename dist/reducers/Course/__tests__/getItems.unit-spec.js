

var _nock=require('nock');var _nock2=_interopRequireDefault(_nock);


var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);
var _reduxMockStore=require('redux-mock-store');var _reduxMockStore2=_interopRequireDefault(_reduxMockStore);



var _getItems=require('../getItems');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var should=require('should');var _=require('lodash');var Q=require('q');var middlewares=[_reduxThunk2['default']];var mockStore=(0,_reduxMockStore2['default'])(middlewares);

describe('getItems',function(){
it('should call getItems and receive items for Accounting',function(done){
(0,_nock2['default'])('http://localhost:8888').
get('/l4/questions?courseId=1744153').
reply(200,['q1','q2']);

var store=mockStore({});

store.dispatch((0,_getItems.getItems)({
course:{Id:'1744153'},
user:{
Identifier:1145645}})).


then(function(res){

res.should.be.a('array');
res.length.should.eql(2);

done();
});
});
});