
import thunk from 'redux-thunk';
import _ from 'lodash'

import {GET_MAPPING_OPTIMISTIC, RECEIVE_MAPPING} from './getMapping'
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

    case GET_MAPPING_OPTIMISTIC:
      return _.assign({}, state, {
        isGetMappingInProgress: true
      })

    case RECEIVE_MAPPING:
      return _.assign({}, state, {
        modules: _.filter(action.mapping.entities, {type: 'MODULE'}),
        outcomes: _.filter(action.mapping.entities, {type: 'OUTCOME'}),
        relationships: action.mapping.relationships,
        isGetMappingInProgress: false
      })

    default:
      return state
  }
}
