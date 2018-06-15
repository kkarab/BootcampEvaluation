//import * as request from 'superagent';
import { baseUrl } from './constants';


function getRandomElement(arr) {
    var index = Math.floor(Math.random() * arr.length);
    console.log(index);
    return arr[index];
}

function getRandomStudent(redStudents, yellowStudents, greenStudents) {
    var rand = Math.random();
    if (rand <= 0.45) {
        //console.log('Red');
        return getRandomElement(redStudents);
    }
    if (rand <= 0.8) {
        //console.log('Yellow');
        return getRandomElement(yellowStudents);
    }
    //console.log('Green');
    return getRandomElement(greenStudents);
}
//console.log(getRandomStudentId(array1, array2, array3));

//make it async if it is not responsive
export const algorithm = (bootcamp) =>  (dispatch,getState) => {
    const state = getState()
    const jwt = state.currentTeacher.jwt
    const studentList = await request
                                .get(`${baseUrl}/students/${bootcamp}`)
                                .set('Authorization', `Bearer ${jwt}`)
                                .then(result => {return result.body})
                                .catch(err => console.log(err))

    if (!studentList) {
        return null
        //console.log('There are no students...')
    }

    const studentsRed = studentList.filter(student=>student.evaluation==='red')
    const studentsYellow = studentList.filter(student=>student.evaluation==='yellow')
    const studentsGreen = studentList.filter(student=>student.evaluation==='green')


    const randomStudent = getRandomStudent(studentsRed,studentsUYellow,studentsGreen)
    return randomStudent
    
}