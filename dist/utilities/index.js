Object.defineProperty(exports,"__esModule",{value:true});exports.STUDENT_AUTHORIZATION_FUNCTIONS=exports.BASE_BANKS=exports.PHASE_II_MISSION_RECORD_TYPE=exports.PHASE_I_MISSION_RECORD_TYPE=exports.PRE_FLIGHT_MISSION=exports.TEST_FLIGHT_MISSION=exports.LO_SCAFFOLD_MISSION_GENUS_TYPE=exports.BANK_TO_LIBRARY=exports.DOMAIN_TO_LIBRARY=exports.BANK_TO_DOMAIN=exports.SCHOOL_TO_BANK=exports.matches=exports.getDomain=exports.isBrowser=exports.isLocal=undefined;exports.


























































getSchoolQBankId=getSchoolQBankId;exports.




updateQuestionWithResponse=updateQuestionWithResponse;exports.








updateAssessmentSectionsWithResponse=updateAssessmentSectionsWithResponse;exports.









































findBankDomain=findBankDomain;exports.





























findBankLibrary=findBankLibrary;var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _axios=require('axios');var _axios2=_interopRequireDefault(_axios);var _q=require('q');var _q2=_interopRequireDefault(_q);var _mission=require('../selectors/mission');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var config=require('../configuration');var isLocal=exports.isLocal=function(){function isLocal(conf){return conf==='dev';}return isLocal;}();var isBrowser=exports.isBrowser=function(){function isBrowser(){if(window.location){return true;}return false;}return isBrowser;}();var getDomain=exports.getDomain=function(){function getDomain(){if(isBrowser()||process.env.NODE_ENV==='test'){if(process.env.NODE_ENV==='production'){var host=window.location.host;if(host==='fbw-instructor.mit.edu'||host==='fbw-student.mit.edu'){return'https://fbw-web-backend.herokuapp.com';}else{return'https://fbw-web-backend-dev.herokuapp.com';}}return'http://localhost:8888';}return'https://fbw-web-backend.herokuapp.com';}return getDomain;}();var matches=exports.matches=function(){function matches(needle,haystack){var parts=needle.split(' ');var partQ='';for(var i=0;i<parts.length;i++){if(i==0){partQ='(?=.*\\b'+parts[i]+')';}else{partQ=partQ+'(?=.*\\b'+parts[i]+')';}}var re=new RegExp(partQ,'gi');var matching=re.test(haystack);return matching;}return matches;}();function getSchoolQBankId(school){return'fbw-school%3A'+school+'%40FBW.MIT.EDU';}function updateQuestionWithResponse(question,response){return _lodash2['default'].assign({},question,{responded:true,isCorrect:response.isCorrect,response:response});}function updateAssessmentSectionsWithResponse(sections,response){var submittedQuestion=void 0;var _assessmentSections=_lodash2['default'].map(sections,function(section){var submittedQuestion=_lodash2['default'].find(section.questions,{id:response.questionId});if(submittedQuestion){var routeFinished=false;var updatedSection=_lodash2['default'].assign({},section,{questions:_lodash2['default'].map(section.questions,function(question,idx){if(question.id===response.questionId){return updateQuestionWithResponse(question,response);}return question;})});if(response.nextQuestion&&!(0,_mission.isTarget)(response.nextQuestion)){updatedSection.questions.push(response.nextQuestion);}else if((0,_mission.isTarget)(response.nextQuestion)&&!response.showAnswer){routeFinished=true;}else if(!response.nextQuestion){routeFinished=true;}console.log('response.nextQuestion?',response.nextQuestion);return updatedSection;}return section;});return _assessmentSections;}function findBankDomain(bankId,enrolledBanks){if(_lodash2['default'].keys(BANK_TO_DOMAIN).indexOf(bankId)>=0){return BANK_TO_DOMAIN[bankId];}else{console.log('bankId',bankId,'enrolledBanks',enrolledBanks);var department=_lodash2['default'].find(enrolledBanks,{id:bankId}).department.toLowerCase();console.log('department',department);switch(department){case'accounting':case'acc':return'accounting';case'algebra':case'alg':case'mat':case'math':case'collegealgebra':case'college_algebra':return'algebra';case'sandbox':return'algebra';default:return'accounting';}}}function findBankLibrary(bankId,enrolledBanks){
var department=findBankDomain(bankId,enrolledBanks);
return DOMAIN_TO_LIBRARY[department];
}


