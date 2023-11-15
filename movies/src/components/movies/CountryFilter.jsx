import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {getAllCountries} from "../../http_queries/httpQueriesMovies";


const CountryFilter = (props) => {
    const selectOptionHandler = (event) => {
        props.onSelectedCountry(event.target.value)
    }

    const {data: countries} = useQuery({
        queryKey: ['countries'],
        queryFn: getAllCountries
    })

    return (
        <>
            <div className='flex-0 w-64 mx-2'>
                <label htmlFor="years" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Filter by country
                </label>
                <select value={props.selectedCountry}
                        onChange={selectOptionHandler}
                        id="country"
                        data-testid="country"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value={props.selectedCountry}>{props.selectedCountry}</option>
                    {
                        countries && countries.map((country) =>
                            <option key={country} value={country}>{country}</option>)
                    }
                </select>
            </div>
        </>
    )
}

export default CountryFilter
