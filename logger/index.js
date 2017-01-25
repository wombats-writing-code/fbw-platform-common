
import {LOGGED_IN} from '../reducers/Login/logInUser'


const logger = store => next => action => {
  if (window.ga) {
    switch(action.type) {
      case LOGGED_IN:
        ga('set', 'userId', action.data.username);  // Set the user ID using signed-in user_id.
    }
  }

  console.log('continuing', action)
  next(action);
}


export default logger
