
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

export function getItems(bankId) {

  return function(dispatch) {
    dispatch(getItemsOptimistic([]));

    let url = `${getDomain()}/middleman/banks/${bankId}/items`;

    return axios(url)
    .then((response) => {
      let items = response.data;
      dispatch(receiveItems(items));

      return items;
    })
    .catch((error) => {
      console.log('error getting items data', error);
    });
  }
}
