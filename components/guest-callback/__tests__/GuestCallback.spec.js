var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactRedux=require('react-redux');
var _reduxMockStore=require('redux-mock-store');var _reduxMockStore2=_interopRequireDefault(_reduxMockStore);
var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);
var _enzyme=require('enzyme');

var _GuestCallbackContainer=require('../GuestCallbackContainer');var _GuestCallbackContainer2=_interopRequireDefault(_GuestCallbackContainer);


require('../../../styles/foundation.min.css');
require('../../../styles/core.scss');
require('../../../styles/animations.scss');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}

var STATE=require('./state.mock.json');

var chai=require('chai');
chai.should();

describe('GuestCallback',function(){

var middlewares=[_reduxThunk2['default']];
var mockStore=(0,_reduxMockStore2['default'])(middlewares);
var connectedComponent=void 0,store=void 0;

before(function(){
var div=global.document.createElement('div');
global.document.body.appendChild(div);

store=mockStore(STATE);
connectedComponent=(0,_enzyme.mount)(
_react2['default'].createElement(_reactRedux.Provider,{store:store},
_react2['default'].createElement(_GuestCallbackContainer2['default'],null)),

{attachTo:div});

});

it('should mount the callback screen (instructor role)',function(){
var callback=connectedComponent.find(_GuestCallbackContainer2['default']);

callback.find('.callback-text').text().should.be.eql("Redirecting you to your dashboard...");

});

after(function(){
connectedComponent.detach();
});
});