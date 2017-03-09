Object.defineProperty(exports,"__esModule",{value:true});exports.







getD2LEnrollments=getD2LEnrollments;exports.






























































whoami=whoami;exports.


































isFBWSpring2017=isFBWSpring2017;exports.






isFBW=isFBW;var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _axios=require('axios');var _axios2=_interopRequireDefault(_axios);var _moment=require('moment');var _moment2=_interopRequireDefault(_moment);var _valence=require('valence');var _valence2=_interopRequireDefault(_valence);var _utilities=require('../../utilities');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var Q=require('q');function getD2LEnrollments(credentials,url){var AppContext=new _valence2['default'].ApplicationContext(credentials.appID,credentials.appKey);var userContext=AppContext.createUserContext(credentials.host,credentials.port,url);var enrollmentsUrl='/d2l/api/lp/1.14/enrollments/myenrollments/';var urlWithFilters=enrollmentsUrl+'?isActive=true&canAccess=true&orgUnitTypeId=3';var options={url:userContext.createAuthenticatedUrl(urlWithFilters,'GET')+_appendDevRole(credentials)};return(0,_axios2['default'])(options).then(function(response){if(process.env.NODE_ENV!=='test')console.log('got d2l enrollments',response.data);var enrollments=response.data.Items;enrollments=_lodash2['default'].filter(enrollments,function(enrollment){return enrollment.OrgUnit.Type.Code=='Course Offering'&&enrollment.Access.IsActive&&enrollment.Access.CanAccess&&isFBWSpring2017(enrollment.OrgUnit.Name);});if(process.env.NODE_ENV!=='test')console.log('filtered enrollments',enrollments);if(credentials.role==='student'){var courses=_lodash2['default'].map(enrollments,'OrgUnit');return courses;}var courseTermPromises=[];_lodash2['default'].each(enrollments,function(course){var url='/d2l/api/lp/1.5/courses/'+course.OrgUnit.Id;var options={url:userContext.createAuthenticatedUrl(url,'GET')+_appendDevRole(credentials),validateStatus:function(){function validateStatus(){return true;}return validateStatus;}()};courseTermPromises.push((0,_axios2['default'])(options));});return _axios2['default'].all(courseTermPromises).then(function(res){var courses=_lodash2['default'].uniqBy(_lodash2['default'].flatten(_lodash2['default'].map(res,'data')),'Code');return courses;});})['catch'](function(error){console.log('error getting d2l enrollments',error);return error;});}function whoami(credentials,url){var AppContext=new _valence2['default'].ApplicationContext(credentials.appID,credentials.appKey);var userContext=AppContext.createUserContext(credentials.host,credentials.port,url);var whoamiUrl='/d2l/api/lp/1.5/users/whoami';var options=void 0;if(process.env.NODE_ENV==='test'){options={url:'http://localhost:8888/mock-d2l'+whoamiUrl+'?'+_appendDevRole(credentials)+'&sNumber=S99999991'};}else{options={url:userContext.createAuthenticatedUrl(whoamiUrl,'GET')+_appendDevRole(credentials)};}return(0,_axios2['default'])(options).then(function(response){return Q.when(response.data);})['catch'](function(error){console.log('error getting whoami',error);});}function _appendDevRole(credentials){if(process.env.NODE_ENV!=='production'){return'&role='+credentials.role;}return'';}function isFBWSpring2017(name){var lowercased=name.toLowerCase();return lowercased.indexOf('fly-by-wire')>=0||lowercased.indexOf('fbw')>=0||lowercased.indexOf('sp17')>=0&&(isMAT121(lowercased)||isACC(lowercased));}function isFBW(name){
return;
}

function isMAT121(name){
return name.indexOf('mat')>=0&&
name.indexOf('121')>=0&&(
name.indexOf('142')>=0||name.indexOf('103')>=0);
}

function isACC(name){
return name.indexOf('acc')>=0&&
name.indexOf('202')>=0;
}