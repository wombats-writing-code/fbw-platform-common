
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

export function getMapping(data) {
  let courseId = data.courseId;
  let entityTypes = data.entityTypes;
  let relationshipTypes = data.relationshipTypes;

  return function(dispatch) {
    dispatch(getMappingOptimistic())

    return axios({
      url: `${getDomain()}/l4/mapping?courseId=${courseId}&entities=${entityTypes}&relationships=${relationshipTypes}`,
    })
    .then( response => {
      dispatch(receiveMapping(response.data));

      return response.data;
    })
    .catch((error) => {
      console.log('error getting mapping', error);
    });

  }
}
