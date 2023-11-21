import axiosClient from "./axios_client";

export async function getDirectors(limit, offset) {
    const {data} = await axiosClient.get(`v1/director/?limit=${limit}&offset=${offset}`)
    return data
}
