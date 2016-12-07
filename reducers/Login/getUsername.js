import Q from 'q'
import { get } from '../../utilities'

export const GET_USERNAME = 'GET_USERNAME'
export const GET_USERNAME_OPTIMISTIC = 'GET_USERNAME_OPTIMISTIC'
export const RECEIVE_USERNAME = 'RECEIVE_USERNAME'

export function receiveUsername(data) {
  return {type: 'RECEIVE_USERNAME', data}
}

function getUsernameOptimistic(data) {
  return {type: 'GET_USERNAME_OPTIMISTIC', data}
}

export function getUsername() {
  return function(dispatch) {
    dispatch(getUsernameOptimistic());

    return Q.all([get('username'), get('d2lUrl')])
    .then((data) => {
      // console.log('data', data)

      dispatch(receiveUsername({
        username: data[0],
        url: data[1]
      }));

      return data[0];
    })
  }
}
