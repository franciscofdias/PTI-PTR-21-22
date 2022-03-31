// Axios requests go here
import axios, { AxiosRequestConfig } from 'axios'

let dev = 'http://localhost:3000'
let web = 'tbd'

let config: AxiosRequestConfig = {
    baseURL: dev,
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