import * as request from 'superagent';
import {baseUrl} from '../constants';
import {logout} from './teachers';
import {isExpired} from '../jwt';


export const ADD_BOOTCAMP = 'ADD_BOOTCAMP'
export const UPDATE_BOOTCAMP = 'UPDATE_BOOTCAMP'


const addBootcamp = bootcamp => ({
  type: ADD_BOOTCAMP,
  payload: bootcamp
})


const updateBootcamp = bootcamp => ({
  type: UPDATE_BOOTCAMP,
  payload: bootcamp
})


export const getBootcampList = () => (dispatch, getState) => {
  const state = getState()
  if (!state.currentTeacher) return null
  const jwt = state.currentTeacher.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/bootcamps`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => dispatch(updateBootcamp(result.body)))
    .catch(err => console.error(err))
}


export const createBootcamp = (bootcamp, startDate, endDate) => (dispatch, getState) => {
  const state = getState()
  const jwt = state.currentUser.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .post(`${baseUrl}/bootcamps`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => dispatch(addBootcamp(result.body)))
    .catch(err => console.error(err))
}
