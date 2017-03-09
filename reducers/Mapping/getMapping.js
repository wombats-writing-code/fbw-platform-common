Object.defineProperty(exports,"__esModule",{value:true});exports.GET_MAPPING_OPTIMISTIC=exports.RECEIVE_MAPPING=undefined;exports.















getMappingOptimistic=getMappingOptimistic;exports.



receiveMapping=receiveMapping;exports.



getMapping=getMapping;exports.





































arrayEncode=arrayEncode;var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _axios=require('axios');var _axios2=_interopRequireDefault(_axios);var _utilities=require('../../utilities');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var RECEIVE_MAPPING=exports.RECEIVE_MAPPING='RECEIVE_MAPPING';var GET_MAPPING_OPTIMISTIC=exports.GET_MAPPING_OPTIMISTIC='GET_MAPPING_OPTIMISTIC';function getMappingOptimistic(mapping){return{type:GET_MAPPING_OPTIMISTIC,mapping:mapping};}function receiveMapping(mapping){return{type:RECEIVE_MAPPING,mapping:mapping};}function getMapping(data){if(!data.course){throw TypeError('course must be provided to getMapping');}if(!data.entityTypes){throw TypeError('entityType must be provided');}if(!data.user){throw TypeError('user must be provided to getMapping');}var courseId=data.course.Id||data.course.Identifier;var relationshipTypesString=arrayEncode(data.relationshipTypes,'relationships');var entityTypesString=arrayEncode(data.entityTypes,'entities');return function(dispatch){dispatch(getMappingOptimistic());return(0,_axios2['default'])({url:(0,_utilities.getDomain)()+'/l4/mapping?courseId='+courseId+entityTypesString+relationshipTypesString,headers:{'x-fbw-user':data.user.Identifier}}).then(function(response){dispatch(receiveMapping(response.data));return response.data;})['catch'](function(error){console.log('error getting mapping',error);});};}function arrayEncode(array,query){
if(!array||!query)return'';

var string=void 0;
if(array.length===1){
string='&'+query+'='+array[0];
}else{
string=_lodash2['default'].reduce(array,function(result,value){
result+='&'+query+'='+value;
return result;
},'');
}

return string;
}