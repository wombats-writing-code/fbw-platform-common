Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName='src/components/d2l-callback/web/D2LCallback.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactRouter=require('react-router');

require('./D2LCallback.scss');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

D2LCallback=function(_Component){_inherits(D2LCallback,_Component);function D2LCallback(){_classCallCheck(this,D2LCallback);return _possibleConstructorReturn(this,(D2LCallback.__proto__||Object.getPrototypeOf(D2LCallback)).apply(this,arguments));}_createClass(D2LCallback,[{key:'componentDidMount',value:function(){function componentDidMount()

{

this.props.authenticateD2L(this.props.credentials);

}return componentDidMount;}()},{key:'render',value:function(){function render()

{
return(
_react2['default'].createElement('div',{className:'d2l-callback',__source:{fileName:_jsxFileName,lineNumber:16}},
_react2['default'].createElement('p',{className:'text-center callback-text fade-in-out',__source:{fileName:_jsxFileName,lineNumber:17}},'Redirecting you to your dashboard...')));


}return render;}()}]);return D2LCallback;}(_react.Component);exports['default']=



D2LCallback;