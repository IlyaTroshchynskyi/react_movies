import React from 'react';
import YearFilter from "./YearFilter";
import {useState} from "react";
import {END_YEAR_FILTER, START_YEAR_FILTER} from "../../const/config";
import CountryFilter from "./CountryFilter";
import SortingFilter from "./SortingFilter";
import {useNavigate} from "react-router";


const MovieFilters = (props) => {
    const [startYear, setStartYear] = useState('-')
    const [endYear, setEndYear] = useState('-')
    const [movieTitle, setMovieTitle] = useState('')
    const [movieCountry, setMovieCountry] = useState('-')
    const [sorting, setSorting] = useState('')
    const navigation = useNavigate()


    const resetHandler = () => {
        setStartYear('-')
        setEndYear('-')
        setMovieTitle('')
        setMovieCountry('-')
        setSorting('')
        navigation('/movies')
    }

    const constructQueryParams = () => {
        let queryParams = endYear === '-' ? `&year_max=${END_YEAR_FILTER}` : `&year_max=${endYear}`
        queryParams += startYear === '-' ? `&year_min=${START_YEAR_FILTER}` : `&year_min=${startYear}`
        if (movieTitle.length > 0) {
            queryParams += `&title=${movieTitle}`
        }
        if (movieCountry !== '-') {
            queryParams += `&country=${movieCountry}`
        }
        if (sorting) {
            queryParams += `&ordering=${sorting === 'asc' ? 'id' : '-id'}`
        }

        return queryParams
    }

    function handleSubmit(event) {
        event.preventDefault();

        const queryParams = constructQueryParams()
        props.onSetFilterQueryParams(queryParams)
        navigation('?' + props.convertQueryParams(queryParams))
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='flex flex-row'>
                    <YearFilter subscriptionYear='start' onSelectedYear={setStartYear} selectedYear={startYear}/>
                    <YearFilter subscriptionYear='end' onSelectedYear={setEndYear} selectedYear={endYear}/>
                    <CountryFilter onSelectedCountry={setMovieCountry} selectedCountry={movieCountry}/>
                </div>

                <div className='flex flex-row mt-2 w-128'>
                    <div className="flex-0 w-64 mx-2">
                        <label htmlFor="first-name" className="w-64 block text-sm font-medium leading-6 text-gray-900">
                            Movie title
                        </label>
                        <div className="mt-2 w-64">
                            <input
                                type="title"
                                onChange={(event) => setMovieTitle(event.target.value)}
                                value={movieTitle}
                                name="title"
                                id="title"
                                className="block w-64 p-2.5 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <SortingFilter onSorting={setSorting}/>

                    <div className='flex items-end'>
                        <button className="h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                            Search
                        </button>
                    </div>
                    <div className='flex items-end mx-2'>
                        <button onClick={resetHandler}
                                className="h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded">
                            Reset
                        </button>
                    </div>

                </div>
            </form>
        </>
    )
}
export default MovieFilters
