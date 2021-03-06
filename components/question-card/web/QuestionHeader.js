Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName='src/components/question-card/web/QuestionHeader.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);

require('./QuestionHeader.scss');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

QuestionHeader=function(_Component){_inherits(QuestionHeader,_Component);
function QuestionHeader(props){_classCallCheck(this,QuestionHeader);var _this=_possibleConstructorReturn(this,(QuestionHeader.__proto__||Object.getPrototypeOf(QuestionHeader)).call(this,
props));

_this.state={};return _this;


}_createClass(QuestionHeader,[{key:'componentWillMount',value:function(){function componentWillMount()

{


}return componentWillMount;}()},{key:'componentWillUnmount',value:function(){function componentWillUnmount()

{

}return componentWillUnmount;}()},{key:'render',value:function(){function render()

{
var showMoreIcon=void 0,toggleButtonLabel='';
var ariaExpanded=false;
if(this.props.isExpandable&&!this.props.isExpanded){
showMoreIcon=_react2['default'].createElement('img',{
'aria-hidden':true,
className:'expand-question-icon',
src:require('../../../assets/show-more--down@2x.png'),__source:{fileName:_jsxFileName,lineNumber:28}});
toggleButtonLabel='Show choices';

}else if(this.props.isExpandable&&this.props.isExpanded){
showMoreIcon=_react2['default'].createElement('img',{
'aria-hidden':true,
className:'expand-question-icon',
src:require('../../../assets/show-more--up@2x.png'),__source:{fileName:_jsxFileName,lineNumber:35}});
toggleButtonLabel='Hide choices';
ariaExpanded=true;
}

var toggleButton=void 0;
if(this.props.isExpandable){
toggleButton=
_react2['default'].createElement('button',{
'aria-expanded':ariaExpanded,
'aria-label':'Toggle choices and solution',
className:'expand-question-button',
onClick:this.props.onToggleExpand,__source:{fileName:_jsxFileName,lineNumber:46}},
showMoreIcon,
_react2['default'].createElement('p',{className:'question-header-text toggle-question-label',__source:{fileName:_jsxFileName,lineNumber:52}},toggleButtonLabel));


}

return(
_react2['default'].createElement('div',{className:'question-header flex-container align-center',__source:{fileName:_jsxFileName,lineNumber:58}},
this.props.questionTypeIcon,

_react2['default'].createElement('p',{className:'question-header-text',__source:{fileName:_jsxFileName,lineNumber:61}},
_react2['default'].createElement('span',{className:'bold',__source:{fileName:_jsxFileName,lineNumber:62}},'Goal:'),' ',this.props.headerText),

toggleButton));



}return render;}()}]);return QuestionHeader;}(_react.Component);


QuestionHeader.PropTypes={
questionTypeIcon:_react2['default'].PropTypes.string.isRequired,
onToggleExpand:_react2['default'].PropTypes.func};exports['default']=


QuestionHeader;