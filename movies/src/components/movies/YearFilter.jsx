import React from 'react';
import {START_YEAR_FILTER} from "../../const/config";

const currentYear = new Date().getFullYear() + 1

const rangeYears = Array.from(
    {length: currentYear - START_YEAR_FILTER},
    (_, i) => currentYear - i).sort((prev, cur) => {
        return prev - cur
    }
)

const YearFilter = (props) => {

    const selectOptionHandler = (event) => {
        props.onSelectedYear(+event.target.value)
    }


    return (
        <>
            <div className='flex-0 w-64 mx-2'>
                <label htmlFor="years" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    {`Filter by ${props.subscriptionYear} year`}
                </label>
                <select
                    onChange={selectOptionHandler}
                    id="years"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value={props.selectedYear}>{props.selectedYearDefault}</option>
                    {
                        rangeYears.map((year) => {
                            return <option key={year} value={year}>{year}</option>
                        })
                    }
                </select>
            </div>
        </>
    )
}

export default YearFilter


