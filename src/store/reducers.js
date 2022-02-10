import { combineReducers } from 'redux'
import { RECEIVE_USER } from './action-types'

/* 当前用户信息 */
const initUser = {
  name: '',
  address: '',
  profession: ''
}
function user (state = initUser, action) { // state是一个对象，对象需要设置初始值
  switch (action.type) {
    case RECEIVE_USER:
      return action.data
    default:
      return state
  }
}

export default combineReducers({
  user
})