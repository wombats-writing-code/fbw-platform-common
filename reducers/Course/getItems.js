
import 'lodash'
import axios from 'axios'

import {getDomain} from '../../utilities'

// ----
// Action types
export const RECEIVE_ITEMS = 'RECEIVE_ITEMS'
export const GET_ITEMS = 'GET_ITEMS'
// ----

// ------------------------------------
// Actions
// ------------------------------------

export function receiveItems(items) {
  return {type: RECEIVE_ITEMS, items};
}

export function getItemsOptimistic(data) {
  return {type: GET_ITEMS, data };
}

export function getItems(data) {
  if (!data.course) {
    throw TypeError('course must be provided to getMapping')
  }

  return function(dispatch) {
    dispatch(getItemsOptimistic([]));

    return axios({
      url: `${getDomain()}/l4/questions?courseId=${data.course.Id || data.course.Identifier}` ,
    })
    .then((response) => {
      // console.log('get items response', response)
      let items = response.data;
      dispatch(receiveItems(items));

      return items;
    })
    .catch((error) => {
      console.log('error getting items data', error);
    });
  }
}
