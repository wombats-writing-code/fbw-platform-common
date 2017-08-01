Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName='src/components/courses/web/Courses.js';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var



Courses=function(_Component){_inherits(Courses,_Component);function Courses(){_classCallCheck(this,Courses);return _possibleConstructorReturn(this,(Courses.__proto__||Object.getPrototypeOf(Courses)).apply(this,arguments));}_createClass(Courses,[{key:'render',value:function(){function render()


{var _this2=this;
return(
_react2['default'].createElement('ul',{__source:{fileName:_jsxFileName,lineNumber:11}},
_lodash2['default'].map(this.props.courses,function(course){
return(
_react2['default'].createElement('li',{className:'course',key:'course_'+course.Id,onClick:function(){function onClick(){return _this2.props.onSelectCourse(course);}return onClick;}(),__source:{fileName:_jsxFileName,lineNumber:14}},
_react2['default'].createElement('p',{__source:{fileName:_jsxFileName,lineNumber:15}},course.Name)));


})));



}return render;}()}]);return Courses;}(_react.Component);exports['default']=


Courses;