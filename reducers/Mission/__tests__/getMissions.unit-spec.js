


var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);
var _reduxMockStore=require('redux-mock-store');var _reduxMockStore2=_interopRequireDefault(_reduxMockStore);


var _nock=require('nock');var _nock2=_interopRequireDefault(_nock);

var _index=require('../index');var _index2=_interopRequireDefault(_index);

var _getMissions=require('../getMissions');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var should=require('should');var _=require('lodash');var Q=require('q');var middlewares=[_reduxThunk2['default']];var mockStore=(0,_reduxMockStore2['default'])(middlewares);

describe('getMissions',function(){
it('should call getMissions and receive a list of missions',function(done){
(0,_nock2['default'])('http://localhost:8888/l4').
get('/missions?courseId=1744153').
reply(200,['mission1','mission2']);

var store=mockStore({});

store.dispatch((0,_getMissions.getMissions)({
user:{
Identifier:1145645},

course:{Id:'1744153'}})).

then(function(res){
var missions=res.data;
var actions=store.getActions();


actions[0].type.should.eql(_getMissions.GET_MISSIONS_OPTIMISTIC);
actions[1].type.should.eql(_getMissions.RECEIVE_MISSIONS);
actions[1].missions.should.eql(['mission1','mission2']);

done();
});
});

});