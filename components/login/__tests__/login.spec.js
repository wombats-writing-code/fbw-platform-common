var _jsxFileName='src/components/login/__tests__/login.spec.js';var _react=require('react');var _react2=_interopRequireDefault(_react);

var _reactRedux=require('react-redux');
var _reduxMockStore=require('redux-mock-store');var _reduxMockStore2=_interopRequireDefault(_reduxMockStore);
var _reactAriaLive=require('react-aria-live');

var _d2lcredentials=require('../../../d2lcredentials');var _d2lcredentials2=_interopRequireDefault(_d2lcredentials);

var _Login=require('../web/Login');var _Login2=_interopRequireDefault(_Login);
var _LoginContainer=require('../LoginContainer');var _LoginContainer2=_interopRequireDefault(_LoginContainer);


var _enzyme=require('enzyme');

require('../../../styles/foundation.min.css');
require('../../../styles/core.scss');
require('../../../styles/animations.scss');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}_d2lcredentials2['default'].role='student';var Login=(0,_LoginContainer2['default'])(_Login2['default'],_d2lcredentials2['default']);

var STATE=require('./state.mock.json');

var chai=require('chai');
chai.should();

describe('Login',function(){

var mockStore=(0,_reduxMockStore2['default'])([]);
var connectedComponent=void 0,store=void 0;

before(function(){
var div=global.document.createElement('div');
global.document.body.appendChild(div);

store=mockStore(STATE);
connectedComponent=(0,_enzyme.mount)(
_react2['default'].createElement(_reactRedux.Provider,{store:store,__source:{fileName:_jsxFileName,lineNumber:35}},
_react2['default'].createElement(_reactAriaLive.LiveAnnouncer,{__source:{fileName:_jsxFileName,lineNumber:36}},
_react2['default'].createElement(Login,{__source:{fileName:_jsxFileName,lineNumber:37}}))),


{attachTo:div});

});

it('should render the login page',function(){
var login=connectedComponent.find(Login);

login.find('.login-button').length.should.be.eql(2);
login.find('.login-button--d2l').length.should.be.eql(1);
login.find('.login-button--guest--disabled').length.should.be.eql(1);
login.find('.login__guest-registration').length.should.be.eql(1);
});

it('should enable the guest login button if name and password provided',function(){
var login=connectedComponent.find(Login);

login.find('.login-button--guest--disabled').length.should.be.eql(1);

login.find('.login__guest-identifier').simulate('change',{
target:{
value:'foo'}});

login.find('.login__guest-password').simulate('change',{
target:{
value:'foo2'}});

login.find('.login-button').length.should.be.eql(2);
login.find('.login-button--d2l').length.should.be.eql(1);
login.find('.login-button--guest--disabled').length.should.be.eql(0);
});

after(function(){

});
});