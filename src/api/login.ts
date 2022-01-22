import { get, post } from './utils/http'

export const login = (data = {}) => post('/user/login', data)

export const getInfo = () => get('/user/info')
