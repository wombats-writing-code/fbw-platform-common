Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName='src/components/mission/web/Mission.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactSpinner=require('react-spinner');var _reactSpinner2=_interopRequireDefault(_reactSpinner);
var _slug=require('slug');var _slug2=_interopRequireDefault(_slug);
var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _reactDocumentTitle=require('react-document-title');var _reactDocumentTitle2=_interopRequireDefault(_reactDocumentTitle);
var _reactModal=require('react-modal');var _reactModal2=_interopRequireDefault(_reactModal);
var _reactAriaLive=require('react-aria-live');
var _reactProgressbar=require('react-progressbar');var _reactProgressbar2=_interopRequireDefault(_reactProgressbar);

var _DirectiveCarouselContainer=require('../DirectiveCarouselContainer');var _DirectiveCarouselContainer2=_interopRequireDefault(_DirectiveCarouselContainer);
var _DirectiveCarousel=require('./DirectiveCarousel');var _DirectiveCarousel2=_interopRequireDefault(_DirectiveCarousel);


var _TargetCarouselContainer=require('../TargetCarouselContainer');var _TargetCarouselContainer2=_interopRequireDefault(_TargetCarouselContainer);
var _TargetCarousel=require('./TargetCarousel');var _TargetCarousel2=_interopRequireDefault(_TargetCarousel);


var _QuestionsContainer=require('../../questions/QuestionsContainer');var _QuestionsContainer2=_interopRequireDefault(_QuestionsContainer);
var _Questions=require('../../questions/web/Questions');var _Questions2=_interopRequireDefault(_Questions);


var _time=require('../../../utilities/time');
var _mission=require('../../../selectors/mission');


var _mission2=require('../../../reducers/mission');

require('./Mission.scss');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var DirectiveCarousel=(0,_DirectiveCarouselContainer2['default'])(_DirectiveCarousel2['default']);var TargetCarousel=(0,_TargetCarouselContainer2['default'])(_TargetCarousel2['default']);var Questions=(0,_QuestionsContainer2['default'])(_Questions2['default']);
var styles={
container:{
height:'100%'}};





if(process.env.NODE_ENV!=='test'){


_reactModal2['default'].setAppElement('#root');
}var

