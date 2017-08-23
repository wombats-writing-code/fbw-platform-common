var _jsxFileName='src/components/question-card/__tests__/question-card.spec.js';var _react=require('react');var _react2=_interopRequireDefault(_react);
var _QuestionCard=require('../web/QuestionCard');var _QuestionCard2=_interopRequireDefault(_QuestionCard);
var _enzyme=require('enzyme');


require('../../../styles/foundation.min.css');
require('../../../styles/core.scss');
require('../../../styles/animations.scss');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}


var chai=require('chai');
chai.should();

var QUESTION=require('./question.mock.json');
var QUESTION_WRONG=require('./question-wrong.mock.json');

var OUTCOME=require('./outcome.mock.json');


describe('QuestionCard',function(){
it('should render a pristine question text, choices and outcome',function(){
var div=global.document.createElement('div');
global.document.body.appendChild(div);

var questionCard=(0,_enzyme.mount)(
_react2['default'].createElement(_QuestionCard2['default'],{question:QUESTION,
outcome:OUTCOME,
isExpanded:true,__source:{fileName:_jsxFileName,lineNumber:26}}),

{attachTo:div});


questionCard.props().question.displayName.should.be.eql(QUESTION.displayName);
questionCard.find('.choice').length.should.be.eql(4);
questionCard.find('.question-header-text').text().should.be.eql(OUTCOME.displayName);

questionCard.detach();
});

it('should render an answered wrong question',function(){
var div=global.document.createElement('div');
global.document.body.appendChild(div);

var questionCard=(0,_enzyme.mount)(
_react2['default'].createElement(_QuestionCard2['default'],{question:QUESTION_WRONG,
outcome:OUTCOME,
isExpanded:true,__source:{fileName:_jsxFileName,lineNumber:45}}),

{attachTo:div});


questionCard.find('.is-selected').length.should.be.eql(1);
questionCard.find('.responded-choice-icon').length.should.be.eql(1);
questionCard.find('.expand-question-icon').length.should.be.eql(1);
questionCard.find('.toggle-question-label').length.should.be.eql(1);

questionCard.detach();
});





});