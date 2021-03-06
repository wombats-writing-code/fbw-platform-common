Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName='src/components/guest-callback/web/GuestCallback.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactRouter=require('react-router');
var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);

require('./GuestCallback.scss');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

GuestCallback=function(_Component){_inherits(GuestCallback,_Component);function GuestCallback(){_classCallCheck(this,GuestCallback);return _possibleConstructorReturn(this,(GuestCallback.__proto__||Object.getPrototypeOf(GuestCallback)).apply(this,arguments));}_createClass(GuestCallback,[{key:'componentDidMount',value:function(){function componentDidMount()

{
var name=this.props.location.query&&this.props.location.query.name;
if(name){
name=_lodash2['default'].replace(name,'-',' ');
}



this.props.authenticateGuest(this.props.credentials,name);
}return componentDidMount;}()},{key:'componentDidUpdate',value:function(){function componentDidUpdate()

{
if(this.props.failedLogIn){
_reactRouter.browserHistory.push('/login-error');
}
}return componentDidUpdate;}()},{key:'render',value:function(){function render()

{
return(
_react2['default'].createElement('div',{className:'d2l-callback',__source:{fileName:_jsxFileName,lineNumber:28}},
_react2['default'].createElement('p',{className:'text-center callback-text fade-in-out',__source:{fileName:_jsxFileName,lineNumber:29}},'Redirecting you to your dashboard...')));


}return render;}()}]);return GuestCallback;}(_react.Component);exports['default']=



GuestCallback;