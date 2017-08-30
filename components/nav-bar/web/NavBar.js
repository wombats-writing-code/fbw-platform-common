Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName='src/components/nav-bar/web/NavBar.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);
var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactRouter=require('react-router');
require('./NavBar.scss');

var _login=require('../../../selectors/login');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

NavBar=function(_Component){_inherits(NavBar,_Component);function NavBar(){var _ref;var _temp,_this,_ret;_classCallCheck(this,NavBar);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=NavBar.__proto__||Object.getPrototypeOf(NavBar)).call.apply(_ref,[this].concat(args))),_this),_this.
























































































































_logout=function(){
_reactRouter.browserHistory.push('/logout-success');
_this.props.logout();
},_this.

_skipToMain=function(){





document.getElementById('main-content').focus();
},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(NavBar,[{key:'render',value:function(){function render(){var props=this.props;var breadcrumbs=this._getPath(this.props);if(!props.user){return null;}return _react2['default'].createElement('div',{className:'nav-bar flex-container align-center space-between wrap',__source:{fileName:_jsxFileName,lineNumber:21}},_react2['default'].createElement('div',{id:'skip-link',__source:{fileName:_jsxFileName,lineNumber:22}},_react2['default'].createElement('a',{href:'#main-content',className:'element-invisible element-focusable',onClick:this._skipToMain,__source:{fileName:_jsxFileName,lineNumber:23}},'Skip to main content')),_react2['default'].createElement('a',{href:'/','aria-label':'Home',__source:{fileName:_jsxFileName,lineNumber:28}},_react2['default'].createElement('img',{'aria-hidden':true,alt:'',className:'nav-bar__logo',src:require('../../../assets/logo-site--inverted.png'),__source:{fileName:_jsxFileName,lineNumber:28}})),_react2['default'].createElement('span',{className:'nav-bar__app-name',__source:{fileName:_jsxFileName,lineNumber:34}},props.appName),_react2['default'].createElement('ul',{className:'breadcrumbs',__source:{fileName:_jsxFileName,lineNumber:35}},_lodash2['default'].map(breadcrumbs,function(crumb,idx){return _react2['default'].createElement('li',{className:'breadcrumb',key:'breadcrumbs_'+idx,__source:{fileName:_jsxFileName,lineNumber:38}},_react2['default'].createElement(_reactRouter.Link,{to:crumb.path,className:idx===breadcrumbs.length-1?"breadcrumb__link is-inactive":"breadcrumb__link",__source:{fileName:_jsxFileName,lineNumber:39}},crumb.name));})),_react2['default'].createElement('div',{className:'nav-bar__app-control flex-container align-center space-between',__source:{fileName:_jsxFileName,lineNumber:47}},_react2['default'].createElement('p',{className:'username',__source:{fileName:_jsxFileName,lineNumber:48}},(0,_login.getD2LDisplayName)(props.user)),_react2['default'].createElement(_reactRouter.Link,{className:'help-button',to:'/guide',target:'_blank',__source:{fileName:_jsxFileName,lineNumber:51}},'Help'),_react2['default'].createElement('button',{className:'logout-button',onClick:this._logout,__source:{fileName:_jsxFileName,lineNumber:54}},'Logout')));}return render;}()},{key:'_getPath',value:function(){function _getPath(props){var breadcrumbs=[{path:'/',name:'Home'}];if(!props.route){return breadcrumbs;}switch(props.route.path){case'missions':breadcrumbs=_lodash2['default'].concat(breadcrumbs,{path:'/missions',name:'Missions'});break;case'/missions/:missionName':breadcrumbs=_lodash2['default'].concat(breadcrumbs,{path:'/missions',name:'Missions'},{path:props.route.path,name:props.routeParams.missionName});break;case'dashboard/:missionName':breadcrumbs=_lodash2['default'].concat(breadcrumbs,{path:'/missions',name:'Dashboard'},{path:props.route.path,name:props.routeParams.missionName});break;case'students/:studentId/missions/:missionName':breadcrumbs=_lodash2['default'].concat(breadcrumbs,{path:'/missions',name:'Dashboard'},{path:props.route.path,name:props.routeParams.missionName});break;}return breadcrumbs;}return _getPath;}()},{key:'_getTitle',value:function(){function _getTitle(props){if(props.routeParams){var key=_lodash2['default'].keys(props.routeParams)[0];return props.routeParams[key];}}return _getTitle;}()}]);return NavBar;}(_react.Component);exports['default']=




NavBar;