// Axios requests go here
import axios, { AxiosRequestConfig } from 'axios'
import { Cookies } from 'react-cookie';

const dev = 'http://localhost:8000';
const web = 'https://ptir.pt';
const cookies = new Cookies();


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
    return axios.post('/api/login', formData, config)
}

export const SignUp = (username: string, email: string, password: string) => {
    const formData = new FormData()
    formData.append('username', username)
    formData.append('email', email)
    formData.append('password', password)
    return axios.post('/api/register', formData, config)
}

export const SignUpWithGoogle = (id_token: string) => {
    const formData = new FormData()
    formData.append("id_token", id_token)
    return axios.post('/api/signUpGoogle', formData, config)
}
// Probably not needed?
export const Recovery = (email: string) => {
    const formData = new FormData()
    formData.append('email', email)
    return axios.post('/api/recovery', formData, config)
}

export const Reset = () => {
    const formData = new FormData()
    return axios.post('/api/reset', formData, config)
}

export const Logout = () => {
    const formData = new FormData()
    return axios.post('/api/logout', formData, config)
}

export const Refresh = () => {
    const formData = new FormData()
    return axios.post('/api/refresh', formData, config)
}
//end
export const Profile = () => {
    let token = cookies.get("GreenMarketToken")
    config.headers = {
        Authorization: "Bearer " + token
    }

    return axios.get('/api/profile', config)
}

export const UpdateUser = (
    accountType?: string, name?: string, birthDate?: string,
    bankAccountNumber?: string, cellphoneNumber?: string,
    avatar?: string 
) => {
    let token = cookies.get("GreenMarketToken")
    config.headers = {
        Authorization: "Bearer " + token
    }

    const formData = new FormData()
    accountType && formData.append('accountType', accountType)
    name && formData.append('name', name)
    birthDate && formData.append('birthDate', birthDate)
    bankAccountNumber && formData.append('bankAccountNumber', bankAccountNumber)
    cellphoneNumber && formData.append('cellphoneNumber', cellphoneNumber)
    avatar && formData.append('avatar', avatar)

    return axios.post('/api/updateUser', formData, config)
}

export const CheckToken = () => {
    let token = cookies.get("GreenMarketToken")
    config.headers = {
        Authorization: "Bearer " + token
    }
    config.data = {}
    return axios.get('/api/checkToken', config)
}

export const SendMessage = (userId: string, idReceiver: string, message: string) => {
    let token = cookies.get("GreenMarketToken")
    config.headers = {
        Authorization: "Bearer " + token
    }
    const formData = new FormData()
    formData.append("userId", userId)
    formData.append("idReceiver", idReceiver)
    formData.append("message", message)

    return axios.post('/api/SendMessage', formData, config)
}

export const GetMessages = (userId: string, idReceiver: string) => {
    let token = cookies.get("GreenMarketToken")
    config.headers = {
        Authorization: "Bearer " + token
    }
    const formData = new FormData()
    formData.append("userId", userId)
    formData.append("idReceiver", idReceiver)

    return axios.post('/api/GetMessages', formData, config)
}

export const GetActiveChats = (id: string) => {
    let token = cookies.get("GreenMarketToken")
    config.headers = {
        Authorization: "Bearer " + token
    }
    config.data = {}
    return axios.get('/api/GetActiveChats/' + id, config)
}

export const AddProduct = (
    location: string
) => {
    let token = cookies.get("GreenMarketToken")
    config.headers = {
        Authorization: "Bearer " + token
    }

    const formData = new FormData()
    formData.append("location", location)

    return axios.post('/api/addProduct', formData, config)
}

export const GetAllProducts = () => {

    return axios.get('/api/getAllProducts', config)
}

export const GetProductById = (id: string) => {

    return axios.get('/api/getProductById/' + id, config)
}

export const UpdateProduct = (
    location?: string
) => {
    let token = cookies.get("GreenMarketToken")
    config.headers = {
        Authorization: "Bearer " + token
    }
    const formData = new FormData()
    location && formData.append('location', location)

    return axios.post('/api/updateProduct', formData, config)
}

export const DeleteProductById = (id: string) => {
    let token = cookies.get("GreenMarketToken")
    config.headers = {
        Authorization: "Bearer " + token
    }

    return axios.get('/api/deleteProductById/' + id, config)
}

export const GetProductsWithFilter = (
    location?: string
) => {
    let token = cookies.get("GreenMarketToken")
    config.headers = {
        Authorization: "Bearer " + token
    }
    const formData = new FormData()
    location && formData.append('location', location)


    return axios.post('/api/getProductsWithFilter', formData, config)
}