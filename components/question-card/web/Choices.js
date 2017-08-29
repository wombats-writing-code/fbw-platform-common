Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName='src/components/question-card/web/Choices.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);



require('./Choices.scss');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _=require('lodash');var Alphabet=['a','b','c','d','e','f','g','h','i','j'];var

Choices=function(_Component){_inherits(Choices,_Component);
function Choices(){_classCallCheck(this,Choices);var _this=_possibleConstructorReturn(this,(Choices.__proto__||Object.getPrototypeOf(Choices)).call(this));_this.














renderChoice=function(choice,idx,responseId){

var respondedChoiceIcon=void 0;

if(responseId&&responseId===choice.id){
var imageId='response-image-'+choice.id;
if(_this.props.isResponseCorrect){
respondedChoiceIcon=_react2['default'].createElement('img',{
alt:'Correct',
className:'responded-choice-icon',
src:require('../../../assets/responseType--correct@2x.png'),__source:{fileName:_jsxFileName,lineNumber:30}});

}else{
respondedChoiceIcon=_react2['default'].createElement('img',{
alt:'Incorrect',
className:'responded-choice-icon',
src:require('../../../assets/responseType--incorrect@2x.png'),__source:{fileName:_jsxFileName,lineNumber:36}});
}
}

var isChoiceSelected=responseId&&responseId===choice.id||
_this.props.selectedChoiceId===choice.id;

var inactiveStyle={pointerEvents:'none',cursor:'default'};

return(
_react2['default'].createElement('li',{
key:choice.id,
className:isChoiceSelected?"choice is-selected":"choice",
style:responseId&&inactiveStyle,__source:{fileName:_jsxFileName,lineNumber:49}},
_react2['default'].createElement('button',{className:'choice__button',
onClick:function(){function onClick(){return _this.props.onSelectChoice(choice.id);}return onClick;}(),
ref:function(){function ref(btn){return _this.choiceButtonRefs.push(btn);}return ref;}(),__source:{fileName:_jsxFileName,lineNumber:53}},

_react2['default'].createElement('div',{
'aria-live':'rude',
role:'region',
className:'choice__row flex-container align-center',__source:{fileName:_jsxFileName,lineNumber:57}},
_react2['default'].createElement('span',{className:'choice__label',__source:{fileName:_jsxFileName,lineNumber:61}},
Alphabet[idx],')'),


_react2['default'].createElement('div',{className:'choice__text',dangerouslySetInnerHTML:{__html:choice.text},__source:{fileName:_jsxFileName,lineNumber:65}}),
respondedChoiceIcon))));




};_this.choiceButtonRefs=[];return _this;}_createClass(Choices,[{key:'componentDidMount',value:function(){function componentDidMount(){}return componentDidMount;}()},{key:'render',value:function(){function render()

{
if(!this.props.choices)return null;

return(
_react2['default'].createElement('ul',{
className:'choices',
'aria-controls':'submitBtn',__source:{fileName:_jsxFileName,lineNumber:77}},
_.map(this.props.choices,_.partial(this.renderChoice,_,_,this.props.responseId))));


}return render;}()}]);return Choices;}(_react.Component);


Choices.propTypes={
selectedChoiceId:_react2['default'].PropTypes.string,
choices:_react2['default'].PropTypes.array.isRequired,
responseId:_react2['default'].PropTypes.string,
isResponseCorrect:_react2['default'].PropTypes.bool,
onSelectChoice:_react2['default'].PropTypes.func.isRequired};exports['default']=


Choices;