import {axiosClient} from "./axios_client";



export async function getMovies(limit, offset, filterQueryParams) {
    const {data} = await axiosClient.get(`v1/movie/?limit=${limit}&offset=${offset}${filterQueryParams}`)
    return data
}


export async function getAllCountries(){
    const countries = new Set();
    const {data} = await axiosClient.get(`v1/movie/`)
    for (const movie of data.results) {
        countries.add(movie.country)
    }
    return  Array.from(countries)
}
