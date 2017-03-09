
var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);

var _nock=require('nock');var _nock2=_interopRequireDefault(_nock);
var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);
var _reduxMockStore=require('redux-mock-store');var _reduxMockStore2=_interopRequireDefault(_reduxMockStore);



var _getMapping=require('../getMapping');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var should=require('should');var Q=require('q');var middlewares=[_reduxThunk2['default']];var mockStore=(0,_reduxMockStore2['default'])(middlewares);

describe('getMapping',function(){

it('should create 2 actions when getMapping() is called',function(done){
var store=mockStore({});

(0,_nock2['default'])('http://localhost:8888').
get('/l4/mapping?courseId=1744153&entities=outcome').
reply(200,{
entities:['superman','batman'],
relationships:['foo']});



store.dispatch((0,_getMapping.getMapping)({
user:{
Identifier:1145645},

course:{Id:'1744153'},
entityTypes:['outcome']})).

then(function(){
var actions=store.getActions();


actions.length.should.be.eql(2);
actions[0].type.should.be.eql(_getMapping.GET_MAPPING_OPTIMISTIC);
actions[1].type.should.be.eql(_getMapping.RECEIVE_MAPPING);
actions[1].mapping.entities.length.should.eql(2);
actions[1].mapping.relationships.length.should.eql(1);

done();
});
});

});