var SCHOOL_TO_BANK=exports.SCHOOL_TO_BANK={"acc":"assessment.Bank%3A57279fc2e7dde08807231e61%40bazzim.MIT.EDU",
"qcc":"assessment.Bank%3A57279fcee7dde08832f93420%40bazzim.MIT.EDU"};

var BANK_TO_DOMAIN=exports.BANK_TO_DOMAIN={"assessment.Bank%3A57d70ed471e482a74879349a%40bazzim.MIT.EDU":"accounting",
"assessment.Bank%3A576d6d3271e4828c441d721a%40bazzim.MIT.EDU":"algebra"};

var DOMAIN_TO_LIBRARY=exports.DOMAIN_TO_LIBRARY={"accounting":"assessment.Bank%3A57279fbce7dde086c7fe20ff%40bazzim.MIT.EDU",
"algebra":"assessment.Bank%3A57279fb9e7dde086d01b93ef%40bazzim.MIT.EDU"};

var BANK_TO_LIBRARY=exports.BANK_TO_LIBRARY={"assessment.Bank%3A57d70ed471e482a74879349a%40bazzim.MIT.EDU":"assessment.Bank%3A57279fbce7dde086c7fe20ff%40bazzim.MIT.EDU",
"assessment.Bank%3A576d6d3271e4828c441d721a%40bazzim.MIT.EDU":"assessment.Bank%3A57279fb9e7dde086d01b93ef%40bazzim.MIT.EDU"};

var LO_SCAFFOLD_MISSION_GENUS_TYPE=exports.LO_SCAFFOLD_MISSION_GENUS_TYPE="assessment-part-genus-type%3Afbw-specify-lo%40ODL.MIT.EDU";
var TEST_FLIGHT_MISSION=exports.TEST_FLIGHT_MISSION="assessment-genus%3Afbw-in-class-mission%40ODL.MIT.EDU";
var PRE_FLIGHT_MISSION=exports.PRE_FLIGHT_MISSION="assessment-genus%3Afbw-homework-mission%40ODL.MIT.EDU";
var PHASE_I_MISSION_RECORD_TYPE=exports.PHASE_I_MISSION_RECORD_TYPE="assessment-record-type%3Afbw-phase-i%40ODL.MIT.EDU";
var PHASE_II_MISSION_RECORD_TYPE=exports.PHASE_II_MISSION_RECORD_TYPE="assessment-record-type%3Afbw-phase-ii%40ODL.MIT.EDU";

var BASE_BANKS=exports.BASE_BANKS=['assessment.Bank%3AROOT%40ODL.MIT.EDU',
'assessment.Bank%3A000000000000000000000000%40ODL.MIT.EDU',
'assessment.Bank%3A000000000000000000000000%40bazzim.MIT.EDU'];
var STUDENT_AUTHORIZATION_FUNCTIONS=exports.STUDENT_AUTHORIZATION_FUNCTIONS=['assessment.AssessmentTaken%3Acreate%40ODL.MIT.EDU',
'assessment.AssessmentTaken%3Alookup%40ODL.MIT.EDU',
'assessment.Assessment%3Atake%40ODL.MIT.EDU',
'assessment.Bank%3Alookup%40ODL.MIT.EDU',
'commenting.Book%3Alookup%40ODL.MIT.EDU',
'commenting.Comment%3Alookup%40ODL.MIT.EDU',
'hierarchy.Hierarchy%3Alookup%40ODL.MIT.EDU',
'logging.Log%3Alookup%40ODL.MIT.EDU',
'repository.Asset%3Acreate%40ODL.MIT.EDU',
'repository.Asset%3Adelete%40ODL.MIT.EDU',
'repository.Asset%3Alookup%40ODL.MIT.EDU',
'repository.Asset%3Asearch%40ODL.MIT.EDU',
'repository.Repository%3Alookup%40ODL.MIT.EDU',
'resource.Bin%3Alookup%40ODL.MIT.EDU',
'resource.Resource%3Alookup%40ODL.MIT.EDU'];