Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _time=require('../../../utilities/time');

var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _jquery=require('jquery');var _jquery2=_interopRequireDefault(_jquery);
var _reactSpinner=require('react-spinner');var _reactSpinner2=_interopRequireDefault(_reactSpinner);

var _QuestionCardContainer=require('../../question-card/QuestionCardContainer');var _QuestionCardContainer2=_interopRequireDefault(_QuestionCardContainer);
var _QuestionCard=require('../../question-card/web/QuestionCard');var _QuestionCard2=_interopRequireDefault(_QuestionCard);


var _NextCue=require('./NextCue');var _NextCue2=_interopRequireDefault(_NextCue);



require('./Questions.scss');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var QuestionCard=(0,_QuestionCardContainer2['default'])(_QuestionCard2['default']);var

Questions=function(_Component){_inherits(Questions,_Component);function Questions(){var _ref;var _temp,_this,_ret;_classCallCheck(this,Questions);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=Questions.__proto__||Object.getPrototypeOf(Questions)).call.apply(_ref,[this].concat(args))),_this),_this.









renderListRow=function(questionItem,idx){
var outcome=_lodash2['default'].find(_this.props.outcomes,{id:questionItem.outcome});



var nextQuestion=void 0;
var nextCue=void 0;
if(questionItem.responded){

nextQuestion=_this.props.questions[parseInt(idx)+1];

var nextOutcome=void 0;
if(nextQuestion&&questionItem.response.isCorrect){
nextOutcome=_lodash2['default'].find(_this.props.outcomes,{id:nextQuestion.outcome});

}else if(nextQuestion&&questionItem.response.choice.confusedOutcomes&&!questionItem.response.isCorrect){
nextOutcome=_lodash2['default'].find(_this.props.outcomes,{id:questionItem.response.choice.confusedOutcomes[0]});
}

nextCue=
_react2['default'].createElement(_NextCue2['default'],{isLastTarget:_this.props.isLastTarget,
response:questionItem.response,
outcome:outcome,
nextQuestion:nextQuestion,
nextOutcome:nextOutcome});

}


var isExpanded=void 0;

if(!questionItem.responded){
isExpanded=true;
}else{
if(questionItem===_lodash2['default'].last(_this.props.questions)){
isExpanded=true;
}
}

var isSubmitEnabled=(0,_time.checkMissionStatus)(_this.props.mission)==='over'?false:true;

return(
_react2['default'].createElement('li',{key:questionItem.id+'-'+idx,className:'questions-list__item'},
_react2['default'].createElement('div',{className:'row'},
_react2['default'].createElement('div',{className:'medium-8 medium-centered large-8 large-centered columns'},
_react2['default'].createElement(QuestionCard,{question:questionItem,outcome:outcome,isExpanded:isExpanded,isSubmitEnabled:isSubmitEnabled}))),



nextCue));


},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(Questions,[{key:'componentDidUpdate',value:function(){function componentDidUpdate(prevProps){if(prevProps.isInProgressSubmitChoice&&!this.props.isInProgressSubmitChoice){var nextCueTop=(0,_jquery2['default'])('.answered-question-cue').last();(0,_jquery2['default'])("html, body").animate({scrollTop:nextCueTop.offset.top},1000);}}return componentDidUpdate;}()},{key:'render',value:function(){function render()

{
if(!this.props.questions){
return null;
}





var inProgressIndicator=void 0;
if(this.props.isInProgressSubmitChoice){
inProgressIndicator=
_react2['default'].createElement('div',{className:'text-center'},
_react2['default'].createElement('p',null,'Please wait while we check your answer...'),
_react2['default'].createElement(_reactSpinner2['default'],null));

}


var infiniteTimelineHeight={
height:this.props.questionListHeight};


var infiniteTimeline=_react2['default'].createElement('div',null);

return(
_react2['default'].createElement('div',{className:'questions'},
infiniteTimeline,
_react2['default'].createElement('ul',{className:'questions-list'},
_lodash2['default'].map(this.props.questions,this.renderListRow)),


inProgressIndicator));


}return render;}()}]);return Questions;}(_react.Component);exports['default']=


Questions;