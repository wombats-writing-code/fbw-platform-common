
import {RECEIVE_MISSIONS} from '../reducers/Mission/getMissions'
import {RECEIVE_CREATE_TAKE_MISSION} from '../reducers/Mission/selectOpenMission'
import {SELECT_DIRECTIVE} from '../reducers/Mission/selectDirective'
import {SELECT_TARGET} from '../reducers/Mission/selectTarget'
import {LOG_OUT} from '../reducers/Login/logOutUser'

import {getD2LUserIdentifer} from '../selectors/login'
import {getCurrentCourse} from '../selectors/course'

const logger = store => next => action => {
  if (window.ga) {
    let state = store.getState();
    let course = getCurrentCourse(state);
    let userIdentifier = getD2LUserIdentifer(state);

    // console.log('state in logger', state);

    switch(action.type) {
      case RECEIVE_AUTHENTICATE_D2L:
        ga('set', 'userId', action.data.d2lUser.Identifier);  // Set the user ID using signed-in user_id.
        break;

      case RECEIVE_MISSIONS:
        try {
          ga('send', {
            hitType: 'event',
            eventAction: action.type,
            eventCategory: course.name || course.displayName,
            eventValue: userIdentifier
          });
        } catch (e) {
          console.log(e);
        }
        break;

      case RECEIVE_CREATE_TAKE_MISSION:
        try {
          ga('send', {
            hitType: 'event',
            eventAction: action.type,
            eventCategory: state.mission.currentMission.displayName.text,
            eventValue: userIdentifier
          });
        } catch(e) {
          console.log(e);
        }
        break;

      case SELECT_DIRECTIVE:
        try {
          ga('send', {
            hitType: 'event',
            eventAction: action.type,
            eventCategory: action.directiveIndex,
            eventValue: userIdentifier
          });
        } catch(e) {
          console.log(e);
        }
        break;

      case SELECT_TARGET:
        try {
          ga('send', {
            hitType: 'event',
            eventAction: action.type,
            eventCategory: action.target.itemId,
            eventValue: userIdentifier
          });
        } catch(e) {
          console.log(e);
        }
        break;

      case LOG_OUT:
        try {
          ga('send', {
            hitType: 'event',
            eventAction: action.type,
            eventCategory: state.mission.currentMission.displayName.text,
            eventValue: userIdentifier
          });
        } catch(e) {
          console.log(e);
        }
        break;
    }
  }

  // console.log('continuing this action', action)
  next(action);
}


export default logger
