Object.defineProperty(exports,"__esModule",{value:true});exports.












changeMissionName=changeMissionName;exports.



changeMissionType=changeMissionType;exports.



changeMissionStart=changeMissionStart;exports.



changeMissionEnd=changeMissionEnd;exports.



changeMissionLeadsToEnd=changeMissionLeadsToEnd;exports.



selectModule=selectModule;exports.



changeOutcomeSearch=changeOutcomeSearch;exports.



toggleOutcome=toggleOutcome;exports.



changeFollowsFromMissions=changeFollowsFromMissions;exports.



moveOutcomeUp=moveOutcomeUp;exports.



moveOutcomeDown=moveOutcomeDown;var CHANGE_MISSION_NAME=exports.CHANGE_MISSION_NAME='CHANGE_MISSION_NAME';var CHANGE_MISSION_TYPE=exports.CHANGE_MISSION_TYPE='CHANGE_MISSION_TYPE';var CHANGE_MISSION_START=exports.CHANGE_MISSION_START='CHANGE_MISSION_START';var CHANGE_MISSION_END=exports.CHANGE_MISSION_END='CHANGE_MISSION_END';var CHANGE_MISSION_LEADS_TO_END=exports.CHANGE_MISSION_LEADS_TO_END='CHANGE_MISSION_LEADS_TO_END';var SELECT_MODULE=exports.SELECT_MODULE='SELECT_MODULE';var CHANGE_OUTCOME_SEARCH=exports.CHANGE_OUTCOME_SEARCH='CHANGE_OUTCOME_SEARCH';var TOGGLE_OUTCOME=exports.TOGGLE_OUTCOME='TOGGLE_OUTCOME';var CHANGE_FOLLOWS_FROM_MISSIONS=exports.CHANGE_FOLLOWS_FROM_MISSIONS='CHANGE_FOLLOWS_FROM_MISSIONS';var MOVE_OUTCOME_UP=exports.MOVE_OUTCOME_UP='MOVE_OUTCOME_UP';var MOVE_OUTCOME_DOWN=exports.MOVE_OUTCOME_DOWN='MOVE_OUTCOME_DOWN';function changeMissionName(value){return{type:CHANGE_MISSION_NAME,value:value};}function changeMissionType(missionType){return{type:CHANGE_MISSION_TYPE,missionType:missionType};}function changeMissionStart(datetime){return{type:CHANGE_MISSION_START,datetime:datetime};}function changeMissionEnd(datetime){return{type:CHANGE_MISSION_END,datetime:datetime};}function changeMissionLeadsToEnd(datetime){return{type:CHANGE_MISSION_LEADS_TO_END,datetime:datetime};}function selectModule(module){return{type:SELECT_MODULE,module:module};}function changeOutcomeSearch(query){return{type:CHANGE_OUTCOME_SEARCH,query:query};}function toggleOutcome(outcome){return{type:TOGGLE_OUTCOME,outcome:outcome};}function changeFollowsFromMissions(missions){return{type:CHANGE_FOLLOWS_FROM_MISSIONS,missions:missions};}function moveOutcomeUp(outcome){return{type:MOVE_OUTCOME_UP,outcome:outcome};}function moveOutcomeDown(outcome){
return{type:MOVE_OUTCOME_DOWN,outcome:outcome};
}