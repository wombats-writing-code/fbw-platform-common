
import thunk from 'redux-thunk';
import 'lodash'

import {RECEIVE_MAPPING} from './getMapping'

import { LOG_OUT } from '../Login/logOutUser'

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  modules: null,
  outcomes: null,
  relationships: null
}

export default function mappingReducer (state = initialState, action) {
  switch (action.type) {
    case LOG_OUT:
      return _.assign({}, {
        modules: null,
        outcomes: null,
        relationships: null
      })

    case RECEIVE_MAPPING:
      return action.mapping

    default:
      return state
  }
}
