Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName='src/components/login/web/Login.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactRouter=require('react-router');
var _slug=require('slug');var _slug2=_interopRequireDefault(_slug);
var _reactDocumentTitle=require('react-document-title');var _reactDocumentTitle2=_interopRequireDefault(_reactDocumentTitle);
var _reactAriaLive=require('react-aria-live');

require('./Login.scss');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

Login=function(_Component){_inherits(Login,_Component);
function Login(){_classCallCheck(this,Login);var _this=_possibleConstructorReturn(this,(Login.__proto__||Object.getPrototypeOf(Login)).call(this));_this.



































































































_handleACCLogin=function(){
window.open(_this.props.authenticationUrl,'_self');
};_this.state={guestName:'',isVisitorLoginVisible:false};return _this;}_createClass(Login,[{key:'componentDidMount',value:function(){function componentDidMount(){if(this.props.d2lUserIdentifer){this.props.logout();}}return componentDidMount;}()},{key:'render',value:function(){function render(){var _this2=this;var props=this.props;var loginButtonText=void 0;if(props.isLoginInProgress){loginButtonText=_react2['default'].createElement('div',{className:'',__source:{fileName:_jsxFileName,lineNumber:30}},'Logging you in...');}else{loginButtonText=_react2['default'].createElement('div',{className:'',__source:{fileName:_jsxFileName,lineNumber:32}},'Login');}var loginButton=_react2['default'].createElement('button',{disabled:true,className:'login-button login-button--guest login-button--guest--disabled',__source:{fileName:_jsxFileName,lineNumber:37}},'Login \u2192');if(this._cleanGuestUsername(this.state.guestName)!==''){loginButton=_react2['default'].createElement('button',{className:'login-button login-button--guest',onClick:function(){function onClick(){return _this2._handleGuestLogin(_this2.state.guestName);}return onClick;}(),__source:{fileName:_jsxFileName,lineNumber:42}},'Login \u2192');}return _react2['default'].createElement(_reactDocumentTitle2['default'],{title:'Login',__source:{fileName:_jsxFileName,lineNumber:49}},_react2['default'].createElement('div',{className:'login',__source:{fileName:_jsxFileName,lineNumber:50}},_react2['default'].createElement(_reactAriaLive.LiveMessage,{message:'Login to fly-by-wire','aria-live':'polite',__source:{fileName:_jsxFileName,lineNumber:51}}),_react2['default'].createElement('div',{className:'app-name text-center clearfix',__source:{fileName:_jsxFileName,lineNumber:52}},_react2['default'].createElement('div',{className:'medium-7 large-5 columns medium-centered',__source:{fileName:_jsxFileName,lineNumber:53}},_react2['default'].createElement('img',{alt:'Fly-by-Wire',className:'app-logo',src:require('../../../assets/fbw-web-icon.png'),__source:{fileName:_jsxFileName,lineNumber:54}}))),_react2['default'].createElement('div',{className:'row',__source:{fileName:_jsxFileName,lineNumber:58}},_react2['default'].createElement('div',{className:'medium-5 large-4 medium-centered columns',__source:{fileName:_jsxFileName,lineNumber:59}},_react2['default'].createElement('button',{className:'login-button login-button--d2l ',onClick:function(){function onClick(){return _this2._handleACCLogin();}return onClick;}(),__source:{fileName:_jsxFileName,lineNumber:60}},_react2['default'].createElement('img',{'aria-hidden':true,className:'login-button__image',src:require('../../../assets/myACC.png'),__source:{fileName:_jsxFileName,lineNumber:61}}),'Arapahoe'))),_react2['default'].createElement('div',{className:'row',__source:{fileName:_jsxFileName,lineNumber:67}},_react2['default'].createElement('div',{className:'medium-7 large-6 medium-centered columns',__source:{fileName:_jsxFileName,lineNumber:68}},_react2['default'].createElement('p',{className:'login__guest-prompt text-center',__source:{fileName:_jsxFileName,lineNumber:69}},'Not Arapahoe? Login with your username / password: '),_react2['default'].createElement('div',{className:'flex-container space-between align-center',__source:{fileName:_jsxFileName,lineNumber:70}},_react2['default'].createElement('input',{className:'input login__guest-input',placeholder:'Username',value:this.state.guestName,onChange:function(){function onChange(e){return _this2.setState({guestName:e.target.value});}return onChange;}(),__source:{fileName:_jsxFileName,lineNumber:71}}),loginButton),_react2['default'].createElement('a',{className:'login__guest-prompt text-center',href:'/register',__source:{fileName:_jsxFileName,lineNumber:76}},'Register'))),_react2['default'].createElement('div',{className:'row',__source:{fileName:_jsxFileName,lineNumber:80}},_react2['default'].createElement('div',{className:'medium-6 columns medium-centered',__source:{fileName:_jsxFileName,lineNumber:81}},_react2['default'].createElement('hr',{className:'divider',__source:{fileName:_jsxFileName,lineNumber:82}}))),_react2['default'].createElement('div',{className:'row',__source:{fileName:_jsxFileName,lineNumber:86}},_react2['default'].createElement('div',{className:'medium-6 columns medium-centered',__source:{fileName:_jsxFileName,lineNumber:87}},_react2['default'].createElement('p',{className:'contact',__source:{fileName:_jsxFileName,lineNumber:88}},_react2['default'].createElement('b',{__source:{fileName:_jsxFileName,lineNumber:89}},'Say hello'),' ',_react2['default'].createElement('a',{href:'mailto:fly-by-wire@mit.edu',__source:{fileName:_jsxFileName,lineNumber:89}},'fly-by-wire@mit.edu'),'\u2002 \u2022 \u2002 ',_react2['default'].createElement('b',{__source:{fileName:_jsxFileName,lineNumber:90}},'Learn more'),' ',_react2['default'].createElement('a',{href:'http://fbw.mit.edu',target:'_blank',__source:{fileName:_jsxFileName,lineNumber:90}},'Fly by Wire '),'\u2002 \u2022 \u2002 ',_react2['default'].createElement('b',{__source:{fileName:_jsxFileName,lineNumber:91}},'Explore'),' ',_react2['default'].createElement('a',{href:'http://mapping.mit.edu',target:'_blank',__source:{fileName:_jsxFileName,lineNumber:91}},'MIT Mapping Lab'),'\u2002 \u2022 \u2002 ',_react2['default'].createElement('b',{__source:{fileName:_jsxFileName,lineNumber:92}},'Funded by'),' ',_react2['default'].createElement('a',{href:'https://fipsedatabase.ed.gov/fipse/',target:'_blank',__source:{fileName:_jsxFileName,lineNumber:92}},'US Department of Education'))))));}return render;}()},{key:'_cleanGuestUsername',value:function(){function _cleanGuestUsername(name){return(0,_slug2['default'])(_lodash2['default'].trim(_lodash2['default'].lowerCase(name)));}return _cleanGuestUsername;}()},{key:'_handleGuestLogin',value:function(){function _handleGuestLogin(name){window.open(this.props.guestAuthenticationUrl+'&name='+this._cleanGuestUsername(name),'_self');}return _handleGuestLogin;}()}]);return Login;}(_react.Component);exports['default']=



Login;