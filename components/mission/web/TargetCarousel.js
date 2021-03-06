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
var statusText='Unattempted';
var image=void 0;
switch(status){
case'COMPLETE':
image=_react2['default'].createElement('img',{
alt:'Correct goal question',
className:'target-icon',
src:require('../../../assets/target-question--correct@2x.png'),__source:{fileName:_jsxFileName,lineNumber:41}});
statusText='Correct';
break;
case'FAIL':
image=_react2['default'].createElement('img',{
alt:'Incorrect goal question',
className:'target-icon',
src:require('../../../assets/target-question--incorrect@2x.png'),__source:{fileName:_jsxFileName,lineNumber:48}});
statusText='Incorrect goal question, route incomplete';
break;
case'NAVIGATED':
image=_react2['default'].createElement('img',{
alt:'Navigated goal question route',
className:'target-icon',
src:require('../../../assets/target-question--navigated@2x.png'),__source:{fileName:_jsxFileName,lineNumber:55}});
statusText='Incorrect goal question, route complete';
break;
case'PRISTINE':
image=_react2['default'].createElement('img',{
alt:'Unattempted goal question',
className:'target-icon',
src:require('../../../assets/target-question@2x.png'),__source:{fileName:_jsxFileName,lineNumber:62}});
break;

default:
console.warn('Warning: unrecognized status',status);
image=_react2['default'].createElement('img',{
alt:'Unattempted goal question',
src:require('../../../assets/target-question@2x.png'),__source:{fileName:_jsxFileName,lineNumber:70}});}



var isActive=targetNumber===(0,_mission.targetKey)(_this.props.currentTarget);
if(idx===0){
_this.buttonRefs=[];


}
var thumb=
_react2['default'].createElement('li',{key:target.id,className:isActive?"carousel-thumb is-active":"carousel-thumb",
onClick:function(){function onClick(){return _this.props.onSelectTarget(target);}return onClick;}(),__source:{fileName:_jsxFileName,lineNumber:83}},
_react2['default'].createElement('button',{className:'carousel-thumb__button',ref:function(){function ref(btn){return _this.buttonRefs.push(btn);}return ref;}(),
'aria-label':'Goal Question '+targetNumber+'; '+statusText,__source:{fileName:_jsxFileName,lineNumber:85}},
_react2['default'].createElement('div',{className:'flex-container align-center',__source:{fileName:_jsxFileName,lineNumber:87}},
image)));





return thumb;

};_this.buttonRefs=[];return _this;}_createClass(TargetCarousel,[{key:'componentDidUpdate',value:function(){function componentDidUpdate(){if(this.props.targets&&this.props.targets.length>0&&!this.props.currentTarget){_.compact(this.buttonRefs)[0].focus();}}return componentDidUpdate;}()},{key:'render',value:function(){function render()

{


if(!this.props.targets||
this.props.targets&&this.props.targets.length===0){
return(
_react2['default'].createElement('div',{__source:{fileName:_jsxFileName,lineNumber:104}}));

}

this.buttonRefs=[];
return(
_react2['default'].createElement('div',{id:'target-carousel',className:'carousel-container flex-container align-top',__source:{fileName:_jsxFileName,lineNumber:110}},
_react2['default'].createElement('ul',{className:'carousel flex-container align-center',__source:{fileName:_jsxFileName,lineNumber:111}},
_.map(this.props.targets,this._renderTarget))));



}return render;}()}]);return TargetCarousel;}(_react.Component);exports['default']=



TargetCarousel;