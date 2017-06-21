Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactSpinner=require('react-spinner');var _reactSpinner2=_interopRequireDefault(_reactSpinner);
var _slug=require('slug');var _slug2=_interopRequireDefault(_slug);

var _DirectiveCarouselContainer=require('../DirectiveCarouselContainer');var _DirectiveCarouselContainer2=_interopRequireDefault(_DirectiveCarouselContainer);
var _DirectiveCarousel=require('./DirectiveCarousel');var _DirectiveCarousel2=_interopRequireDefault(_DirectiveCarousel);


var _TargetCarouselContainer=require('../TargetCarouselContainer');var _TargetCarouselContainer2=_interopRequireDefault(_TargetCarouselContainer);
var _TargetCarousel=require('./TargetCarousel');var _TargetCarousel2=_interopRequireDefault(_TargetCarousel);


var _QuestionsContainer=require('../../questions/QuestionsContainer');var _QuestionsContainer2=_interopRequireDefault(_QuestionsContainer);
var _Questions=require('../../questions/web/Questions');var _Questions2=_interopRequireDefault(_Questions);


var _time=require('../../../utilities/time');

require('./Mission.scss');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var DirectiveCarousel=(0,_DirectiveCarouselContainer2['default'])(_DirectiveCarousel2['default']);var TargetCarousel=(0,_TargetCarouselContainer2['default'])(_TargetCarousel2['default']);var Questions=(0,_QuestionsContainer2['default'])(_Questions2['default']);
var styles={
container:{
height:'100%'}};var



Mission=function(_Component){_inherits(Mission,_Component);function Mission(){_classCallCheck(this,Mission);return _possibleConstructorReturn(this,(Mission.__proto__||Object.getPrototypeOf(Mission)).apply(this,arguments));}_createClass(Mission,[{key:'componentDidMount',value:function(){function componentDidMount()
{var _this2=this;
var missionState=(0,_time.checkMissionStatus)(this.props.mission);
var mission=this.props.params&&this.props.missions?
_.find(this.props.missions,function(m){return(0,_slug2['default'])(m.displayName)===(0,_slug2['default'])(_this2.props.params.missionName);}):
this.props.mission;






if(!this.props.isGetMissionInProgress&&missionState!=='over'){
this.props.onSelectOpenMission({
course:this.props.course,
mission:mission,
user:this.props.user});


}else if(missionState==='over'){
this.props.onSelectClosedMission({
course:this.props.course,
mission:mission,
user:this.props.user});

}
}return componentDidMount;}()},{key:'render',value:function(){function render()

{


var loadingIndicator=void 0;
if(this.props.isGetMissionInProgress){
return _react2['default'].createElement(_reactSpinner2['default'],null);
}

if(this.props.mission){

var missionState=(0,_time.checkMissionStatus)(this.props.mission);


if(this.props.mission.questions.length===0&&missionState==="over"){

return(
_react2['default'].createElement('div',{style:[styles.container,{paddingTop:80,paddingLeft:30}]},
_react2['default'].createElement('div',null,'This mission is over. You didn\'t open it while it was open, so you have no results here.')));


}
}

return(
_react2['default'].createElement('div',null,
_react2['default'].createElement('nav',{role:'navigation','aria-label':'Directives Menu'},
_react2['default'].createElement(DirectiveCarousel,{directives:this.props.directives,
currentDirectiveIndex:this.props.currentDirectiveIndex,
directiveIndicators:this.props.directiveIndicators,
onSelectDirective:this.props.onSelectDirective})),


_react2['default'].createElement('nav',{className:'nav-target-carousel',role:'navigation','aria-label':'Target Questions Menu'},
_react2['default'].createElement(TargetCarousel,{mission:this.props.mission})),

_react2['default'].createElement('main',null,
_react2['default'].createElement(Questions,{mission:this.props.mission})),


loadingIndicator));


}return render;}()}]);return Mission;}(_react.Component);exports['default']=



Mission;