import axiosClient from "./axios_client";
import {getAuthToken} from "../auth/auth";

export async function getActors(limit, offset) {
    const {data} = await axiosClient.get(`v1/actor/?limit=${limit}&offset=${offset}`)
    return data
}

export async function deleteActor({objId}) {
    const token = await getAuthToken()
    const {data} = await axiosClient.delete('v1/actor/' + objId + '/',
        {headers: {'Authorization': 'Bearer ' + token}}
    )
    return data
}


export async function createActor({actorData}) {
    const token = await getAuthToken()
    const {data} = await axiosClient.post('v1/actor/',
        actorData.values,
        {headers: {'Authorization': 'Bearer ' + token}}
    )
    return data
}
