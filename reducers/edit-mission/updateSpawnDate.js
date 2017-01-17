
import thunk from 'redux-thunk';
import 'lodash'

export const UPDATE_SPAWN_DATE = 'UPDATE_SPAWN_DATE'


export function updateSpawnDate(data) {
  return {
    type: UPDATE_SPAWN_DATE,
    data
  }
}
