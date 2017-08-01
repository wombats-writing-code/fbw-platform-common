'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName='src/components/mission/web/TargetCarousel.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();

var _react=require('react');var _react2=_interopRequireDefault(_react);
var _mission=require('../../../selectors/mission');



require('./TargetCarousel.scss');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var _=require('lodash');var

TargetCarousel=function(_Component){_inherits(TargetCarousel,_Component);
function TargetCarousel(){_classCallCheck(this,TargetCarousel);var _this=_possibleConstructorReturn(this,(TargetCarousel.__proto__||Object.getPrototypeOf(TargetCarousel)).call(this));_this.












_renderTarget=function(target,idx){
var targetNumber=(0,_mission.targetKey)(target);
var sectionQuestions=_this.props.currentMissionSections[_this.props.currentDirectiveIndex];
var targetRouteQuestions=sectionQuestions[idx];








var status=(0,_mission.targetStatus)(target,targetRouteQuestions);
var image=void 0;
switch(status){
case'COMPLETE':
image=_react2['default'].createElement('img',{className:'target-icon',src:require('../../../assets/target-question--correct@2x.png'),__source:{fileName:_jsxFileName,lineNumber:40}});
break;
case'FAIL':
image=_react2['default'].createElement('img',{className:'target-icon',src:require('../../../assets/target-question--incorrect@2x.png'),__source:{fileName:_jsxFileName,lineNumber:43}});
break;
case'NAVIGATED':
image=_react2['default'].createElement('img',{className:'target-icon',src:require('../../../assets/target-question--navigated@2x.png'),__source:{fileName:_jsxFileName,lineNumber:46}});
break;
case'PRISTINE':
image=_react2['default'].createElement('img',{className:'target-icon',src:require('../../../assets/target-question@2x.png'),__source:{fileName:_jsxFileName,lineNumber:49}});
break;

default:
console.warn('Warning: unrecognized status',status);
image=_react2['default'].createElement('img',{src:require('../../../assets/target-question@2x.png'),__source:{fileName:_jsxFileName,lineNumber:54}});}


var accessibilityLabel='Target Question '+target.displayName;
var isActive=targetNumber===(0,_mission.targetKey)(_this.props.currentTarget);
if(idx===0){
_this.buttonRefs=[];


}
var thumb=
_react2['default'].createElement('li',{key:target.id,className:isActive?"carousel-thumb is-active":"carousel-thumb",
onClick:function(){function onClick(){return _this.props.onSelectTarget(target);}return onClick;}(),__source:{fileName:_jsxFileName,lineNumber:65}},
_react2['default'].createElement('button',{className:'carousel-thumb__button',ref:function(){function ref(btn){return _this.buttonRefs.push(btn);}return ref;}(),
'aria-label':'Target Question '+targetNumber,__source:{fileName:_jsxFileName,lineNumber:67}},
_react2['default'].createElement('div',{className:'flex-container align-center',__source:{fileName:_jsxFileName,lineNumber:69}},
image,
_react2['default'].createElement('p',{className:'carousel-thumb__text carousel-thumb__text--target',__source:{fileName:_jsxFileName,lineNumber:71}},'#',target.referenceNumber))));





return thumb;

};_this.buttonRefs=[];return _this;}_createClass(TargetCarousel,[{key:'componentDidUpdate',value:function(){function componentDidUpdate(){if(this.props.targets&&this.props.targets.length>0&&!this.props.currentTarget){_.compact(this.buttonRefs)[0].focus();}}return componentDidUpdate;}()},{key:'render',value:function(){function render()

{


if(!this.props.targets||
this.props.targets&&this.props.targets.length===0){
return(
_react2['default'].createElement('div',{__source:{fileName:_jsxFileName,lineNumber:87}}));

}

this.buttonRefs=[];
return(
_react2['default'].createElement('div',{className:'carousel-container flex-container align-top',__source:{fileName:_jsxFileName,lineNumber:93}},
_react2['default'].createElement('ul',{className:'carousel flex-container align-center',__source:{fileName:_jsxFileName,lineNumber:94}},
_.map(this.props.targets,this._renderTarget))));



}return render;}()}]);return TargetCarousel;}(_react.Component);exports['default']=



TargetCarousel;