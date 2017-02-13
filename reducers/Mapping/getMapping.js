
import _ from 'lodash'
import axios from 'axios'

import {getDomain} from '../../utilities'

// ----
// Action types
export const RECEIVE_MAPPING = 'RECEIVE_MAPPING'
export const GET_MAPPING_OPTIMISTIC = 'GET_MAPPING_OPTIMISTIC'

// ----

// ------------------------------------
// Actions
// ------------------------------------
export function getMappingOptimistic(mapping) {
  return {type: GET_MAPPING_OPTIMISTIC, mapping};
}

export function receiveMapping(mapping) {
  return {type: RECEIVE_MAPPING, mapping};
}

export function getMapping(course, entityTypes, relationshipTypes) {

  return function(dispatch) {
    dispatch(getMappingOptimistic())

    return axios({
      url: `${getDomain()}/l4/mapping?courseId=${course.Id}&entities=${entityTypes}&relationships=${relationshipTypes}`,
    })
    .then( response => {
      dispatch(receiveMapping(response.data));

      return mapping;
    })
    .catch((error) => {
      console.log('error getting mapping', error);
    });

  }
}
