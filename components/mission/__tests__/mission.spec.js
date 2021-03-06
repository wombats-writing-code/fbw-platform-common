var _jsxFileName='src/components/mission/__tests__/mission.spec.js';var _react=require('react');var _react2=_interopRequireDefault(_react);

var _reactRedux=require('react-redux');
var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);
var _reduxMockStore=require('redux-mock-store');var _reduxMockStore2=_interopRequireDefault(_reduxMockStore);

var _reactModal=require('react-modal');var _reactModal2=_interopRequireDefault(_reactModal);
var _reactDom=require('react-dom');var _reactDom2=_interopRequireDefault(_reactDom);
var _reactAriaLive=require('react-aria-live');
var _reactProgressbar=require('react-progressbar');var _reactProgressbar2=_interopRequireDefault(_reactProgressbar);

var _Mission=require('../web/Mission');var _Mission2=_interopRequireDefault(_Mission);
var _MissionContainer=require('../MissionContainer');var _MissionContainer2=_interopRequireDefault(_MissionContainer);


var _enzyme=require('enzyme');
var _nock=require('nock');var _nock2=_interopRequireDefault(_nock);

require('../../../styles/foundation.min.css');
require('../../../styles/core.scss');
require('../../../styles/animations.scss');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var Mission=(0,_MissionContainer2['default'])(_Mission2['default']);



var STATE=require('./solution-state.mock.json');
var COMPLETED_STATE=require('./completed-state.mock.json');
var UNOPENED_STATE=require('./unopened-state.mock.json');
var EMPTY_PHASE_II_STATE=require('./empty-phase-ii.mock.json');
var USER={
Identifier:'123',
token:'xyz'};

var COURSE={
id:'1'};


var chai=require('chai');
chai.should();


describe('Mission',function(){

var middlewares=[_reduxThunk2['default']];
var mockStore=(0,_reduxMockStore2['default'])(middlewares);
var connectedComponent=void 0,store=void 0;

before(function(){
(0,_nock2['default'])('http://localhost:8888/l4').
get('/missions?courseId='+COURSE.id).
reply(200,['mission1','mission2']);

(0,_nock2['default'])('http://localhost:8888/l4').
get('/results?missionId='+STATE.mission.currentMission.id+'&userId='+USER.Identifier+'&reconstruction=true').
reply(200,[]);

var div=global.document.createElement('div');

global.document.body.appendChild(div);

store=mockStore(STATE);
connectedComponent=(0,_enzyme.mount)(
_react2['default'].createElement(_reactRedux.Provider,{store:store,__source:{fileName:_jsxFileName,lineNumber:62}},
_react2['default'].createElement(_reactAriaLive.LiveAnnouncer,{__source:{fileName:_jsxFileName,lineNumber:63}},
_react2['default'].createElement(Mission,{
mission:STATE.mission.currentMission,
user:USER,
course:COURSE,__source:{fileName:_jsxFileName,lineNumber:64}}))),



{attachTo:div});

});

it('should render a mission with a current target route displayed',function(){
var mission=connectedComponent.find(Mission);

mission.find('.question-card').length.should.be.eql(2);


});

it('should render a mission with the progress bar displayed',function(){
var mission=connectedComponent.find(Mission);

mission.find('.progressbar-container').length.should.be.eql(1);
mission.html().should.contain('11 / 45 finished');
});

it('should render a closed modal when have unattempted questions',function(){
connectedComponent.find(_reactModal2['default']).length.should.eql(1);
connectedComponent.find(_reactModal2['default']).first().prop('isOpen').should.eql(false);
});

after(function(){
connectedComponent.detach();
});
});

