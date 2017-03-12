Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactRouter=require('react-router');

require('./Login.scss');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

Login=function(_Component){_inherits(Login,_Component);
function Login(){_classCallCheck(this,Login);var _this=_possibleConstructorReturn(this,(Login.__proto__||Object.getPrototypeOf(Login)).call(this));_this.










































































_handleACCLogin=function(){
window.open(_this.props.authenticationUrl,'_self');
};_this.state={isVisitorLoginVisible:false};return _this;}_createClass(Login,[{key:'componentDidMount',value:function(){function componentDidMount(){if(this.props.d2lUserIdentifer){this.props.logout();}}return componentDidMount;}()},{key:'render',value:function(){function render(){var _this2=this;var props=this.props;var loginButtonText=void 0;if(props.isLoginInProgress){loginButtonText=_react2['default'].createElement('div',{className:''},'Logging you in...');}else{loginButtonText=_react2['default'].createElement('div',{className:''},'Login');}return _react2['default'].createElement('div',{className:'login'},_react2['default'].createElement('div',{className:'app-name text-center clearfix'},_react2['default'].createElement('div',{className:'medium-7 large-5 columns medium-centered'},_react2['default'].createElement('img',{className:'app-logo',src:require('../../../assets/fbw-web-icon.png')}))),_react2['default'].createElement('div',{className:'row'},_react2['default'].createElement('div',{className:'school-buttons medium-8 medium-centered columns'},_react2['default'].createElement('button',{onClick:function(){function onClick(){return _this2._handleACCLogin();}return onClick;}(),className:'login-button login-button--d2l '},_react2['default'].createElement('img',{className:'login-button__image',src:require('../../../assets/myACC.png')}),'Arapahoe'),_react2['default'].createElement('button',{onClick:function(){function onClick(){return _this2._handleGuestLogin();}return onClick;}(),className:'login-button'},_react2['default'].createElement('img',{className:'login-button__image',src:require('../../../assets/visitor.png')}),'Guest'))),_react2['default'].createElement('div',{className:'row'},_react2['default'].createElement('div',{className:'medium-6 columns medium-centered'},_react2['default'].createElement('hr',{className:'divider'}))),_react2['default'].createElement('div',{className:'row'},_react2['default'].createElement('div',{className:'medium-6 columns medium-centered'},_react2['default'].createElement('p',{className:'contact'},_react2['default'].createElement('b',null,'Say hello'),' ',_react2['default'].createElement('a',{href:'mailto:fly-by-wire@mit.edu'},'fly-by-wire@mit.edu'),'\u2002 \u2022 \u2002 ',_react2['default'].createElement('b',null,'Learn more'),' ',_react2['default'].createElement('a',{href:'http://fbw.mit.edu',target:'_blank'},'Fly by Wire '),'\u2002 \u2022 \u2002 ',_react2['default'].createElement('b',null,'Explore'),' ',_react2['default'].createElement('a',{href:'http://mapping.mit.edu',target:'_blank'},'MIT Mapping Lab'),'\u2002 \u2022 \u2002 ',_react2['default'].createElement('b',null,'Funded by'),' ',_react2['default'].createElement('a',{href:'https://fipsedatabase.ed.gov/fipse/',target:'_blank'},'US Department of Education')))));}return render;}()},{key:'_handleGuestLogin',value:function(){function _handleGuestLogin(){window.open(this.props.guestAuthenticationUrl,'_self');}return _handleGuestLogin;}()}]);return Login;}(_react.Component);exports['default']=



Login;