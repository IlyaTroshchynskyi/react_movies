import {tokenTypes} from "./tokenTypes";
import axiosClient from "../http_queries/axios_client";


export function getCurrentDatetimeSec() {
    const dateInMillisecond = Date.now();
    return Math.round(dateInMillisecond / 1000);
}

export function decodeToken(token) {
    return JSON.parse(atob(token.split('.')[1]))
}


export async function getAuthToken() {
    const accessToken = localStorage.getItem(tokenTypes.movieAccessToken)
    if (!accessToken) {
        return null
    }

    const decodedToken = decodeToken(accessToken)
    if (getCurrentDatetimeSec() < decodedToken.exp) {
        return accessToken
    }

    const refreshToken = localStorage.getItem(tokenTypes.movieRefreshToken)
    if (refreshToken) {
        const {data, status} = await axiosClient.post(
            'api/token/refresh/',
            {refresh: refreshToken},
            {
                headers: {'Content-Type': 'application/json'}
            })

        if (status === 200) {
            localStorage.setItem(tokenTypes.movieAccessToken, data.access)
            return data.access
        }
    }
    return null
}
