Object.defineProperty(exports,"__esModule",{value:true});exports['default']=















mappingReducer;var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _getMapping=require('./getMapping');var _logOutUser=require('../Login/logOutUser');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var initialState={modules:null,outcomes:null,relationships:null};function mappingReducer(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:initialState;var action=arguments[1];
switch(action.type){
case _logOutUser.LOG_OUT:
return _lodash2['default'].assign({},{
modules:null,
outcomes:null,
relationships:null});


case _getMapping.GET_MAPPING_OPTIMISTIC:
return _lodash2['default'].assign({},state,{
isGetMappingInProgress:true});


case _getMapping.RECEIVE_MAPPING:
return _lodash2['default'].assign({},state,{
modules:_lodash2['default'].filter(action.mapping.entities,{type:'MODULE'}),
outcomes:_lodash2['default'].filter(action.mapping.entities,{type:'OUTCOME'}),
relationships:action.mapping.relationships,
isGetMappingInProgress:false});


default:
return state;}

}