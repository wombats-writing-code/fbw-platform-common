

var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);

var _reduxMockStore=require('redux-mock-store');var _reduxMockStore2=_interopRequireDefault(_reduxMockStore);






var _authenticateD2L=require('../authenticateD2L');
var _authenticateD2LHelper=require('../_authenticateD2LHelper');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}process.env.NODE_ENV='test';var should=require('should');var middlewares=[_reduxThunk2['default']];var mockStore=(0,_reduxMockStore2['default'])(middlewares);var chai=require('chai');var chaiHttp=require('chai-http');chai.use(chaiHttp);

describe('authenticateD2L and authenticateD2LHelper',function(done){
it('should create an action for authenticateD2L',function(done){
var D2LConfig=_lodash2['default'].assign({},require('../../../d2lcredentials'),{
role:'instructor'});


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
chai.request('http://localhost:8888').
get('/mock-d2l/d2l/api/le/1.5/1724986/classlist/?x_t=1487894481&x_a=YDpql2AVTvFS26MznAudKw&x_c=Rvx97jTtSP6y0qucZ1mwN-uE0k7-Yo_nL5I6zhypJNU&x_b=&x_d=rq9_jTKmkx3_DtBmPlWFLdkxLeXdjlAXb9VFieHh7FE&role=instructor');

var credentials=require('../../../d2lcredentials');
credentials.role='instructor';

(0,_authenticateD2LHelper.getD2LEnrollments)(credentials,'/').
then(function(courses){

courses[0].Code.should.be.a('string');

done();
});
});

});