
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

export function getItems(courseId, username) {

  return function(dispatch) {
    dispatch(getItemsOptimistic([]));

    return axios({
      url: `${getDomain()}/l4/questions?courseId=${courseId}` ,
      headers: {
        'x-fbw-username': username
      }
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
