import React from 'react';
import {useState} from "react";

const SortingFilter = (props) => {
    const [isHidden, setIsHidden] = useState('hidden')

    const onSortHandler = (type) => {
        props.onSorting(type)
        setIsHidden('hidden')
    }


    return (
        <>
            <div className='flex items-end mt-2 mx-2 w-128'>
                <button
                    onClick={() => setIsHidden((prevState) => prevState === '' ? 'hidden' : '')}
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="dropdown"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="button">Sort Order
                    <svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                         fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="m1 1 4 4 4-4"/>
                    </svg>
                </button>

                <div id="dropdown"
                     className={`${isHidden} z-100 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200"
                        aria-labelledby="dropdownDefaultButton">
                        <li>
                            <button onClick={() => onSortHandler('asc')}
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">ASC
                            </button>
                        </li>
                        <li>
                            <button onClick={() => onSortHandler('desc')}
                                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">DESC
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}


export default SortingFilter
