import axiosClient from "./axios_client";

export async function getActors(limit, offset) {
    const {data} = await axiosClient.get(`v1/actor/?limit=${limit}&offset=${offset}`)
    return data
}
