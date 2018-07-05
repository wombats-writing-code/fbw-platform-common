Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName='src/components/login/web/Login.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactRouter=require('react-router');
var _slug=require('slug');var _slug2=_interopRequireDefault(_slug);
var _reactDocumentTitle=require('react-document-title');var _reactDocumentTitle2=_interopRequireDefault(_reactDocumentTitle);
var _reactAriaLive=require('react-aria-live');

var _selectors=require('../../../selectors');

require('./Login.scss');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

Login=function(_Component){_inherits(Login,_Component);
function Login(){_classCallCheck(this,Login);var _this=_possibleConstructorReturn(this,(Login.__proto__||Object.getPrototypeOf(Login)).call(this));_this.



















































































































































_handleGuestLogin=function(){
_this.props.handleGuestLogin({
Identifier:_this.state.guestIdentifier,
password:_this.state.guestPassword});

};_this.

_handleACCLogin=function(){
window.open(_this.props.authenticationUrl,'_self');
};_this.state={guestIdentifier:'',guestPassword:'',isVisitorLoginVisible:false};return _this;}_createClass(Login,[{key:'componentDidMount',value:function(){function componentDidMount(){if(this.props.d2lUserIdentifer){this.props.logout();}}return componentDidMount;}()},{key:'componentDidUpdate',value:function(){function componentDidUpdate(prevProps,prevState){if(!prevProps.isLoggedIn&&this.props.isLoggedIn){window.open('/guest-callback?name='+this.state.guestIdentifier,'_self');}}return componentDidUpdate;}()},{key:'render',value:function(){function render(){var _this2=this;var props=this.props;var loginButtonText=void 0;if(props.isLoginInProgress){loginButtonText=_react2['default'].createElement('div',{className:'',__source:{fileName:_jsxFileName,lineNumber:40}},'Logging you in...');}else{loginButtonText=_react2['default'].createElement('div',{className:'',__source:{fileName:_jsxFileName,lineNumber:42}},'Login');}var loginButton=_react2['default'].createElement('button',{disabled:true,className:'login-button login-button--guest login-button--guest--disabled',__source:{fileName:_jsxFileName,lineNumber:47}},'Login \u2192');if(this._cleanGuestUsername(this.state.guestIdentifier)!==''&&this.state.guestPassword!==''){loginButton=_react2['default'].createElement('button',{className:'login-button login-button--guest',onClick:function(){function onClick(){return _this2._handleGuestLogin();}return onClick;}(),__source:{fileName:_jsxFileName,lineNumber:53}},'Login \u2192');}var resetPasswordLink=void 0;if(props.errorMessage){resetPasswordLink=_react2['default'].createElement('div',{__source:{fileName:_jsxFileName,lineNumber:62}},'Did you forget your password? You can ',_react2['default'].createElement('a',{href:'/reset-password',__source:{fileName:_jsxFileName,lineNumber:63}},'reset it here'),'.');}var guestLoginText=_react2['default'].createElement('span',{__source:{fileName:_jsxFileName,lineNumber:69}},_react2['default'].createElement('p',{className:'login__guest-prompt text-center',__source:{fileName:_jsxFileName,lineNumber:70}},'Not Arapahoe? Login with your e-mail address and password or '),_react2['default'].createElement('a',{className:'login__guest-registration',href:'/register',__source:{fileName:_jsxFileName,lineNumber:71}},'register a new guest account'));if((0,_selectors.isInstructorApp)()){guestLoginText=_react2['default'].createElement('span',{__source:{fileName:_jsxFileName,lineNumber:77}},_react2['default'].createElement('p',{className:'login__guest-prompt text-center',__source:{fileName:_jsxFileName,lineNumber:78}},'Not Arapahoe? Login with your e-mail address and password'));}return _react2['default'].createElement(_reactDocumentTitle2['default'],{title:'Login',__source:{fileName:_jsxFileName,lineNumber:84}},_react2['default'].createElement('div',{className:'login',__source:{fileName:_jsxFileName,lineNumber:85}},_react2['default'].createElement(_reactAriaLive.LiveMessage,{message:'Login to fly-by-wire','aria-live':'polite',__source:{fileName:_jsxFileName,lineNumber:86}}),_react2['default'].createElement('div',{className:'app-name text-center clearfix',__source:{fileName:_jsxFileName,lineNumber:87}},_react2['default'].createElement('div',{className:'medium-7 large-5 columns medium-centered',__source:{fileName:_jsxFileName,lineNumber:88}},_react2['default'].createElement('img',{alt:'Fly-by-Wire',className:'app-logo',src:require('../../../assets/fbw-web-icon.png'),__source:{fileName:_jsxFileName,lineNumber:89}}))),_react2['default'].createElement('div',{className:'row',__source:{fileName:_jsxFileName,lineNumber:93}},_react2['default'].createElement('div',{className:'medium-5 large-4 medium-centered columns',__source:{fileName:_jsxFileName,lineNumber:94}},_react2['default'].createElement('button',{className:'login-button login-button--d2l ',onClick:function(){function onClick(){return _this2._handleACCLogin();}return onClick;}(),__source:{fileName:_jsxFileName,lineNumber:95}},_react2['default'].createElement('img',{'aria-hidden':true,className:'login-button__image',src:require('../../../assets/myACC.png'),__source:{fileName:_jsxFileName,lineNumber:96}}),'Arapahoe'))),_react2['default'].createElement('div',{className:'row',__source:{fileName:_jsxFileName,lineNumber:102}},_react2['default'].createElement('div',{className:'medium-8 large-7 medium-centered columns',__source:{fileName:_jsxFileName,lineNumber:103}},guestLoginText,_react2['default'].createElement('div',{className:'error-message',__source:{fileName:_jsxFileName,lineNumber:105}},props.errorMessage,resetPasswordLink),_react2['default'].createElement('div',{className:'flex-container space-between align-center',__source:{fileName:_jsxFileName,lineNumber:109}},_react2['default'].createElement('label',{className:'login__guest-label',__source:{fileName:_jsxFileName,lineNumber:110}},'E-mail:',_react2['default'].createElement('input',{className:'input login__guest-input login__guest-identifier',placeholder:'Email Address',value:this.state.guestIdentifier,name:'Email',type:'text',onChange:function(){function onChange(e){return _this2.setState({guestIdentifier:e.target.value});}return onChange;}(),__source:{fileName:_jsxFileName,lineNumber:111}}))),_react2['default'].createElement('div',{className:'flex-container space-between align-center',__source:{fileName:_jsxFileName,lineNumber:118}},_react2['default'].createElement('label',{className:'login__guest-label',__source:{fileName:_jsxFileName,lineNumber:119}},'Password:',_react2['default'].createElement('input',{className:'input login__guest-input login__guest-password',placeholder:'Password',type:'password',value:this.state.guestPassword,onChange:function(){function onChange(e){return _this2.setState({guestPassword:e.target.value});}return onChange;}(),__source:{fileName:_jsxFileName,lineNumber:120}}))),_react2['default'].createElement('div',{className:'flex-container space-between align-center',__source:{fileName:_jsxFileName,lineNumber:126}},loginButton),_react2['default'].createElement('div',{className:'flex-container space-between align-center',__source:{fileName:_jsxFileName,lineNumber:129}},_react2['default'].createElement('a',{href:'/reset-password',__source:{fileName:_jsxFileName,lineNumber:130}},'Forgot Password?')))),_react2['default'].createElement('div',{className:'row',__source:{fileName:_jsxFileName,lineNumber:135}},_react2['default'].createElement('div',{className:'medium-6 columns medium-centered',__source:{fileName:_jsxFileName,lineNumber:136}},_react2['default'].createElement('hr',{className:'divider',__source:{fileName:_jsxFileName,lineNumber:137}}))),_react2['default'].createElement('div',{className:'row',__source:{fileName:_jsxFileName,lineNumber:141}},_react2['default'].createElement('div',{className:'medium-6 columns medium-centered',__source:{fileName:_jsxFileName,lineNumber:142}},_react2['default'].createElement('p',{className:'contact',__source:{fileName:_jsxFileName,lineNumber:143}},_react2['default'].createElement('b',{__source:{fileName:_jsxFileName,lineNumber:144}},'Say hello'),' ',_react2['default'].createElement('a',{href:'mailto:fly-by-wire@mit.edu',__source:{fileName:_jsxFileName,lineNumber:144}},'fly-by-wire@mit.edu'),'\u2002 \u2022 \u2002 ',_react2['default'].createElement('b',{__source:{fileName:_jsxFileName,lineNumber:145}},'Learn more'),' ',_react2['default'].createElement('a',{href:'http://fbw.mit.edu',target:'_blank',__source:{fileName:_jsxFileName,lineNumber:145}},'Fly by Wire '),'\u2002 \u2022 \u2002 ',_react2['default'].createElement('b',{__source:{fileName:_jsxFileName,lineNumber:146}},'Explore'),' ',_react2['default'].createElement('a',{href:'http://mapping.mit.edu',target:'_blank',__source:{fileName:_jsxFileName,lineNumber:146}},'MIT Mapping Lab'),'\u2002 \u2022 \u2002 ',_react2['default'].createElement('b',{__source:{fileName:_jsxFileName,lineNumber:147}},'Funded by'),' ',_react2['default'].createElement('a',{href:'https://fipsedatabase.ed.gov/fipse/',target:'_blank',__source:{fileName:_jsxFileName,lineNumber:147}},'US Department of Education'))))));}return render;}()},{key:'_cleanGuestUsername',value:function(){function _cleanGuestUsername(name){return(0,_slug2['default'])(_lodash2['default'].trim(_lodash2['default'].lowerCase(name)));}return _cleanGuestUsername;}()}]);return Login;}(_react.Component);exports['default']=



Login;