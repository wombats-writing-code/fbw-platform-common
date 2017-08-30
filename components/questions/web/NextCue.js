var _jsxFileName='src/components/questions/web/NextCue.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactRouter=require('react-router');

var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _mission=require('../../../selectors/mission');

require('./NextCue.scss');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

NextCue=function(_Component){_inherits(NextCue,_Component);
function NextCue(props){_classCallCheck(this,NextCue);return _possibleConstructorReturn(this,(NextCue.__proto__||Object.getPrototypeOf(NextCue)).call(this,
props));
}_createClass(NextCue,[{key:'render',value:function(){function render()

{

var response=this.props.response;
var cueText;
var targetCarouselPath=this.props.currentPath+'/#target-carousel';
var directiveCarouselPath=this.props.currentPath+'/#directive-carousel';

if(response.isCorrect){


if(this.props.nextQuestion&&this.props.nextOutcome){




if((0,_mission.isTarget)(this.props.nextQuestion)){
cueText=
_react2['default'].createElement('p',{className:'cue-text',__source:{fileName:_jsxFileName,lineNumber:31}},
_react2['default'].createElement('span',{__source:{fileName:_jsxFileName,lineNumber:32}},'Great, you got back to the goal! Let\'s try to '),
_react2['default'].createElement('span',{className:'bold',__source:{fileName:_jsxFileName,lineNumber:33}},' ',this.props.nextOutcome.displayName),
_react2['default'].createElement('span',{__source:{fileName:_jsxFileName,lineNumber:34}},' again.'));



}else{
cueText=
_react2['default'].createElement('p',{className:'cue-text',__source:{fileName:_jsxFileName,lineNumber:40}},
_react2['default'].createElement('span',{__source:{fileName:_jsxFileName,lineNumber:41}},'Good! Now let\'s '),
_react2['default'].createElement('span',{className:'bold',__source:{fileName:_jsxFileName,lineNumber:42}},this.props.nextOutcome.displayName),
_react2['default'].createElement('span',{__source:{fileName:_jsxFileName,lineNumber:43}},'.'));


}


}else if(this.props.nextQuestion&&!this.props.nextOutcome){
cueText=_react2['default'].createElement('p',{className:'cue-text',__source:{fileName:_jsxFileName,lineNumber:50}},'No outcome bug. Please notify your instructors.');



}else if(this.props.isFirstQuestion&&!this.props.nextQuestion&&!this.props.isLastTarget){
cueText=_react2['default'].createElement('p',{className:'cue-text',__source:{fileName:_jsxFileName,lineNumber:55}},'Nice! \u2009',
_react2['default'].createElement(_reactRouter.Link,{to:targetCarouselPath,className:'try-next-target',onClick:this.props.onClickTryNextTarget,__source:{fileName:_jsxFileName,lineNumber:56}},'Pick another goal question \u2191'));






}else if(!this.props.nextQuestion&&!this.props.isLastTarget){
cueText=_react2['default'].createElement('p',{className:'cue-text',__source:{fileName:_jsxFileName,lineNumber:64}},'Good job! You should now be able to do the next Goal question. \u2009',
_react2['default'].createElement(_reactRouter.Link,{to:targetCarouselPath,className:'try-next-target',__source:{fileName:_jsxFileName,lineNumber:65}},'Pick another goal question \u2191'));






}else if(this.props.isLastTarget){
cueText=_react2['default'].createElement('p',{className:'cue-text',__source:{fileName:_jsxFileName,lineNumber:73}},'You\'ve reached the end of this goal. Review this goal\'s questions again or',
_react2['default'].createElement(_reactRouter.Link,{to:directiveCarouselPath,className:'try-next-directive',__source:{fileName:_jsxFileName,lineNumber:74}},'select another goal.'));



}

}else{
if(this.props.nextQuestion&&this.props.nextOutcome){
cueText=
_react2['default'].createElement('p',{className:'cue-text',__source:{fileName:_jsxFileName,lineNumber:83}},
_react2['default'].createElement('span',{__source:{fileName:_jsxFileName,lineNumber:84}},'Not quite. Looks like you need to work on'),
_react2['default'].createElement('span',{className:'bold',__source:{fileName:_jsxFileName,lineNumber:85}},' ',this.props.nextOutcome.displayName),
_react2['default'].createElement('span',{__source:{fileName:_jsxFileName,lineNumber:86}},'.'));



}else if(this.props.nextQuestion&&!this.props.nextOutcome){
cueText=
_react2['default'].createElement('p',{className:'cue-text',__source:{fileName:_jsxFileName,lineNumber:92}},
_react2['default'].createElement('span',{__source:{fileName:_jsxFileName,lineNumber:93}},'Not quite. Let\'s try to '),
_react2['default'].createElement('span',{className:'bold',__source:{fileName:_jsxFileName,lineNumber:94}},this.props.outcome.displayName),
_react2['default'].createElement('span',{__source:{fileName:_jsxFileName,lineNumber:95}},' again.'));



}else if(!this.props.nextQuestion&&!this.props.nextOutcome){
cueText=_react2['default'].createElement('p',{className:'cue-text',__source:{fileName:_jsxFileName,lineNumber:100}},'Study the solution carefully and try another Goal question.');
}
}

if(!this.props.nextQuestion){

}

return(
_react2['default'].createElement('div',{className:'answered-question-cue',__source:{fileName:_jsxFileName,lineNumber:109}},
cueText));


}return render;}()}]);return NextCue;}(_react.Component);


module.exports=NextCue;