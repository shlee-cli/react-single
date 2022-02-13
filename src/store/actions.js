import { reqUser } from '../service/api'
import { RECEIVE_USER } from './action-types'

// 每一个action type都对应一个同步的action
const receiveUser = (user) => ({ type: RECEIVE_USER, data: user })

/* 获取当前用户信息 */
export const getUser = (user) => {
  return async dispatch => {
    let result = await reqUser(user)
    if (result.error === 0) {
      dispatch(receiveUser(result.data))
    }
  }
}