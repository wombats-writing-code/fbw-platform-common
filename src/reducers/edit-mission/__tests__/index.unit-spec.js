import _ from 'lodash'
import moment from 'moment'
require('moment-timezone')

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'
const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const should = require('should');

import {createMission} from '../createMission'
import {deleteMission} from '../deleteMission'
import {updateMission} from '../updateMission'
import reducer from '../index'
import {EDIT_MISSION} from '../editMission'
import {CLICK_ADD_MISSION} from '../clickAddMission'
import {CLICK_EDIT_MISSION, CANCEL_EDIT_MISSION} from '../clickEditMission'

import {
  CREATE_MISSION_OPTIMISTIC, RECEIVE_CREATE_MISSION,
  CREATE_MISSIONS_OPTIMISTIC, RECEIVE_CREATE_MISSIONS
} from '../createMission'
import {UPDATE_MISSION_OPTIMISTIC, RECEIVE_UPDATE_MISSION} from '../updateMission'
import {RECEIVE_DELETE_MISSION} from '../deleteMission'
import {
  CHANGE_MISSION_NAME, CHANGE_MISSION_TYPE, CHANGE_MISSION_START, CHANGE_MISSION_END,
  SELECT_MODULE, CHANGE_OUTCOME_SEARCH, TOGGLE_OUTCOME, CHANGE_FOLLOWS_FROM_MISSIONS,
  MOVE_OUTCOME_UP, MOVE_OUTCOME_DOWN
} from '../updateMissionForm'
import {missionConfig} from '../../Mission'


