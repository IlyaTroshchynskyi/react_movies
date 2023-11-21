import React from 'react';
import ErrorBlock from "../../components/ErrorBlock";
import LoadingIndicator from "../../components/LoadingIndIcator";
import {deleteGenre, getGenres} from "../../http_queries/httpsQueriesGenres";
import SideBarOutput from "../../components/SideBarOutput";
import {genreColumns} from "../../const/TableColumnNames";
import {useState} from "react";
import {useLocation} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";


const GenrePage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    let pageNumber = searchParams.get('page') || 1;
    const pageSize = 5;
    const [currentPage, setCurrentPage] = useState(+pageNumber);
    const startOffset = currentPage - 1

    const {data, isPending, isError, error} = useQuery({
        queryKey: ['genres', {limit: pageSize, offset: startOffset}],
        queryFn: () => getGenres(pageSize, pageSize * startOffset)
    })

    const content = isPending ? <div className='flex items-center'><LoadingIndicator/></div>
        : isError
            ? <ErrorBlock message={error.message || 'Failed to fetch genre data'}/>
            : data
                ? <SideBarOutput
                    totalCount={data.count}
                    pageSize={pageSize}
                    onPageChange={page => setCurrentPage(page)}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    columns={genreColumns}
                    data={data.results}
                    buttonAddSignature={'Add genre'}
                    resourcePath='edit'
                    deleteRecordFunc={deleteGenre}
                    queryKey='genres'
                /> : null

    return (
        <>
            {content}
        </>
    )
}


export default GenrePage
