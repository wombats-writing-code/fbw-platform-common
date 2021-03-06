'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName='src/components/mission/web/DirectiveCarousel.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _react=require('react');var _react2=_interopRequireDefault(_react);
var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);

require('./DirectiveCarousel.scss');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

DirectiveCarousel=function(_Component){_inherits(DirectiveCarousel,_Component);function DirectiveCarousel(){var _ref;var _temp,_this,_ret;_classCallCheck(this,DirectiveCarousel);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=DirectiveCarousel.__proto__||Object.getPrototypeOf(DirectiveCarousel)).call.apply(_ref,[this].concat(args))),_this),_this.

_renderThumb=function(directive,idx){


var indicatorText=void 0;
var indicatorStyle='carousel-thumb__icon';

if(_this.props.directiveIndicators){
var indicator=_this.props.directiveIndicators[idx];


if(indicator.isComplete&&indicator.isMastered){
indicatorText='Achieved';
indicatorStyle+=' carousel-thumb__achieved';


}else if(indicator.isComplete&&!indicator.isMastered){
indicatorText='Completed';
indicatorStyle+=' carousel-thumb__tried';



}else{
var numberRemaining=indicator?indicator.denominator-indicator.numerator:'?';
indicatorText='Unfinished ('+numberRemaining+')';
indicatorStyle+=' carousel-thumb__unfinished';

}
}

var displayName=directive?directive.displayName:'Error. Somehow this outcome is undefined';


var isActive=idx===_this.props.currentDirectiveIndex;
var thumb=
_react2['default'].createElement('div',{key:idx,
className:isActive?"carousel-thumb is-active carousel-thumb--directive":"carousel-thumb carousel-thumb--directive",__source:{fileName:_jsxFileName,lineNumber:44}},
_react2['default'].createElement('button',{className:'carousel-thumb__button',onClick:function(){function onClick(){return _this.props.onSelectDirective(idx);}return onClick;}(),
'aria-label':'Learning Outcome: '+displayName+'; '+indicatorText,__source:{fileName:_jsxFileName,lineNumber:46}},
_react2['default'].createElement('div',{className:'flex-container align-bottom space-between prewrap',__source:{fileName:_jsxFileName,lineNumber:48}},
_react2['default'].createElement('span',{className:indicatorStyle,__source:{fileName:_jsxFileName,lineNumber:49}},
indicatorText),

_react2['default'].createElement('p',{className:'carousel-thumb__text',__source:{fileName:_jsxFileName,lineNumber:52}},displayName))));





return thumb;
},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(DirectiveCarousel,[{key:'render',value:function(){function render()

{













var directivesCarousel=void 0;
if(this.props.directives&&this.props.directives.length>0){
directivesCarousel=
_react2['default'].createElement('div',{className:'carousel-container directive-carousel',__source:{fileName:_jsxFileName,lineNumber:78}},
_react2['default'].createElement('div',{className:'carousel flex-container',__source:{fileName:_jsxFileName,lineNumber:79}},
_lodash2['default'].map(this.props.directives,this._renderThumb)));



}

return(
_react2['default'].createElement('div',{id:'directive-carousel',className:'',__source:{fileName:_jsxFileName,lineNumber:87}},
directivesCarousel));



}return render;}()}]);return DirectiveCarousel;}(_react.Component);exports['default']=


DirectiveCarousel;