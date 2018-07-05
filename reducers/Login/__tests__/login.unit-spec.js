

var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);

var _nock=require('nock');var _nock2=_interopRequireDefault(_nock);
var _reduxMockStore=require('redux-mock-store');var _reduxMockStore2=_interopRequireDefault(_reduxMockStore);



var _index=require('../index');var _index2=_interopRequireDefault(_index);
var _authenticateD2L=require('../authenticateD2L');
var _authenticateGuest=require('../authenticateGuest');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}process.env.NODE_ENV='test';var should=require('should');var middlewares=[_reduxThunk2['default']];var mockStore=(0,_reduxMockStore2['default'])(middlewares);

describe('login reducer',function(done){

it('should update state upon RECEIVE_AUTHENTICATE_D2L',function(done){
var newState=(0,_index2['default'])({},{
type:_authenticateD2L.RECEIVE_AUTHENTICATE_D2L,
data:{
url:'bah',
d2lUser:{
Identifier:'foo'},

courses:['bar']}});



newState.user.d2lUser.Identifier.should.be.eql('foo');
newState.user.authenticatedUrl.should.be.eql('bah');
newState.isLoggedIn.should.be.eql(true);
newState.isVisitor.should.be.eql(false);

done();
});

it('should update state upon RECEIVE_AUTHENTICATE_GUEST',function(done){
var newState=(0,_index2['default'])({},{
type:_authenticateGuest.RECEIVE_AUTHENTICATE_GUEST,
data:{
url:'bah',
d2lUser:{
Identifier:'foo'},

courses:['bar']}});





newState.user.d2lUser.Identifier.should.be.eql('foo');
newState.user.authenticatedUrl.should.be.eql('bah');
newState.isLoggedIn.should.be.eql(true);
newState.isVisitor.should.be.eql(false);

done();
});

});