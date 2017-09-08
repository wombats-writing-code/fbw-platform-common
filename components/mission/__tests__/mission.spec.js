var _jsxFileName='src/components/mission/__tests__/mission.spec.js';var _react=require('react');var _react2=_interopRequireDefault(_react);

var _reactRedux=require('react-redux');
var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);
var _reduxMockStore=require('redux-mock-store');var _reduxMockStore2=_interopRequireDefault(_reduxMockStore);

var _Mission=require('../web/Mission');var _Mission2=_interopRequireDefault(_Mission);
var _MissionContainer=require('../MissionContainer');var _MissionContainer2=_interopRequireDefault(_MissionContainer);


var _enzyme=require('enzyme');

require('../../../styles/foundation.min.css');
require('../../../styles/core.scss');
require('../../../styles/animations.scss');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var Mission=(0,_MissionContainer2['default'])(_Mission2['default']);



var STATE=require('./solution-state.mock.json');

var chai=require('chai');
chai.should();

describe('Mission',function(){

var middlewares=[_reduxThunk2['default']];
var mockStore=(0,_reduxMockStore2['default'])(middlewares);
var connectedComponent=void 0,store=void 0;

before(function(){
var div=global.document.createElement('div');
global.document.body.appendChild(div);

store=mockStore(STATE);
connectedComponent=(0,_enzyme.mount)(
_react2['default'].createElement(_reactRedux.Provider,{store:store,__source:{fileName:_jsxFileName,lineNumber:36}},
_react2['default'].createElement(Mission,{mission:STATE.mission.currentMission,__source:{fileName:_jsxFileName,lineNumber:37}})),

{attachTo:div});

});

it('should render a mission with a current target route displayed',function(){
var mission=connectedComponent.find(Mission);

mission.find('.question-card').length.should.be.eql(2);


});

it('should render a mission with the current status displayed',function(){
var mission=connectedComponent.find(Mission);

mission.find('.current-status').length.should.be.eql(1);
mission.html().should.contain('5 Correct');
mission.html().should.contain('11 Attempted');
mission.html().should.contain('34 Remaining');
});

after(function(){
connectedComponent.detach();
});
});