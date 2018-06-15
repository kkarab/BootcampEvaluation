import {ADD_STUDENT, UPDATE_STUDENT} from '../actions/students';


export default (state = null, {type, payload}) => {
  switch (type) {
    case ADD_STUDENT:
      return {
        ...state,
        [payload.id]: payload
      }

    
    case UPDATE_STUDENT:
      return payload.reduce((students, student) => {
        student[student.id] = student
        return students
      }, {})

    default:
      return state
  }
}
