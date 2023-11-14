import React from 'react';


function TableHeader(props) {
    return (
        <>
            <thead
                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                {
                    props.columns.map((columnName) => {
                        return <th key={columnName} scope="col" className="px-6 py-3">
                            {columnName}
                        </th>
                    })
                }

            </tr>
            </thead>
        </>
    )
}

export default TableHeader
