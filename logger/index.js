
import {LOGGED_IN} from '../reducers/Login/logInUser'
import {RECEIVE_CREATE_TAKE_MISSION} from '../reducers/Mission/selectOpenMission'
import {SELECT_DIRECTIVE} from '../reducers/Mission/selectDirective'
import {SELECT_TARGET} from '../reducers/Mission/selectTarget'
import {LOG_OUT} from '../reducers/Login/logOutUser'

import {getUser} from '../selectors'
import {getEnrolledSubject} from '../selectors/bank'


const logger = store => next => action => {
  if (window.ga) {
    let state = store.getState();
    let subject = getEnrolledSubject(state);
    let username = getUser(state).username;

    console.log('state in logger', state);

    switch(action.type) {
      case LOGGED_IN:
        ga('set', 'userId', action.data.username);  // Set the user ID using signed-in user_id.

      case RECEIVE_MISSIONS:
        try {
          ga('send', {
            hitType: 'event',
            eventAction: action.type,
            eventCategory: subject.name || subject.displayName,
            eventValue: username
          });
        } catch (e) {
          console.log(e);
        }

      case RECEIVE_CREATE_TAKE_MISSION:
        try {
          ga('send', {
            hitType: 'event',
            eventAction: action.type,
            eventCategory: state.mission.currentMission.displayName.text,
            eventValue: username
          });
        } catch(e) {
          console.log(e);
        }

      case SELECT_DIRECTIVE:
        try {
          ga('send', {
            hitType: 'event',
            eventAction: action.type,
            eventCategory: action.directiveIndex,
            eventValue: username
          });
        } catch(e) {
          console.log(e);
        }

      case SELECT_TARGET:
        try {
          ga('send', {
            hitType: 'event',
            eventAction: action.type,
            eventCategory: action.target.itemId,
            eventValue: username
          });
        } catch(e) {
          console.log(e);
        }

      case LOG_OUT:
        try {
          ga('send', {
            hitType: 'event',
            eventAction: action.type,
            eventCategory: state.mission.currentMission.displayName.text,
            eventValue: username
          });
        } catch(e) {
          console.log(e);
        }
    }
  }

  console.log('continuing this action', action)
  next(action);
}


export default logger
