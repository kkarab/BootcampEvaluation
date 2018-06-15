import {TEACHER_LOGIN_FAILED} from '../actions/teachers';


export default function (state = {}, {type, payload}) {
	switch (type) {
		case TEACHER_LOGIN_FAILED:
			return {
				error: payload
			}

		default:
      return state
	}
}
