var _jsxFileName='src/components/questions/__tests__/questions.spec.js';var _react=require('react');var _react2=_interopRequireDefault(_react);

var _reactRedux=require('react-redux');
var _reduxMockStore=require('redux-mock-store');var _reduxMockStore2=_interopRequireDefault(_reduxMockStore);

var _Questions=require('../web/Questions');var _Questions2=_interopRequireDefault(_Questions);
var _QuestionsContainer=require('../QuestionsContainer');var _QuestionsContainer2=_interopRequireDefault(_QuestionsContainer);


var _enzyme=require('enzyme');

require('../../../styles/foundation.min.css');
require('../../../styles/core.scss');
require('../../../styles/animations.scss');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var Questions=(0,_QuestionsContainer2['default'])(_Questions2['default']);

var STATE=require('./state.mock.json');

var chai=require('chai');
chai.should();

describe('Questions',function(){

var mockStore=(0,_reduxMockStore2['default'])([]);
var connectedQuestions=void 0,store=void 0;

before(function(){
var div=global.document.createElement('div');
global.document.body.appendChild(div);

store=mockStore(STATE);
connectedQuestions=(0,_enzyme.mount)(
_react2['default'].createElement(_reactRedux.Provider,{store:store,__source:{fileName:_jsxFileName,lineNumber:32}},
_react2['default'].createElement(Questions,{__source:{fileName:_jsxFileName,lineNumber:33}})),

{attachTo:div});

});

it('should render a list of 2 answered question cards and 1 pristine card for an over mission',function(){
var questions=connectedQuestions.find(Questions);


questions.find('.question-card').length.should.be.eql(3);
questions.find('.choice').length.should.be.eql(4);
questions.find('.is-selected').length.should.be.eql(0);
questions.find('.answered-question-cue').length.should.be.eql(2);
questions.find('.submit-button').length.should.be.eql(1);
});



after(function(){
connectedQuestions.detach();
});
});