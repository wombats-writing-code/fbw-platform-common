Object.defineProperty(exports,"__esModule",{value:true});exports.LoadingBox=undefined;var _jsxFileName='src/components/loading-box/web/LoadingBox.js';var _react=require('react');var _react2=_interopRequireDefault(_react);

require('../../../styles/animations.scss');
require('./LoadingBox.scss');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}

var LoadingBox=exports.LoadingBox=function(){function LoadingBox(type){
switch(type){
case'enter':
return _react2['default'].createElement('div',{className:'loading-box draw-enter',__source:{fileName:_jsxFileName,lineNumber:9}});

case'enter-active':
return _react2['default'].createElement('div',{className:'loading-box draw-enter draw-enter-active',__source:{fileName:_jsxFileName,lineNumber:12}},
_react2['default'].createElement('span',{className:'fade-in-out',__source:{fileName:_jsxFileName,lineNumber:13}},'Loading...'));


default:
return null;}

}return LoadingBox;}();exports['default']=

LoadingBox;