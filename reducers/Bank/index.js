// bank reducer

import thunk from 'redux-thunk';
import _ from 'lodash'

import {RECEIVE_BANKS} from './getBanks'
import {RECEIVE_SELECT_BANK, SELECT_BANK_OPTIMISTIC} from './selectBank'
import {RECEIVE_ITEMS} from './getItems'

import {RECEIVE_AUTHENTICATE_D2L} from '../Login/authenticateD2L'
import {LOG_OUT} from '../Login/logOutUser'

// ------------------------------------
// Reducer
// ------------------------------------

import VISITOR_BANKS from './visitor-banks'

const initialState = {
  banks: VISITOR_BANKS
}
export default function bankReducer (state = initialState, action) {
  switch (action.type) {
    case RECEIVE_BANKS:
      return _.assign({}, state, {
        banks: action.banks,
      });

    case SELECT_BANK_OPTIMISTIC:
      return _.assign({}, state, {
        currentBank: action.bank,
        getPrivateBankIdInProgress: true,
        privateBankId: null
      });

    case RECEIVE_SELECT_BANK:
      return _.assign({}, state, {
        privateBankId: action.privateBankId,
        getPrivateBankIdInProgress: false
      })

    case RECEIVE_ITEMS:
      return _.assign({}, state, {
        items: action.items
      });

    case RECEIVE_AUTHENTICATE_D2L:
      // console.log('RECEIVE_AUTHENTICATE_D2L in bank reducer', action)
      return _.assign({}, state, {
        banks: action.data.banks
      })

    case LOG_OUT:
      return _.assign({}, state, {
        banks: null,
        privateBankId: null,
        getPrivateBankIdInProgress: false,
      })

    default:
      return state
  }
}
