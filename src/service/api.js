import axios from './axios'

export const reqUser = (data) => axios.request({url: '/api/home', data, method: 'POST'})