Mission=function(_Component){_inherits(Mission,_Component);
function Mission(props){_classCallCheck(this,Mission);var _this=_possibleConstructorReturn(this,(Mission.__proto__||Object.getPrototypeOf(Mission)).call(this,
props));_initialiseProps.call(_this);
_this.state={
closeModal:true};return _this;

}_createClass(Mission,[{key:'componentDidMount',value:function(){function componentDidMount()
{var _this2=this;
this.div.focus();
this.onCheckMissionDone();

var missionState=(0,_time.checkMissionStatus)(this.props.mission);
var mission=this.props.params&&this.props.missions?
_lodash2['default'].find(this.props.missions,function(m){return(0,_slug2['default'])(m.displayName)===(0,_slug2['default'])(_this2.props.params.missionName);}):
this.props.mission;






if(!this.props.doNotTakeMission&&!this.props.isGetMissionInProgress&&missionState!=='over'){
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



































{var _this3=this;



var content=void 0;
var renderContent=true;
var status=this.calculateStatus();
var routeProgress=100*status.finished/status.numberGoals;
var progressString=status.finished+' / '+status.numberGoals+' finished';
var summaryString=status.correct+' out of '+status.attempted;
var statusModal=
_react2['default'].createElement(_reactModal2['default'],{
onAfterOpen:this.onOpenModal,
onBeforeClose:this.onClickReturnToDirectiveCarousel,
isOpen:!this.state.closeModal,
contentLabel:'Completed Mission Summary',__source:{fileName:_jsxFileName,lineNumber:125}},

_react2['default'].createElement('div',{
'aria-label':'You\'ve answered all the goal questions for this mission. You correctly answered '+summaryString+' goal questions. Feel free to return to the mission and review your questions.',
ref:function(){function ref(modal){_this3.modal=modal;}return ref;}(),
tabIndex:-1,__source:{fileName:_jsxFileName,lineNumber:131}},
_react2['default'].createElement('h3',{__source:{fileName:_jsxFileName,lineNumber:135}},'Mission complete!'),
_react2['default'].createElement('div',{className:'modal-contents',__source:{fileName:_jsxFileName,lineNumber:136}},
_react2['default'].createElement('p',{__source:{fileName:_jsxFileName,lineNumber:137}},'Congratulations, you\'ve answered all the goal questions for this mission.'),


_react2['default'].createElement('p',{__source:{fileName:_jsxFileName,lineNumber:140}},'You correctly answered ',
summaryString,' goal questions.'),

_react2['default'].createElement('p',{__source:{fileName:_jsxFileName,lineNumber:143}},'Feel free to close this dialog window and review the questions, or quit the Fly-by-Wire application.')),




_react2['default'].createElement('button',{
'aria-label':'Return to mission',
className:'close-modal-button',
onClick:this.onCloseModal,__source:{fileName:_jsxFileName,lineNumber:148}},'Return to Mission')));




if(this.props.isGetMissionInProgress){
content=_react2['default'].createElement(_reactSpinner2['default'],{__source:{fileName:_jsxFileName,lineNumber:157}});
renderContent=false;
}

if(!this.props.isGetMissionInProgress&&this.props.mission){

var missionState=(0,_time.checkMissionStatus)(this.props.mission);

if(this.props.mission.goals.length===0&&this.props.mission.type===_mission2.missionConfig.PHASE_II_MISSION_TYPE){
content=
_react2['default'].createElement('div',{style:[styles.container,{paddingTop:80,paddingLeft:30}],__source:{fileName:_jsxFileName,lineNumber:167}},
_react2['default'].createElement('div',{__source:{fileName:_jsxFileName,lineNumber:168}},'Congratulations! You aced the Phase I mission, so you have no Phase II questions.'),
_react2['default'].createElement('div',{__source:{fileName:_jsxFileName,lineNumber:169}},'We encourage you to review your Phase I mission before your exam.'));


renderContent=false;
}else if(this.props.mission.questions.length===0&&missionState==="over"){
content=
_react2['default'].createElement('div',{style:[styles.container,{paddingTop:80,paddingLeft:30}],__source:{fileName:_jsxFileName,lineNumber:175}},
_react2['default'].createElement('div',{__source:{fileName:_jsxFileName,lineNumber:176}},'This mission is over. You didn\'t open it while it was open, so you have no results here.'));


renderContent=false;
}
}

if(renderContent){
content=
_react2['default'].createElement('div',{__source:{fileName:_jsxFileName,lineNumber:185}},
_react2['default'].createElement('div',{className:'status-wrapper',__source:{fileName:_jsxFileName,lineNumber:186}},
_react2['default'].createElement('div',{className:'progress-bar-wrapper',__source:{fileName:_jsxFileName,lineNumber:187}},
_react2['default'].createElement(_reactProgressbar2['default'],{completed:routeProgress,color:'hsla(124,93%,20%,1)',__source:{fileName:_jsxFileName,lineNumber:188}})),

_react2['default'].createElement(_reactAriaLive.LiveMessage,{message:progressString,'aria-live':'polite',__source:{fileName:_jsxFileName,lineNumber:190}}),
_react2['default'].createElement('h4',{className:'current-status-heading',__source:{fileName:_jsxFileName,lineNumber:191}},
progressString)),


_react2['default'].createElement('nav',{
tabIndex:-1,
role:'navigation',
'aria-label':'Directives Menu',
ref:function(){function ref(directives){_this3.directiveCarouselRef=directives;}return ref;}(),__source:{fileName:_jsxFileName,lineNumber:195}},
_react2['default'].createElement(DirectiveCarousel,{directives:this.props.directives,
currentDirectiveIndex:this.props.currentDirectiveIndex,
directiveIndicators:this.props.directiveIndicators,
onSelectDirective:this._onSelectDirective,__source:{fileName:_jsxFileName,lineNumber:200}})),


_react2['default'].createElement('nav',{
tabIndex:-1,
className:'nav-target-carousel',
role:'navigation',
'aria-label':'Target Questions Menu',
ref:function(){function ref(targets){_this3.targetCarouselRef=targets;}return ref;}(),__source:{fileName:_jsxFileName,lineNumber:206}},
_react2['default'].createElement(TargetCarousel,{
onSelectTarget:this._onSelectTarget,
mission:this.props.mission,__source:{fileName:_jsxFileName,lineNumber:212}})),


_react2['default'].createElement('main',{
tabIndex:-1,
ref:function(){function ref(questions){_this3.questionsRef=questions;}return ref;}(),__source:{fileName:_jsxFileName,lineNumber:217}},
_react2['default'].createElement(Questions,{
mission:this.props.mission,
isSubmitEnabled:this.props.doNotTakeMission?false:undefined,
onClickReturnToTargetCarousel:this.onClickReturnToTargetCarousel,
onClickReturnToDirectiveCarousel:this.onClickReturnToDirectiveCarousel,__source:{fileName:_jsxFileName,lineNumber:220}})),


statusModal);


}

return(
_react2['default'].createElement(_reactDocumentTitle2['default'],{title:'Mission: '+this.props.mission.displayName,__source:{fileName:_jsxFileName,lineNumber:233}},
_react2['default'].createElement('div',{
ref:function(){function ref(div){_this3.div=div;}return ref;}(),
tabIndex:-1,__source:{fileName:_jsxFileName,lineNumber:234}},
_react2['default'].createElement(_reactAriaLive.LiveMessage,{message:'Mission: '+this.props.mission.displayName,'aria-live':'polite',__source:{fileName:_jsxFileName,lineNumber:237}}),
content)));




}return render;}()}]);return Mission;}(_react.Component);var _initialiseProps=function(){function _initialiseProps(){var _this4=this;this.componentWillReceiveProps=function(nextProps){var status=_this4.calculateStatus(nextProps);var previousStatus=_this4.calculateStatus();if(_this4.state.closeModal&&status.unfinished===0&&status.finished>0&&previousStatus.unfinished!==status.unfinished){_this4.onCheckMissionDone();}};this.calculateStatus=function(props){var currentProps=props;if(!currentProps){currentProps=_this4.props;}var missionQuestionsFlat=_lodash2['default'].flattenDeep(currentProps.mission.questions);var targetQuestions=(0,_mission.grabTargetQuestionsFromMission)(missionQuestionsFlat);var unfinishedGoalQs=(0,_mission.numberUnfinishedRoutes)(missionQuestionsFlat);var totalGoals=currentProps.mission.questions?targetQuestions.length:0;return{correct:(0,_mission.numberCorrectTargets)(targetQuestions),attempted:(0,_mission.numberAttemptedTargets)(targetQuestions),numberGoals:totalGoals,finished:totalGoals-unfinishedGoalQs,unfinished:unfinishedGoalQs,unattempted:(0,_mission.numberUnattemptedTargets)(targetQuestions)};};this.

_onSelectDirective=function(index){
_this4.targetCarouselRef.focus();
_this4.props.onSelectDirective(index);
};this.

_onSelectTarget=function(target){
_this4.questionsRef.focus();



window.scrollTo(0,0);

_this4.props.onSelectTarget(target);
};this.

onClickReturnToTargetCarousel=function(){
_this4.targetCarouselRef.focus();
};this.

onClickReturnToDirectiveCarousel=function(){
_this4.directiveCarouselRef.focus();
};this.

onOpenModal=function(){
_this4.modal.focus();
};this.

onCheckMissionDone=function(){


setTimeout(function(){
var status=_this4.calculateStatus();


if(_this4.state.closeModal&&status.unfinished===0&&status.finished>0){
_this4.setState({closeModal:false});
}
},3000);
};this.

onCloseModal=function(){
_this4.setState({closeModal:true});
_this4.directiveCarouselRef.focus();
};}return _initialiseProps;}();exports['default']=


Mission;