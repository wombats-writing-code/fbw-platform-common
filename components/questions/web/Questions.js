Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName='src/components/questions/web/Questions.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _time=require('../../../utilities/time');

var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _jquery=require('jquery');var _jquery2=_interopRequireDefault(_jquery);
var _reactSpinner=require('react-spinner');var _reactSpinner2=_interopRequireDefault(_reactSpinner);

var _QuestionCardContainer=require('../../question-card/QuestionCardContainer');var _QuestionCardContainer2=_interopRequireDefault(_QuestionCardContainer);
var _QuestionCard=require('../../question-card/web/QuestionCard');var _QuestionCard2=_interopRequireDefault(_QuestionCard);


var _NextCue=require('./NextCue');var _NextCue2=_interopRequireDefault(_NextCue);



require('./Questions.scss');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var QuestionCard=(0,_QuestionCardContainer2['default'])(_QuestionCard2['default']);var

Questions=function(_Component){_inherits(Questions,_Component);

function Questions(){_classCallCheck(this,Questions);var _this=_possibleConstructorReturn(this,(Questions.__proto__||Object.getPrototypeOf(Questions)).call(this));_this.




















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
currentQuestion:questionItem,
isFirstQuestion:idx===0,
response:questionItem.response,
outcome:outcome,
nextQuestion:nextQuestion,
nextOutcome:nextOutcome,
currentPath:_this.props.currentPath,
onClickTryNextTarget:function(){function onClickTryNextTarget(){return _this.props.onClickTryNextTarget(questionItem,_this.props.mission);}return onClickTryNextTarget;}(),__source:{fileName:_jsxFileName,lineNumber:61}});


}


var isExpanded=void 0;

if(!questionItem.responded){
isExpanded=true;
}else{
if(questionItem===_lodash2['default'].last(_this.props.questions)){
isExpanded=true;
}
}

var isSubmitEnabled=(0,_time.checkMissionStatus)(_this.props.mission)==='over'||_this.props.isSubmitEnabled===false?false:true;

var questionCard=
_react2['default'].createElement('div',{className:'row',__source:{fileName:_jsxFileName,lineNumber:88}},
_react2['default'].createElement('div',{className:'medium-9 medium-centered large-8 large-centered columns',__source:{fileName:_jsxFileName,lineNumber:89}},
_react2['default'].createElement(QuestionCard,{question:questionItem,outcome:outcome,isExpanded:isExpanded,isSubmitEnabled:isSubmitEnabled,__source:{fileName:_jsxFileName,lineNumber:90}})));




if(questionItem===_lodash2['default'].last(_this.props.questions)){
questionCard=
_react2['default'].createElement('div',{className:'row',id:'main-content',tabIndex:-1,__source:{fileName:_jsxFileName,lineNumber:97}},
_react2['default'].createElement('div',{className:'medium-9 medium-centered large-8 large-centered columns',__source:{fileName:_jsxFileName,lineNumber:98}},
_react2['default'].createElement(QuestionCard,{question:questionItem,outcome:outcome,isExpanded:isExpanded,isSubmitEnabled:isSubmitEnabled,__source:{fileName:_jsxFileName,lineNumber:99}})));



}

return(
_react2['default'].createElement('li',{
key:questionItem.id+'-'+idx,
className:'questions-list__item',__source:{fileName:_jsxFileName,lineNumber:106}},
questionCard,

nextCue));


};return _this;}_createClass(Questions,[{key:'componentDidUpdate',value:function(){function componentDidUpdate(prevProps){if(prevProps.isInProgressSubmitChoice&&!this.props.isInProgressSubmitChoice){var nextCueTop=(0,_jquery2['default'])('.answered-question-cue').last();(0,_jquery2['default'])("html, body").animate({scrollTop:nextCueTop.offset.top},1000);}if(prevProps.currentTarget!==this.props.currentTarget){(0,_jquery2['default'])("html, body").animate({scrollTop:0},1000);}}return componentDidUpdate;}()},{key:'render',value:function(){function render()

{


if(!this.props.questions){
return null;
}




var inProgressIndicator=void 0;
if(this.props.isInProgressSubmitChoice){
inProgressIndicator=
_react2['default'].createElement('div',{className:'text-center',__source:{fileName:_jsxFileName,lineNumber:129}},
_react2['default'].createElement('p',{__source:{fileName:_jsxFileName,lineNumber:130}},'Please wait while we check your answer...'),
_react2['default'].createElement(_reactSpinner2['default'],{__source:{fileName:_jsxFileName,lineNumber:131}}));

}


var infiniteTimelineHeight={
height:this.props.questionListHeight};


var infiniteTimeline=_react2['default'].createElement('div',{__source:{fileName:_jsxFileName,lineNumber:140}});

return(
_react2['default'].createElement('div',{className:'questions',__source:{fileName:_jsxFileName,lineNumber:143}},
infiniteTimeline,
_react2['default'].createElement('ul',{className:'questions-list',__source:{fileName:_jsxFileName,lineNumber:145}},
_lodash2['default'].map(this.props.questions,this.renderListRow)),


inProgressIndicator));


}return render;}()}]);return Questions;}(_react.Component);exports['default']=


Questions;