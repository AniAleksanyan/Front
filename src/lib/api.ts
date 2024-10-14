import axios from "axios";
import { BASE_URL } from "./constants";
import { IResponse, inputUser, IUserLogin } from "./types";

const Axios = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

export const apiSignUp = async (user: inputUser):Promise<IResponse> => {
    const response = await Axios.post('/signup', user)
    return response.data
}

export const apiSignIn = async (user: IUserLogin):Promise<IResponse> => {
    const response = await Axios.post('/login', user)
    return response.data
}

export const apiVerify = async():Promise<IResponse> => {
    const response = await Axios.get('/verify')
    return response.data
}

export const apiLogOut = async():Promise<IResponse> => {
    const response = await Axios.post('/logout')
    return response.data
}