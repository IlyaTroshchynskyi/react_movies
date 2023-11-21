import {getAuthToken} from "../auth/auth";
import {axiosClient} from "./axios_client";


export async function getGenres(limit, offset) {
    const {data} = await axiosClient.get(`v1/genre/?limit=${limit}&offset=${offset}`)
    return data
}


export async function getGenre({genreId, signal}) {
    const {data} = await axiosClient.get('v1/genre/' + genreId + '/', {signal})

    return data
}


export async function updateGenre({genreId, genreData}) {
    const token = await getAuthToken()
    const {data} = await axiosClient.put('v1/genre/' + genreId + '/',
        genreData.data,
        {headers: {'Authorization': 'Bearer ' + token}}
    )

    return data
}


export async function deleteGenre({objId}) {
    const token = await getAuthToken()
    const {data} = await axiosClient.delete('v1/genre/' + objId + '/',
        {headers: {'Authorization': 'Bearer ' + token}}
    )

    return data
}


export async function createGenre({genreData}) {
    const token = await getAuthToken()
    const {data} = await axiosClient.post('v1/genre/',
        genreData.data,
        {headers: {'Authorization': 'Bearer ' + token}}
    )

    return data
}


export default {getGenres, createGenre, deleteGenre, updateGenre, getGenre}
