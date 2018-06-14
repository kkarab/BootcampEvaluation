import * as request from 'superagent';
import {baseUrl} from '../constants';
import {getStudentList} from './students';
import { get } from 'http';



export const ADD_EVALUATION = 'ADD_EVALUATION'


export const newEvaluation = (teacherId, studentId, date, evaluation, comments) => (dispatch, getState) => {
    const state = getState()
    const jwt = state.login.user
    
    const performance = {teacherId, studentId, date, evaluation, comments}
    performance.date = new Date()
    async function getEvaluation(studentId){
        await request
                .get(`${baseUrl}/getBootcamp/${studentId}`)
                .set('Authorization', `Bearer ${jwt}`)
                .then(result => (dispatch(getStudentList(result.body.student.bootcamp)))
            )
    }

    request
        .post(`${baseUrl}/students/${student}/evaluations`)
        .send(newEvaluation)
        .set('Authorization', `Bearer ${jwt}`)
        .then(result => (dispatch(getbootcamp(parseInt(result.body.student,10)))))
}