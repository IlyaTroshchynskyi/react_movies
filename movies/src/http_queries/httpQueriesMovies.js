import {axiosClient} from "./axios_client";
import {getAuthToken} from "../auth/auth";


export async function getMovies(limit, offset, filterQueryParams) {
    const {data} = await axiosClient.get(`v1/movie/?limit=${limit}&offset=${offset}${filterQueryParams}`)
    return data
}

export async function getMovie({movieId}) {
    const {data} = await axiosClient.get('v1/movie/' + movieId + '/')
    return data
}


export async function getAllCountries() {
    const countries = new Set();
    const {data} = await axiosClient.get(`v1/movie/`)
    for (const movie of data.results) {
        countries.add(movie.country)
    }
    return Array.from(countries)
}

export async function updateMovie({movieId, movieData}) {
    const token = await getAuthToken()
    const {data} = await axiosClient.put('v1/movie/' + movieId + '/',
        movieData.data,
        {headers: {'Authorization': 'Bearer ' + token}}
    )

    return data
}

export async function deleteMovie({objId}) {
    const token = await getAuthToken()
    const {data} = await axiosClient.delete('v1/movie/' + objId + '/',
        {headers: {'Authorization': 'Bearer ' + token}}
    )

    return data
}


export async function createMovie({movieData}) {

    const token = await getAuthToken()
    const {data} = await axiosClient.post('v1/movie/', movieData.data,
        {headers: {'Authorization': 'Bearer ' + token}})

    return data
}
