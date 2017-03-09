var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);



require('./NextCue.scss');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _=require('lodash');var

NextCue=function(_Component){_inherits(NextCue,_Component);
function NextCue(props){_classCallCheck(this,NextCue);return _possibleConstructorReturn(this,(NextCue.__proto__||Object.getPrototypeOf(NextCue)).call(this,
props));
}_createClass(NextCue,[{key:'render',value:function(){function render()

{

var response=this.props.response;

var cueText;
if(response.isCorrect){
if(this.props.nextQuestion&&this.props.nextOutcome){
cueText=
_react2['default'].createElement('p',{className:'cue-text'},
_react2['default'].createElement('span',null,'Good! Now let\'s '),
_react2['default'].createElement('span',{className:'bold'},this.props.nextOutcome.displayName),
_react2['default'].createElement('span',null,'.'));



}else if(this.props.nextQuestion&&!this.props.nextOutcome){
cueText=_react2['default'].createElement('p',{className:'cue-text'},'No outcome bug. Please notify your instructors.');

}else if(!this.props.nextQuestion&&!this.props.isLastTarget){
cueText=_react2['default'].createElement('p',{className:'cue-text'},'Good job! You\'ve reached the end of the route. Please try another Target question.');

}else if(this.props.isLastTarget){
cueText=_react2['default'].createElement('p',{className:'cue-text'},'Good job! You\'ve finished all the questions in this goal.');
}

}else{
if(this.props.nextQuestion&&this.props.nextOutcome){
cueText=
_react2['default'].createElement('p',{className:'cue-text'},
_react2['default'].createElement('span',null,'Not quite. Looks like you need to work on'),
_react2['default'].createElement('span',{className:'bold'},' ',this.props.nextOutcome.displayName),
_react2['default'].createElement('span',null,'.'));



}else if(this.props.nextQuestion&&!this.props.nextOutcome){
cueText=
_react2['default'].createElement('p',{className:'cue-text'},
_react2['default'].createElement('span',null,'Not quite. Let\'s try to '),
_react2['default'].createElement('span',{className:'bold'},this.props.outcome.displayName),
_react2['default'].createElement('span',null,' again.'));



}else if(!this.props.nextQuestion&&!this.props.nextOutcome){
cueText=_react2['default'].createElement('p',{className:'cue-text'},'Study the solution carefully and try another Target question.');
}
}

if(!this.props.nextQuestion){

}

return(
_react2['default'].createElement('div',{className:'answered-question-cue'},
cueText));


}return render;}()}]);return NextCue;}(_react.Component);


module.exports=NextCue;