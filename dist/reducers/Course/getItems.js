Object.defineProperty(exports,"__esModule",{value:true});exports.GET_ITEMS=exports.RECEIVE_ITEMS=undefined;exports.















receiveItems=receiveItems;exports.



getItemsOptimistic=getItemsOptimistic;exports.



getItems=getItems;require('lodash');var _axios=require('axios');var _axios2=_interopRequireDefault(_axios);var _utilities=require('../../utilities');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var RECEIVE_ITEMS=exports.RECEIVE_ITEMS='RECEIVE_ITEMS';var GET_ITEMS=exports.GET_ITEMS='GET_ITEMS';function receiveItems(items){return{type:RECEIVE_ITEMS,items:items};}function getItemsOptimistic(data){return{type:GET_ITEMS,data:data};}function getItems(data){
if(!data.course){
throw TypeError('course must be provided to getItems');
}

if(!data.user){
throw TypeError('user must be provided to getItems');
}

return function(dispatch){
dispatch(getItemsOptimistic([]));

return(0,_axios2['default'])({
url:(0,_utilities.getDomain)()+'/l4/questions?courseId='+(data.course.Id||data.course.Identifier),
headers:{
'x-fbw-user':data.user.Identifier}}).


then(function(response){

var items=response.data;
dispatch(receiveItems(items));

return items;
})['catch'](
function(error){
console.log('error getting items data',error);
});
};
}