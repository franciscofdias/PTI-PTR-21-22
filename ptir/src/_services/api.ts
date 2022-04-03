// Axios requests go here
import axios, { AxiosRequestConfig } from 'axios'
import { Cookies } from 'react-cookie';

const dev = 'http://localhost:3000';
const web = 'https://ptir.pt';
const cookies = new Cookies();

let config: AxiosRequestConfig = {
    baseURL: web,
    timeout: 10000,
    responseType: 'json',
    validateStatus: (status: number) => status >= 200 && status < 300,
    maxRedirects: 5,
}

export const Login = (email: string, password: string) => {
    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)
    return axios.post('/api/auth/login', formData, config)
}

export const SignUp = (username: string, email: string, password: string, accountType: string) => {
    const formData = new FormData()
    formData.append('username', username)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('accountType', accountType)
    return axios.post('/api/auth/signup', formData, config)
}

export const Recovery = (email: string) => {
    const formData = new FormData()
    formData.append('email', email)
    return axios.post('/api/auth/recovery', formData, config)
}

export const Reset = () => {
    const formData = new FormData()
    return axios.post('/api/auth/reset', formData, config)
}

export const Logout = () => {
    const formData = new FormData()
    return axios.post('/api/auth/logout', formData, config)
}

export const Refresh = () => {
    const formData = new FormData()
    return axios.post('/api/auth/refresh', formData, config) 
}

export const Me = () => {
    return axios.get('/api/auth/me', config)
}

export const UpdateUser = () => {
    const formData = new FormData()
    return axios.post('/api/auth/updateUser', formData, config)
}

export const CheckToken = () => {
    let token = cookies.get("GreenMarketToken")
    config.headers = {
        Authorization: "Bearer " + token
    }
    return axios.get('/api/auth/checkToken', config)
}