describe('edit-mission reducer', () => {

  it('should update state upon the CREATE_MISSIONS_OPTIMISTIC action', () => {
    let newState = reducer({}, {
      type: CREATE_MISSIONS_OPTIMISTIC,
      mission: {displayName: 'foo'}
    })

    newState.isCreateMissionInProgress.displayName.should.eql('foo')
  })

  it('should update state upon the RECEIVE_CREATE_MISSION action', () => {
    let newState = reducer({}, {
      type: RECEIVE_CREATE_MISSION,
      mission: {displayName: 'foo'}
    })

    newState.newMission.displayName.should.eql('');
    newState.isCreateMissionInProgress.should.eql(false);
  });

  it('should update state upon the RECEIVE_CREATE_MISSIONS action', () => {
    let newState = reducer({}, {
      type: RECEIVE_CREATE_MISSIONS,
      missions: [{displayName: 'foo'}, {displayName: 'bar'}]
    })

    newState.newMission.displayName.should.eql('');
    newState.isCreateMissionInProgress.should.eql(false);
  });

  it('should update state upon the RECEIVE_UPDATE_MISSION action', () => {
    let newState = reducer({}, {
      type: RECEIVE_UPDATE_MISSION,
      missions: [{displayName: 'foo'}]
    })
    // console.log(newState)

    newState.newMission.displayName.should.eql('');
    newState.isUpdateMissionInProgress.should.eql(false);
    newState.isEditMissionInProgress.should.eql(false)
  });

  it('should update state upon the RECEIVE_DELETE_MISSION action', () => {
    let newState = reducer({}, {
      type: RECEIVE_DELETE_MISSION,
      mission: {displayName: 'foo'}
    })

    newState.isDeleteMissionInProgress.should.eql(false);
  });

  it('should update state upon the CHANGE_MISSION_NAME action', () => {
    let newState = reducer({}, {
      type: CHANGE_MISSION_NAME,
      value: 'wowza'
    })

    newState.newMission.displayName.should.eql('wowza');
  });

  it('should update state upon the CHANGE_MISSION_TYPE action', () => {
    let newState = reducer({}, {
      type: CHANGE_MISSION_TYPE,
      missionType: missionConfig.PHASE_II_MISSION_TYPE
    })

    newState.newMission.type.should.eql(missionConfig.PHASE_II_MISSION_TYPE);
    newState.newMission.displayName.should.eql('');
    newState.newMission.description.should.eql('');

  });

  it('should update state upon the CHANGE_MISSION_START action', () => {
    let datetime = moment();
    let newState = reducer({}, {
      type: CHANGE_MISSION_START,
      datetime
    })

    newState.newMission.startTime.should.eql(datetime);
  });

  it('should update state upon the CHANGE_MISSION_END action', () => {
    let datetime = moment();
    let newState = reducer({}, {
      type: CHANGE_MISSION_END,
      datetime
    })

    newState.newMission.deadline.should.eql(datetime);
  });

  it('should update state upon the SELECT_MODULE action', () => {
    let newState = reducer({}, {
      type: SELECT_MODULE,
      module: {name: 'foo'}
    })

    newState.selectedModule.should.eql({name: 'foo'});
  });

  it('should update state upon the CHANGE_OUTCOME_SEARCH action', () => {
    let newState = reducer({}, {
      type: CHANGE_OUTCOME_SEARCH,
      query: 'calculate'
    })

    newState.outcomeQuery.should.eql('calculate');
  });

  it('should update state upon the TOGGLE_OUTCOME action', () => {
    let toggleOnState = reducer({
      newMission: {
        goals: [2]
      }
    }, {
      type: TOGGLE_OUTCOME,
      outcome: {id: 1}
    });

    let toggleOffState = reducer({
      newMission: {
        goals: [1, 2]
      }
    }, {
      type: TOGGLE_OUTCOME,
      outcome: {id: 1}
    });

    toggleOnState.newMission.goals.should.eql([2, 1]);
    toggleOffState.newMission.goals.should.eql([2]);
  });

  it('should update the state upon the CHANGE_FOLLOWS_FROM_MISSIONS action', () => {
    let newState = reducer({
      newMission: {
        followsFromMissions: [18, 20]
      }
    }, {
      type: CHANGE_FOLLOWS_FROM_MISSIONS,
      missions: [
        {
          id: 1,
          displayName: 'foo'
        },
        {
          id: 2,
          displayName: 'bar'
        }
      ]
    });

    newState.newMission.followsFromMissions.should.eql([1, 2]);
  });

  it('should update the state upon the EDIT_MISSION action', () => {
    let newState = reducer({}, {
      type: EDIT_MISSION,
      mission: {
        displayName: 'foo'
      }
    });

    newState.newMission.displayName.should.eql('foo');
  });

  it('should update the state upon the CLICK_ADD_MISSION action', () => {
    let newState = reducer({}, {
      type: CLICK_ADD_MISSION
    });

    should.not.exist(newState.newMission.type);
    newState.newMission.displayName.should.eql('');
    newState.newMission.goals.should.eql([]);
  });

  it('should update the state upon the CLICK_EDIT_MISSION action', () => {
    let newState = reducer({}, {
      type: CLICK_EDIT_MISSION,
      mission: {
        displayName: 'foo'
      }
    });

    newState.newMission.displayName.should.eql('foo');
    newState.isEditMissionInProgress.should.eql(true);
  });

  it('should update the state upon the CANCEL_EDIT_MISSION action', () => {
    let newState = reducer({}, {
      type: CANCEL_EDIT_MISSION,
    });

    // should.not.exist(newState.newMission.);
    newState.isEditMissionInProgress.should.eql(false);
  });

  it('should update state upon the MOVE_OUTCOME_UP action', () => {
    let unusedGoal = reducer({
      newMission: {
        goals: [2]
      }
    }, {
      type: MOVE_OUTCOME_UP,
      outcome: {id: 1}
    });

    unusedGoal.newMission.goals.should.eql([2]);

    let firstGoal = reducer({
      newMission: {
        goals: [1, 2]
      }
    }, {
      type: MOVE_OUTCOME_UP,
      outcome: {id: 1}
    });

    firstGoal.newMission.goals.should.eql([1, 2]);

    let secondGoal = reducer({
      newMission: {
        goals: [1, 2]
      }
    }, {
      type: MOVE_OUTCOME_UP,
      outcome: {id: 2}
    });

    secondGoal.newMission.goals.should.eql([2, 1]);

    let thirdGoal = reducer({
      newMission: {
        goals: [1, 2, 3]
      }
    }, {
      type: MOVE_OUTCOME_UP,
      outcome: {id: 3}
    });

    thirdGoal.newMission.goals.should.eql([1, 3, 2]);
  });

  it('should update state upon the MOVE_OUTCOME_DOWN action', () => {
    let unusedGoal = reducer({
      newMission: {
        goals: [2]
      }
    }, {
      type: MOVE_OUTCOME_DOWN,
      outcome: {id: 1}
    });

    unusedGoal.newMission.goals.should.eql([2]);

    let firstGoal = reducer({
      newMission: {
        goals: [1, 2]
      }
    }, {
      type: MOVE_OUTCOME_DOWN,
      outcome: {id: 1}
    });

    firstGoal.newMission.goals.should.eql([2, 1]);

    let secondGoal = reducer({
      newMission: {
        goals: [1, 2]
      }
    }, {
      type: MOVE_OUTCOME_DOWN,
      outcome: {id: 2}
    });

    secondGoal.newMission.goals.should.eql([1, 2]);

    let thirdGoal = reducer({
      newMission: {
        goals: [1, 2, 3]
      }
    }, {
      type: MOVE_OUTCOME_DOWN,
      outcome: {id: 1}
    });

    thirdGoal.newMission.goals.should.eql([2, 1, 3]);
  });
})
