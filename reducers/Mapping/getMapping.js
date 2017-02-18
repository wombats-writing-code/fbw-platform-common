
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
  if (!data.course) {
    throw TypeError('course must be provided to getMapping')
  }

  if (!data.entityTypes) {
    throw TypeError('entityType must be provided')
  }

  let courseId = data.course.Id || data.course.Identifier;
  let relationshipTypesString = arrayEncode(data.relationshipTypes, 'relationships')
  let entityTypesString = arrayEncode(data.entityTypes, 'entities')

  return function(dispatch) {
    dispatch(getMappingOptimistic())

    return axios({
      url: `${getDomain()}/l4/mapping?courseId=${courseId}${entityTypesString}${relationshipTypesString}`,
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

export function arrayEncode(array, query) {
  if (!array || !query) return '';

  let string;
  if (array.length === 1) {
    string = `&${query}=` + array[0];
  } else {
    string = _.reduce(array, (result, value) => {
      result += `&${query}=` + value;
      return result;
    }, '');
  }

  return string;
}