describe('A completed Mission',function(){

var middlewares=[_reduxThunk2['default']];
var mockStore=(0,_reduxMockStore2['default'])(middlewares);
var connectedComponent=void 0,store=void 0;

before(function(){
(0,_nock2['default'])('http://localhost:8888/l4').
get('/missions?courseId='+COURSE.id).
reply(200,['mission1','mission2']);

(0,_nock2['default'])('http://localhost:8888/l4').
get('/results?missionId='+COMPLETED_STATE.mission.currentMission.id+'&userId='+USER.Identifier+'&reconstruction=true').
reply(200,[]);

var div=global.document.createElement('div');
global.document.body.appendChild(div);

store=mockStore(COMPLETED_STATE);
connectedComponent=(0,_enzyme.mount)(
_react2['default'].createElement(_reactRedux.Provider,{store:store,__source:{fileName:_jsxFileName,lineNumber:120}},
_react2['default'].createElement(_reactAriaLive.LiveAnnouncer,{__source:{fileName:_jsxFileName,lineNumber:121}},
_react2['default'].createElement(Mission,{
mission:COMPLETED_STATE.mission.currentMission,
user:USER,
course:COURSE,__source:{fileName:_jsxFileName,lineNumber:122}}))),



{attachTo:div});

});

it('should render a modal',function(){
setTimeout(function(){
var modal=_reactDom2['default'].findDOMNode(connectedComponent.find(_reactModal2['default']).node.portal);
modal.innerHTML.should.contain('2 out of 2');
connectedComponent.find(_reactModal2['default']).first().prop('isOpen').should.eql(true);
},4000);
});

it('should close modal when click the button',function(){
setTimeout(function(){
var modal=new _enzyme.ReactWrapper(_reactDom2['default'].findDOMNode(connectedComponent.find(_reactModal2['default']).node.portal),true);

modal.find('.close-modal-button').simulate('click');
connectedComponent.find(_reactModal2['default']).length.should.eql(1);
connectedComponent.find(_reactModal2['default']).first().prop('isOpen').should.eql(false);
},4000);
});

after(function(){
connectedComponent.detach();
});
});

describe('An unopened Mission',function(){

var middlewares=[_reduxThunk2['default']];
var mockStore=(0,_reduxMockStore2['default'])(middlewares);
var connectedComponent=void 0,store=void 0;

before(function(){
(0,_nock2['default'])('http://localhost:8888/l4').
get('/missions?courseId='+COURSE.id).
reply(200,['mission1','mission2']);

(0,_nock2['default'])('http://localhost:8888/l4').
get('/results?missionId='+UNOPENED_STATE.mission.currentMission.id+'&userId='+USER.Identifier+'&reconstruction=true').
reply(200,[]);

var div=global.document.createElement('div');
global.document.body.appendChild(div);

store=mockStore(UNOPENED_STATE);
connectedComponent=(0,_enzyme.mount)(
_react2['default'].createElement(_reactRedux.Provider,{store:store,__source:{fileName:_jsxFileName,lineNumber:176}},
_react2['default'].createElement(_reactAriaLive.LiveAnnouncer,{__source:{fileName:_jsxFileName,lineNumber:177}},
_react2['default'].createElement(Mission,{
mission:UNOPENED_STATE.mission.currentMission,
user:USER,
course:COURSE,__source:{fileName:_jsxFileName,lineNumber:178}}))),



{attachTo:div});

});

it('should render a closed modal',function(){
connectedComponent.find(_reactModal2['default']).length.should.eql(0);
});

it('should tell the student they did not open the original mission',function(){
var mission=connectedComponent.find(Mission);
mission.html().should.contain('This mission is over');
});

after(function(){
connectedComponent.detach();
});
});

describe('An empty phase 2 Mission',function(){
afterEach(function(){
_nock2['default'].cleanAll();
});

beforeEach(function(){
if(!_nock2['default'].isActive())_nock2['default'].activate();
});

var middlewares=[_reduxThunk2['default']];
var mockStore=(0,_reduxMockStore2['default'])(middlewares);
var connectedComponent=void 0,store=void 0;

before(function(){
(0,_nock2['default'])('http://localhost:8888/l4').
get('/missions?courseId='+COURSE.id).
reply(200,['mission1','mission2']);

(0,_nock2['default'])('http://localhost:8888/l4').
get('/results?missionId='+EMPTY_PHASE_II_STATE.mission.currentMission.id+'&userId='+USER.Identifier+'&reconstruction=true').
reply(200,[]);

var div=global.document.createElement('div');
global.document.body.appendChild(div);

store=mockStore(EMPTY_PHASE_II_STATE);
connectedComponent=(0,_enzyme.mount)(
_react2['default'].createElement(_reactRedux.Provider,{store:store,__source:{fileName:_jsxFileName,lineNumber:230}},
_react2['default'].createElement(_reactAriaLive.LiveAnnouncer,{__source:{fileName:_jsxFileName,lineNumber:231}},
_react2['default'].createElement(Mission,{
mission:EMPTY_PHASE_II_STATE.mission.currentMission,
user:USER,
course:COURSE,__source:{fileName:_jsxFileName,lineNumber:232}}))),



{attachTo:div});

});

it('should render a closed modal',function(){
connectedComponent.find(_reactModal2['default']).length.should.eql(0);
});

it('should tell the student they aced phase 1',function(){
var mission=connectedComponent.find(Mission);
mission.html().should.contain('Congratulations!');
});

after(function(){
connectedComponent.detach();
});
});