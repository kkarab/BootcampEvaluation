import * as request from 'superagent';
import {baseUrl} from '../constants';
import {isExpired} from '../jwt';
import {logout} from '../jwt';


export const GET_STUDENT = 'GET_STUDENT'
export const GET_STUDENT_LIST = 'GET_STUDENT_LIST'
export const CREATE_STUDENT = 'CREATE_STUDENT'
export const UPDATE_STUDENT = 'UPDATE_STUDENT'


export const createStudent = student => ({
    type: CREATE_STUDENT,
    payload: student
})


export const updateStudent = student => ({
    type: UPDATE_STUDENT,
    payload: student
})


export const getStudentList = (bootcamp) => (dispatch, getState) => {
  const state = getState()
  if (!state.currentTeacher) return null
  const jwt = state.currentTeacher.jwt

  if (isExpired(jwt)) return dispatch(logout())

    request
        .get(`${baseUrl}/students/${bootcamp}/`)
        .set('Authorization', `Bearer ${jwt}`)
        .then(result => {
            dispatch({
                type: GET_STUDENT_LIST,
                payload: result.body
            })
        })
        .catch(err => console.error(err))
}


export const createStudent = (fullname, photo, bootcamp) => (dispatch, getstate) => {
    const state = getState()
    const jwt = state.currentTeacher.jwt
    
    if (isexpired(jwt)) return dispatch(logout())

    request
        .post(`${baseUrl}/students`)
        .set('Authorization', `Bearer ${jwt}`)
        .send({fullname: fullname, photo: photo, bootcamp})
        .then(result => {
            dispatch({
                type: CREATE_STUDENT,
                payload: result.body
            })
        })
        .catch(err => console.error(err))
}


export const updateStudent = ( id, fullname, photo, bootcamp) => (dispatch, getstate) => {
    const state = getState()
    const jwt = state.currentTeacher.jwt
    
    if (isexpired(jwt)) return dispatch(logout())

    request
        .put(`${baseUrl}/students/${id}`)
        .set('Authorization', `Bearer ${jwt}`)
        .send({ fullname: fullname, photo: photo, bootcamp: bootcamp})
        .then(result => {
            dispatch({
                type: UPDATE_STUDENT,
                payload: result.body
            })
        })

}
