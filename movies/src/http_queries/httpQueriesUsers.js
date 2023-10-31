import {tokenTypes} from "../auth/tokenTypes";
import {getAuthToken} from "../auth/auth";
import axiosClient from "./axios_client";


export async function loginUser(userData) {
    const {data, status} = await axiosClient.post(
        'token/',
        userData.user)


    if (status !== 200) {
        const error = new Error('Error while user log in')
        error.code = status
        error.message = data
        throw error
    }

    localStorage.setItem(tokenTypes.movieAccessToken, data.access)
    localStorage.setItem(tokenTypes.movieRefreshToken, data.refresh)
    return true

}


export async function getCurrentUser() {
    const token = await getAuthToken()
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`
    const {data, status} = await axiosClient.get('me')


    if (status !== 200) {
        const error = new Error('Error while getting user')
        error.code = status
        error.message = data
        throw error
    }

    return data

}
