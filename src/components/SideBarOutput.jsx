import React from 'react';
import TableHeader from "./TableHeader";
import TableRow from "./TableRow";
import {Link} from "react-router-dom";
import Pagination from "./Pagination";
import ErrorBlock from "./ErrorBlock";
import {useState} from "react";

function SideBarOutput(props) {
    const [deletingError, setDeletingError] = useState('')

    return (
        <>
            <div>
                <div className='flex flex-row-reverse mt-2 mb-4'>
                    <div className='order-last'>
                        <Link to='new'
                              className="bg-gray-300 hover:bg-blue-100 text-blue-500 font-bold py-2 px-4 rounded-full">
                            {props.buttonAddSignature}
                        </Link>
                    </div>
                </div>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    {deletingError && <ErrorBlock message={deletingError}/>}
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <TableHeader columns={props.columns}/>
                        <tbody>
                        {
                            props.data.map((item) => <TableRow
                                deleteRecordFunc={props.deleteRecordFunc}
                                queryKey={props.queryKey}
                                key={item.id} dataRow={item}
                                resourcePath={props.resourcePath}
                                setDeletingError={setDeletingError}
                            />)
                        }
                        </tbody>
                    </table>
                    <Pagination
                        currentPage={props.currentPage}
                        totalCount={props.totalCount}
                        pageSize={props.pageSize}
                        onPageChange={page => props.setCurrentPage(page)}
                        queryParams={props.queryParams}
                    />
                </div>

            </div>
        </>
    )
}

export default SideBarOutput
