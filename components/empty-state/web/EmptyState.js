Object.defineProperty(exports,"__esModule",{value:true});exports.EmptyState=undefined;var _jsxFileName='src/components/empty-state/web/EmptyState.js';var _react=require('react');var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}

var styles={
container:{
height:'100%',
width:'100%',
border:'1px dashed #ccc',
display:'flex',
alignItems:'center',
justifyContent:'center',
color:'#666',
paddingTop:'1.5rem',
paddingBottom:'1.5rem'},

image:{
flex:1},

text:{

flex:4,
marginBottom:0}};



var EmptyState=exports.EmptyState=function(){function EmptyState(message){

return(
_react2['default'].createElement('div',{className:'empty-state',style:styles.container,__source:{fileName:_jsxFileName,lineNumber:28}},
_react2['default'].createElement('p',{style:styles.text,__source:{fileName:_jsxFileName,lineNumber:29}},message)));



}return EmptyState;}();exports['default']=

EmptyState;