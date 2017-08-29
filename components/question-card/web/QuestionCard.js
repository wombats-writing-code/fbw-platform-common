Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName='src/components/question-card/web/QuestionCard.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _jquery=require('jquery');var _jquery2=_interopRequireDefault(_jquery);
var _mission=require('../../../selectors/mission');

var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);

var _Choices=require('./Choices');var _Choices2=_interopRequireDefault(_Choices);
var _QuestionHeader=require('./QuestionHeader');var _QuestionHeader2=_interopRequireDefault(_QuestionHeader);


require('./QuestionCard.scss');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var styles=require('./QuestionCard.styles');var


QuestionCard=function(_Component){_inherits(QuestionCard,_Component);
function QuestionCard(props){_classCallCheck(this,QuestionCard);var _this=_possibleConstructorReturn(this,(QuestionCard.__proto__||Object.getPrototypeOf(QuestionCard)).call(this,
props));_this.





































































































































































_onSubmitChoice=function(choiceId,question){
if(!_this.props.isInProgressSubmitChoice){
(0,_jquery2['default'])('html, body').animate({
scrollTop:(0,_jquery2['default'])("body")[0].scrollHeight-30},
1000);

var choice=_lodash2['default'].find(_this.props.question.choices,{id:choiceId});





setTimeout(function(){
_this.solution.focus();
},1000);
_this.props.onSubmitResponse({
mission:_this.props.mission,
choice:choice,
question:question,

responseHistory:_this.props.routeQuestions,
user:_this.props.user});

}
};_this.state={selectedChoiceId:null,isExpanded:props.isExpanded};return _this;}_createClass(QuestionCard,[{key:'componentDidMount',value:function(){function componentDidMount(){if(window.MathJax){MathJax.Hub.Queue(["Typeset",MathJax.Hub]);}}return componentDidMount;}()},{key:'componentDidUpdate',value:function(){function componentDidUpdate(){if(window.MathJax){MathJax.Hub.Queue(["Typeset",MathJax.Hub]);}if(this.activeSubmitButton){this.activeSubmitButton.focus();}}return componentDidUpdate;}()},{key:'render',value:function(){function render(){var _this2=this;var submitButtonText=void 0;if(!this.props.isInProgressSubmitChoice){submitButtonText='Submit';}else{submitButtonText='Working...';}var submitButton=void 0;if(this.props.isSubmitEnabled!==false){if(!this.props.question.responded&&!this.state.selectedChoiceId){submitButton=_react2['default'].createElement('button',{disabled:true,onClick:function(){function onClick(){return _this2._onSubmitChoice(_this2.state.selectedChoiceId,_this2.props.question);}return onClick;}(),className:'submit-button is-disabled',__source:{fileName:_jsxFileName,lineNumber:52}},submitButtonText);}else if(!this.props.question.responded&&!this.props.isInProgressSubmitChoice){submitButton=_react2['default'].createElement('button',{onClick:function(){function onClick(){return _this2._onSubmitChoice(_this2.state.selectedChoiceId,_this2.props.question);}return onClick;}(),className:'submit-button',ref:function(){function ref(btn){return _this2.activeSubmitButton=btn;}return ref;}(),__source:{fileName:_jsxFileName,lineNumber:59}},submitButtonText);}}var inProgressIndicator=void 0;if(this.props.isInProgressShowAnswer){if((0,_mission.isTarget)(this.props.question)){inProgressIndicator=_react2['default'].createElement('div',{style:styles.inProgressIndicator,__source:{fileName:_jsxFileName,lineNumber:72}},_react2['default'].createElement('p',{style:_lodash2['default'].assign({},styles.inProgressIndicatorText,this._getTextProgressStyles()),onLayout:this._onProgressTextLayout,__source:{fileName:_jsxFileName,lineNumber:73}},'Fetching the answer...you can no longer get points on this Target.'));}else{inProgressIndicator=_react2['default'].createElement('div',{style:styles.inProgressIndicator,__source:{fileName:_jsxFileName,lineNumber:80}},_react2['default'].createElement('p',{style:_lodash2['default'].assign({},styles.inProgressIndicatorText,this._getTextProgressStyles()),__source:{fileName:_jsxFileName,lineNumber:81}},'Fetching the answer...'));}}var questionTypeIcon=void 0;if((0,_mission.isTarget)(this.props.question)){if(this.props.question.responded&&this.props.question.response.isCorrect){questionTypeIcon=_react2['default'].createElement('img',{alt:'Goal question',className:'question-type-icon',src:require('../../../assets/target-icon--correct@2x.png'),__source:{fileName:_jsxFileName,lineNumber:92}});}else if(this.props.question.responded&&!this.props.question.response.isCorrect){questionTypeIcon=_react2['default'].createElement('img',{alt:'Goal question',className:'question-type-icon',src:require('../../../assets/target-icon--incorrect@2x.png'),__source:{fileName:_jsxFileName,lineNumber:98}});}else{questionTypeIcon=_react2['default'].createElement('img',{alt:'Goal question',className:'question-type-icon',src:require('../../../assets/target-icon@2x.png'),__source:{fileName:_jsxFileName,lineNumber:104}});}}else{if(this.props.question.responded&&this.props.question.response.isCorrect){questionTypeIcon=_react2['default'].createElement('img',{alt:'Review question',className:'question-type-icon',src:require('../../../assets/waypoint-icon--correct@2x.png'),__source:{fileName:_jsxFileName,lineNumber:111}});}else if(this.props.question.responded&&!this.props.question.response.isCorrect){questionTypeIcon=_react2['default'].createElement('img',{alt:'Review question',className:'question-type-icon',src:require('../../../assets/waypoint-icon--incorrect@2x.png'),__source:{fileName:_jsxFileName,lineNumber:117}});}else{questionTypeIcon=_react2['default'].createElement('img',{alt:'Review question',className:'question-type-icon',src:require('../../../assets/waypoint-icon@2x.png'),__source:{fileName:_jsxFileName,lineNumber:123}});}}var solution=this.props.question.responded&&this.state.isExpanded?_react2['default'].createElement('div',{className:'question-card__solution',tabIndex:-1,ref:function(){function ref(sol){_this2.solution=sol;}return ref;}(),__source:{fileName:_jsxFileName,lineNumber:134}},_react2['default'].createElement('p',{className:'bold uppercase',__source:{fileName:_jsxFileName,lineNumber:138}},this.props.question.responded&&this.props.question.response.isCorrect?'Correct!':'Incorrect...'),_react2['default'].createElement('p',{className:'bold uppercase',__source:{fileName:_jsxFileName,lineNumber:139}},'Solution'),_react2['default'].createElement('div',{className:'',dangerouslySetInnerHTML:{__html:this.props.question.text},__source:{fileName:_jsxFileName,lineNumber:140}}),_react2['default'].createElement('div',{className:'question-card__question-border',__source:{fileName:_jsxFileName,lineNumber:143}}),_react2['default'].createElement('div',{className:'',dangerouslySetInnerHTML:{__html:this.props.question.feedback},__source:{fileName:_jsxFileName,lineNumber:144}})):null;var choices=this.state.isExpanded?_react2['default'].createElement(_Choices2['default'],{onSelectChoice:function(){function onSelectChoice(choiceId){return _this2.setState({selectedChoiceId:choiceId});}return onSelectChoice;}(),selectedChoiceId:this.state.selectedChoiceId,choices:this.props.question.choices,responseId:this.props.question.responded?this.props.question.response.choice.id:null,isResponseCorrect:this.props.question.responded?this.props.question.response.isCorrect:null,__source:{fileName:_jsxFileName,lineNumber:150}}):null;return _react2['default'].createElement('div',{role:'group',className:'question-card clearfix',__source:{fileName:_jsxFileName,lineNumber:157}},_react2['default'].createElement(_QuestionHeader2['default'],{questionTypeIcon:questionTypeIcon,headerText:this.props.outcome?this.props.outcome.displayName:'',onShowAnswer:function(){function onShowAnswer(){return _this2._onShowAnswer(_this2.props.question);}return onShowAnswer;}(),isExpanded:this.state.isExpanded,isExpandable:this.props.question.responded||this.props.isExpandable,onToggleExpand:function(){function onToggleExpand(){return _this2.setState({isExpanded:!_this2.state.isExpanded});}return onToggleExpand;}(),__source:{fileName:_jsxFileName,lineNumber:160}}),inProgressIndicator,_react2['default'].createElement('div',{className:'question-card__body clearfix',__source:{fileName:_jsxFileName,lineNumber:170}},_react2['default'].createElement('div',{dangerouslySetInnerHTML:{__html:this.props.question.text},__source:{fileName:_jsxFileName,lineNumber:171}}),choices,solution),submitButton);}return render;}()}]);return QuestionCard;}(_react.Component);



QuestionCard.propTypes={
question:_react2['default'].PropTypes.object.isRequired,
outcome:_react2['default'].PropTypes.object.isRequired,
isExpanded:_react2['default'].PropTypes.bool,
isExpandable:_react2['default'].PropTypes.bool,
isSubmitEnabled:_react2['default'].PropTypes.bool};exports['default']=


QuestionCard;