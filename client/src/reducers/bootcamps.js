import {ADD_BOOTCAMP, UPDATE_BOOTCAMP} from '../actions/bootcamps';


export default (state = null, {type, payload}) => {
  switch (type) {
    case ADD_BOOTCAMP:
      return {
        ...state,
        [payload.id]: payload
      }


    case UPDATE_BOOTCAMP:
      return payload.reduce((bootcamps, bootcamp) => {
        bootcamps[bootcamp.id] = bootcamp
        return bootcamps
      }, {})

    default:
      return state
  }
}
