var _react=require('react');var _react2=_interopRequireDefault(_react);

var _reactRedux=require('react-redux');
var _reduxMockStore=require('redux-mock-store');var _reduxMockStore2=_interopRequireDefault(_reduxMockStore);
var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);

var _web=require('../web/');var _web2=_interopRequireDefault(_web);

var _enzyme=require('enzyme');

require('../../../styles/foundation.min.css');
require('../../../styles/core.scss');
require('../../../styles/animations.scss');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}

var STATE={
route:{
path:'/missions'},

routeParams:{},


course:{
courses:[
{
"_id":"589e4c3ef36d2837a7c6790d",
"Id":"1744153",
"Name":"Fly-by-wire MAT121",
"Code":"Fly-by-wire MAT121",
"Semester":{
"Identifier":"14226",
"Name":"Sandbox",
"Code":"SB"},

"Department":{
"Identifier":"6630",
"Name":"Sandbox",
"Code":"Sandbox"}}]},




mission:{
missions:[]},



login:{
user:{
username:'Susan Peabody'}}};




describe('NavBar',function(){

var middlewares=[_reduxThunk2['default']];
var mockStore=(0,_reduxMockStore2['default'])(middlewares);
var connectedComponent=void 0,store=void 0;

before(function(){
var div=global.document.createElement('div');
global.document.body.appendChild(div);

store=mockStore(STATE);
connectedComponent=(0,_enzyme.mount)(
_react2['default'].createElement(_reactRedux.Provider,{store:store},
_react2['default'].createElement(_web2['default'],null)),

{attachTo:div});

});

it('should display breadcrumbs',function(){
var component=connectedComponent.find(_web2['default']);

component.find('.mission').length.should.eql(0);
});

after(function(){

});
});