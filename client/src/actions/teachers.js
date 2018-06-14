import * as request from 'superagent';
import {baseUrl} from '../constants';
import {isExpired} from '../jwt';


export const CREATE_TEACHER = 'ADD_TEACHER'
export const UPDATE_TEACHER = 'UPDATE_TEACHER'
export const UPDATE_TEACHERS = 'UPDATE_TEACHERS'

export const TEACHER_LOGIN_SUCCESS = 'TEACHER_LOGIN_SUCCESS'
export const TEACHER_LOGIN_FAILED = 'TEACHER_LOGIN_FAILED'

export const TEACHER_LOGOUT = 'TEACHER_LOGOUT'

export const TEACHER_SIGNUP_SUCCESS = 'TEACHER_SIGNUP_SUCCESS'
export const TEACHER_SIGNUP_FAILED = 'TEACHER_SIGNUP_FAILED'

export const logout = () => ({
  type: TEACHER_LOGOUT
})

export const login = (email, password) => (dispatch) =>
	request
		.post(`${baseUrl}/logins`)
    .send({email, password})
    .then(result => {
      dispatch({
        type: TEACHER_LOGIN_SUCCESS,
        payload: result.body
      })
    })
    .catch(err => {
    	if (err.status === 400) {
    		dispatch({
    			type: TEACHER_LOGIN_FAILED,
    			payload: err.response.body.message || 'Unknown error'
    		})
    	}
    	else {
    		console.error(err)
    	}
    })

export const signup = (firstname, lastname,email, password) => (dispatch) =>
	request
		.post(`${baseUrl}/teachers`)
		.send({ firstName: firstName, lastName: lastName, email, password })
		.then(result => {
			dispatch({
				type: TEACHER_SIGNUP_SUCCESS
			})
		})
		.catch(err => {
			if (err.status === 400) {
				dispatch({
					type: TEACHER_SIGNUP_FAILED,
					payload: err.response.body.message || 'Unknown error'
				})
			}
			else {
				console.error(err)
			}
		})

export const getTeachers = () => (dispatch, getState) => {
  const state = getState()
  if (!state.currentTeacher) return null
  const jwt = state.currentTeacher.jwt

  if (isExpired(jwt)) return dispatch(logout())

  request
    .get(`${baseUrl}/teachers`)
    .set('Authorization', `Bearer ${jwt}`)
    .then(result => {
      dispatch({
        type: UPDATE_TEACHERS,
        payload: result.body
      })
    })
    .catch(err => console.error(err))
}
