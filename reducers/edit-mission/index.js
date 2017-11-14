Object.defineProperty(exports,"__esModule",{value:true});exports['default']=





































editMissionReducer;exports.
















































































































































































































stampNewMission=stampNewMission;var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);var _lodash=require('lodash');var _lodash2=_interopRequireDefault(_lodash);var _moment=require('moment');var _moment2=_interopRequireDefault(_moment);var _Mission=require('../Mission');var _createMission=require('./createMission');var _updateMission=require('./updateMission');var _deleteMission=require('./deleteMission');var _updateMissionForm=require('./updateMissionForm');var _editMission=require('./editMission');var _clickAddMission=require('./clickAddMission');var _clickEditMission=require('./clickEditMission');var _clickEditMissionDates=require('./clickEditMissionDates');var _time=require('../../utilities/time');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{'default':obj};}var initialState={newMission:stampNewMission()};function editMissionReducer(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:initialState;var action=arguments[1];switch(action.type){case _clickAddMission.CLICK_ADD_MISSION:return _lodash2['default'].assign({},state,{newMission:stampNewMission()});case _clickEditMission.CLICK_EDIT_MISSION:return _lodash2['default'].assign({},state,{isEditMissionInProgress:true,newMission:_lodash2['default'].assign({},action.mission)});case _clickEditMission.CANCEL_EDIT_MISSION:return _lodash2['default'].assign({},state,{isEditMissionInProgress:false,newMission:null});case _clickEditMissionDates.CLICK_EDIT_MISSION_DATES:return _lodash2['default'].assign({},state,{isEditMissionDatesInProgress:true,newMission:_lodash2['default'].assign({},action.mission,{startTime:action.mission.leadsToMissionsStartTime,deadline:action.mission.leadsToMissionsDeadline})});case _clickEditMissionDates.CANCEL_EDIT_MISSION_DATES:return _lodash2['default'].assign({},state,{isEditMissionDatesInProgress:false,newMission:null});case _editMission.EDIT_MISSION:return _lodash2['default'].assign({},state,{newMission:action.mission});case _createMission.CREATE_MISSIONS_OPTIMISTIC:return _lodash2['default'].assign({},state,{isCreateMissionInProgress:action.mission});case _createMission.CREATE_MISSION_OPTIMISTIC:return _lodash2['default'].assign({},state,{isCreateMissionInProgress:true});case _createMission.RECEIVE_CREATE_MISSIONS:case _createMission.RECEIVE_CREATE_MISSION:return _lodash2['default'].assign({},state,{newMission:stampNewMission(),isCreateMissionInProgress:false});case _updateMission.UPDATE_MISSION_OPTIMISTIC:return _lodash2['default'].assign({},state,{isUpdateMissionInProgress:true});case _updateMission.RECEIVE_UPDATE_MISSION:return _lodash2['default'].assign({},state,{isUpdateMissionInProgress:false,newMission:stampNewMission(),isEditMissionInProgress:false});case _updateMission.UPDATE_MISSIONS_OPTIMISTIC:return _lodash2['default'].assign({},state,{isUpdateMissionsInProgress:true});case _updateMission.RECEIVE_UPDATE_MISSIONS:return _lodash2['default'].assign({},state,{isUpdateMissionsInProgress:false,newMission:stampNewMission(),isEditMissionDatesInProgress:false});case _deleteMission.DELETE_MISSION_OPTIMISTIC:return _lodash2['default'].assign({},state,{isDeleteMissionInProgress:true});case _deleteMission.RECEIVE_DELETE_MISSION:return _lodash2['default'].assign({},state,{isDeleteMissionInProgress:false,isEditMissionInProgress:false,newMission:stampNewMission()});case _updateMissionForm.CHANGE_MISSION_NAME:return _lodash2['default'].assign({},state,{newMission:_lodash2['default'].assign({},state.newMission,{displayName:action.value})});case _updateMissionForm.CHANGE_MISSION_TYPE:return _lodash2['default'].assign({},state,{newMission:_lodash2['default'].assign({},state.newMission,{type:action.missionType,displayName:'',description:''})});case _updateMissionForm.CHANGE_MISSION_START:return _lodash2['default'].assign({},state,{newMission:_lodash2['default'].assign({},state.newMission,{startTime:action.datetime})});case _updateMissionForm.CHANGE_MISSION_END:return _lodash2['default'].assign({},state,{newMission:_lodash2['default'].assign({},state.newMission,{deadline:action.datetime})});case _updateMissionForm.CHANGE_MISSION_LEADS_TO_END:return _lodash2['default'].assign({},state,{newMission:_lodash2['default'].assign({},state.newMission,{leadsToMissionsDeadline:action.datetime})});case _updateMissionForm.CHANGE_MISSION_LEADS_TO_START:return _lodash2['default'].assign({},state,{newMission:_lodash2['default'].assign({},state.newMission,{leadsToMissionsStartTime:action.datetime})});case _updateMissionForm.SELECT_MODULE:return _lodash2['default'].assign({},state,{selectedModule:state.selectedModule===action.module?null:action.module});case _updateMissionForm.CHANGE_OUTCOME_SEARCH:return _lodash2['default'].assign({},state,{outcomeQuery:action.query});case _updateMissionForm.TOGGLE_OUTCOME:var isSelected=state.newMission.goals.indexOf(action.outcome.id)>-1;var goals=void 0;if(isSelected){goals=_lodash2['default'].without(state.newMission.goals,action.outcome.id);}else{goals=_lodash2['default'].concat(state.newMission.goals,action.outcome.id);}return _lodash2['default'].assign({},state,{newMission:_lodash2['default'].assign({},state.newMission,{goals:goals})});case _updateMissionForm.CHANGE_FOLLOWS_FROM_MISSIONS:var displayNames=_lodash2['default'].map(action.missions,'displayName');return _lodash2['default'].assign({},state,{newMission:_lodash2['default'].assign({},state.newMission,{followsFromMissions:_lodash2['default'].map(action.missions,'id'),displayName:'Phase II (from '+displayNames.join(' + ')+')'})});case _updateMissionForm.MOVE_OUTCOME_UP:var outcomeUpIndex=state.newMission.goals.indexOf(action.outcome.id);var outcomeIncludedUp=outcomeUpIndex>-1;if(!outcomeIncludedUp||outcomeUpIndex===0){return _lodash2['default'].assign({},state);}var reorderedUpGoals=_lodash2['default'].filter(_lodash2['default'].assign([],state.newMission.goals),function(id){return id!==action.outcome.id;});reorderedUpGoals.splice(outcomeUpIndex-1,0,action.outcome.id);return _lodash2['default'].assign({},state,{newMission:_lodash2['default'].assign({},state.newMission,{goals:reorderedUpGoals})});case _updateMissionForm.MOVE_OUTCOME_DOWN:var outcomeDownIndex=state.newMission.goals.indexOf(action.outcome.id);var outcomeIncludedDown=outcomeDownIndex>-1;if(!outcomeIncludedDown||outcomeDownIndex===state.newMission.goals.length+1){return _lodash2['default'].assign({},state);}var reorderedDownGoals=_lodash2['default'].filter(_lodash2['default'].assign([],state.newMission.goals),function(id){return id!==action.outcome.id;});reorderedDownGoals.splice(outcomeDownIndex+1,0,action.outcome.id);return _lodash2['default'].assign({},state,{newMission:_lodash2['default'].assign({},state.newMission,{goals:reorderedDownGoals})});default:return state;}}function stampNewMission(){
return{
displayName:'',
type:null,
course:'',
startTime:null,
deadline:null,
followsFromMissions:[],
leadsToMissions:[],
goals:[]};

}