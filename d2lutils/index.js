Object.defineProperty(exports,"__esModule",{value:true});exports.






getAuthenticationUrl=getAuthenticationUrl;var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _axios=require('axios');var _axios2=_interopRequireDefault(_axios);var _q=require('q');var _q2=_interopRequireDefault(_q);var _valence=require('valence');var _valence2=_interopRequireDefault(_valence);var _utilities=require('../utilities');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}function getAuthenticationUrl(credentials){
var AppContext=new _valence2['default'].ApplicationContext(credentials.appID,credentials.appKey);
var authenticationUrl=AppContext.createUrlForAuthentication(credentials.host,
credentials.port,
credentials.callbackUrl);

return authenticationUrl;
}