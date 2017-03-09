Object.defineProperty(exports,"__esModule",{value:true});exports.









changeMissionName=changeMissionName;exports.



changeMissionType=changeMissionType;exports.



changeMissionStart=changeMissionStart;exports.



changeMissionEnd=changeMissionEnd;exports.



selectModule=selectModule;exports.



changeOutcomeSearch=changeOutcomeSearch;exports.



toggleOutcome=toggleOutcome;exports.



changeFollowsFromMissions=changeFollowsFromMissions;var CHANGE_MISSION_NAME=exports.CHANGE_MISSION_NAME='CHANGE_MISSION_NAME';var CHANGE_MISSION_TYPE=exports.CHANGE_MISSION_TYPE='CHANGE_MISSION_TYPE';var CHANGE_MISSION_START=exports.CHANGE_MISSION_START='CHANGE_MISSION_START';var CHANGE_MISSION_END=exports.CHANGE_MISSION_END='CHANGE_MISSION_END';var SELECT_MODULE=exports.SELECT_MODULE='SELECT_MODULE';var CHANGE_OUTCOME_SEARCH=exports.CHANGE_OUTCOME_SEARCH='CHANGE_OUTCOME_SEARCH';var TOGGLE_OUTCOME=exports.TOGGLE_OUTCOME='TOGGLE_OUTCOME';var CHANGE_FOLLOWS_FROM_MISSIONS=exports.CHANGE_FOLLOWS_FROM_MISSIONS='CHANGE_FOLLOWS_FROM_MISSIONS';function changeMissionName(value){return{type:CHANGE_MISSION_NAME,value:value};}function changeMissionType(missionType){return{type:CHANGE_MISSION_TYPE,missionType:missionType};}function changeMissionStart(datetime){return{type:CHANGE_MISSION_START,datetime:datetime};}function changeMissionEnd(datetime){return{type:CHANGE_MISSION_END,datetime:datetime};}function selectModule(module){return{type:SELECT_MODULE,module:module};}function changeOutcomeSearch(query){return{type:CHANGE_OUTCOME_SEARCH,query:query};}function toggleOutcome(outcome){return{type:TOGGLE_OUTCOME,outcome:outcome};}function changeFollowsFromMissions(missions){
return{type:CHANGE_FOLLOWS_FROM_MISSIONS,missions:missions};
}