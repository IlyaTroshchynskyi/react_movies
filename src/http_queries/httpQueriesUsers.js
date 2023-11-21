import {tokenTypes} from "../auth/tokenTypes";
import {getAuthToken} from "../auth/auth";
import axiosClient from "./axios_client";


export async function loginUser(userData) {
    const {data, status} = await axiosClient.post(
        'token/',
        userData.user)

    localStorage.setItem(tokenTypes.movieAccessToken, data.access)
    localStorage.setItem(tokenTypes.movieRefreshToken, data.refresh)
    return true

}


export async function getCurrentUser() {
    const token = await getAuthToken()

    const {data} = await axiosClient.get(
        'me',
        {
            headers: {'Authorization': 'Bearer ' + token}
        }
    )

    return data

}
