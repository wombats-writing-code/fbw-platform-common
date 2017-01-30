// mission reducer

import thunk from 'redux-thunk';
import _ from 'lodash'
import moment from 'moment'

import {END_DATE} from 'react-dates/constants'

import {ADD_MISSION} from './addMission'
import {EDIT_MISSION} from './editMission'
import {CREATE_TEST_FLIGHT_MISSIONS_OPTIMISTIC, RECEIVE_CREATE_TEST_FLIGHT_MISSIONS} from './createTestFlightMissions'
import {CREATE_MISSION_OPTIMISTIC, RECEIVE_CREATE_MISSION} from './createMission'
import {RECEIVE_UPDATE_MISSION} from './updateMission'
import {UPDATE_MISSION_FORM} from './updateMissionForm'
// import {UPDATE_EDIT_MISSION_FORM} from './updateEditMissionForm'
import {UPDATE_SPAWN_DATE} from './updateSpawnDate'
import {DELETE_MISSION_OPTIMISTIC, RECEIVE_DELETE_MISSION} from './deleteMission'


// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  newMission: stampNewMission(),
  spawnDate: {
    startTime: moment(),
    deadline: moment().add(7, 'd')
  }
}
export default function editMissionReducer (state = initialState, action) {
  switch (action.type) {
    case ADD_MISSION:
      return _.assign({}, state, {
        newMission: stampNewMission(),
      });

    case EDIT_MISSION:
      console.log('EDIT_MISSION', action)

      let directives = _.compact(_.map(action.mission.sections, section => {
        return _.find(action.outcomes, {id: section.learningObjectiveId});
      }));

      return _.assign({}, state, {
        newMission: _.assign({}, action.mission, {
          startTime: moment(action.mission.startTime),
          deadline: moment(action.mission.deadline),
          selectedDirectives: directives
        }),
      });

    case CREATE_MISSION_OPTIMISTIC:
      return _.assign({}, state, {
        isCreateMissionInProgress: true,
      })

    case RECEIVE_CREATE_MISSION:
      return _.assign({}, state, {
        newMission: stampNewMission(),
        isCreateMissionInProgress: false
      })

    case CREATE_TEST_FLIGHT_MISSIONS_OPTIMISTIC:
      return _.assign({}, state, {
        isSpawnInProgress: true
      })

    case UPDATE_SPAWN_DATE:
      let nextSpawnFocusedInputEdit = null;
      if (_.has(action.data, "startDate") && state.spawnStartDate != action.data.startDate) {
        nextSpawnFocusedInputEdit = END_DATE
      } else if (_.has(action.data, "focusedInput")) {
        nextSpawnFocusedInputEdit = action.data.focusedInput
      }

      let newSpawnStartDate = _.has(action.data, "startDate") ? action.data.startDate : state.spawnDate
      let newSpawnDeadline = _.has(action.data, "endDate") ? action.data.endDate : state.spawnDate
      return _.assign({}, state, {
        spawnDate: {
          startTime: newSpawnStartDate,
          deadline: newSpawnDeadline
        },
        spawnDateFocused: nextSpawnFocusedInputEdit
      })

    case RECEIVE_CREATE_TEST_FLIGHT_MISSIONS:
      return _.assign({}, state, {
        isSpawnInProgress: false,
        spawnedMissionsByMission: _.assign({}, state.spawnedMissionsByMission, {
          [action.originalMission.id]: action.missions
        })
      })

    case DELETE_MISSION_OPTIMISTIC:
      return _.assign({}, state, {
        isDeleteMissionInProgress: true
      })

    case RECEIVE_DELETE_MISSION:
      return _.assign({}, state, {
        isDeleteMissionInProgress: false,
      })

    case RECEIVE_UPDATE_MISSION:
      return _.assign({}, state, {
        missions: _.map(state.missions, (m) => {
          if (m.id === action.mission.id) {
            return action.mission;
          }

          return m;
        }),
        currentMission: action.mission
      })

    case UPDATE_MISSION_FORM:
      // let's add some logic to the datepicker interactions ...
      // Probably shouldn't go here, but I'm not sure where it should really go
      let nextFocusedInput = null;
      if (_.has(action.data, "startDate") && state.newMission.startTime != action.data.startDate) {
        nextFocusedInput = END_DATE
      } else if (_.has(action.data, "focusedInput")) {
        nextFocusedInput = action.data.focusedInput
      }

      let newStartTime = _.has(action.data, "startDate") ? action.data.startDate : state.newMission.startTime,
        newDeadline = _.has(action.data, "endDate") ? action.data.endDate : state.newMission.deadline,
        newDisplayName = _.has(action.data, "displayName") ? action.data.displayName : state.newMission.displayName,
        // newGenusTypeId = _.has(action.data, "genusTypeId") ? action.data.genusTypeId : state.newMission.genusTypeId;
        newGenusTypeId = 'assessment-genus%3Afbw-homework-mission%40ODL.MIT.EDU';

      // lets do form validation
      let formError = false;
      if (newStartTime === null ||
          newDeadline === null ||
          newGenusTypeId === '' ||
          newDisplayName === '') {
        formError = true;
      }

      // let selectedModule = _.clone(state.newMission.selectedModule);
      // if (action.data.selectedModule) {
      //   selectedModule = action.data.selectedModule;
      // }

      let selectedDirectives = _.clone(state.newMission.selectedDirectives) || [];

      if (action.data.toggledDirective) {
        let isAlreadySelected = _.find(state.newMission.selectedDirectives, (outcome) => outcome.id === action.data.toggledDirective.id);

        if (!state.newMission.selectedDirectives) {
          selectedDirectives = [action.data.toggledDirective];

        } else if (isAlreadySelected) {
          selectedDirectives = _.reject(state.newMission.selectedDirectives, outcome => outcome.id === isAlreadySelected.id);

        } else {
          selectedDirectives = [...selectedDirectives, action.data.toggledDirective];
        }
      }

      let directiveSearchQuery = typeof action.data.directiveSearchQuery === 'undefined' ?
                                  _.clone(state.newMission.directiveSearchQuery) :
                                  action.data.directiveSearchQuery;

      // for update forms, we need to keep at least the id, assessmentOfferedId,
      return _.assign({}, state, {
        newMission: {
          id: state.newMission.id || null,
          assessmentOfferedId: state.newMission.assessmentOfferedId || null,
          startTime: newStartTime,
          deadline: newDeadline,
          displayName: newDisplayName,
          genusTypeId: newGenusTypeId,
          focusedInput: nextFocusedInput,
          formError: formError,
          selectedModule: action.data.selectedModule || state.newMission.selectedModule,
          selectedDirectives: selectedDirectives,
          directiveSearchQuery: directiveSearchQuery
        }
      })

    // case UPDATE_EDIT_MISSION_FORM:
    //   // let's add some logic to the datepicker interactions ...
    //   // Probably shouldn't go here, but I'm not sure where it should really go
    //   let nextFocusedInputEdit = null;
    //   if (_.has(action.data, "startDate") && state.editMission.startTime != action.data.startDate) {
    //     nextFocusedInputEdit = END_DATE
    //   } else if (_.has(action.data, "focusedInput")) {
    //     nextFocusedInputEdit = action.data.focusedInput
    //   }
    //
    //   let newStartTimeEdit = _.has(action.data, "startDate") ? action.data.startDate : state.editMission.startTime,
    //     newDeadlineEdit = _.has(action.data, "endDate") ? action.data.endDate : state.editMission.deadline,
    //     newDisplayNameEdit = _.has(action.data, "displayName") ? action.data.displayName : state.editMission.displayName,
    //     // newGenusTypeIdEdit = _.has(action.data, "genusTypeId") ? action.data.genusTypeId : state.editMission.genusTypeId;
    //     newGenusTypeIdEdit = 'assessment-genus%3Afbw-homework-mission%40ODL.MIT.EDU';
    //
    //   // lets do form validation
    //   let formErrorEdit = false;
    //   if (newStartTimeEdit === null ||
    //       newDeadlineEdit === null ||
    //       newGenusTypeIdEdit === '' ||
    //       newDisplayNameEdit === '') {
    //     formErrorEdit = true;
    //   }
    //
    //   return _.assign({}, state, {
    //     editMission: {
    //       id: state.editMission.id,
    //       assessmentOfferedId: state.editMission.assessmentOfferedId,
    //       startTime: newStartTimeEdit,
    //       deadline: newDeadlineEdit,
    //       displayName: newDisplayNameEdit,
    //       genusTypeId: newGenusTypeIdEdit,
    //       focusedInput: nextFocusedInputEdit,
    //       formError: formErrorEdit
    //     }
    //   })

    default:
      return state
  }
}


function stampNewMission() {
  return {
    startTime: null,
    deadline: null,
    displayName: '',
    genusTypeId: 'assessment-genus%3Afbw-homework-mission%40ODL.MIT.EDU',
    focusedInput: null,
    formError: false,
    selectedModule: null,
    selectedDirectives: [],
    directiveSearchQuery: ''
  }
}
