import axios from './axios'

export const reqUser = (data) => axios.request({url: '/api/user', data, method: 'POST'})