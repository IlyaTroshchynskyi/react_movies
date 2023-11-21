import React from 'react';
import {useQuery} from "@tanstack/react-query";
import ErrorBlock from "../../components/ErrorBlock";
import LoadingIndicator from "../../components/LoadingIndIcator";
import SideBarOutput from "../../components/SideBarOutput";
import {moviesColumns} from "../../const/TableColumnNames";
import {useState} from "react";
import {useLocation} from "react-router";
import {deleteMovie, getMovies} from "../../http_queries/httpQueriesMovies";
import {PAGE_SIZE} from "../../const/config";
import MovieFilters from "../../components/movies/MovieFilters";


const MovieListPage = () => {

    const location = useLocation();
    const [filterQueryParams, setFilterQueryParams] = useState('')
    const searchParams = new URLSearchParams(location.search)

    const pageNumber = searchParams.get('page') || 1

    const [currentPage, setCurrentPage] = useState(+pageNumber)
    const startOffset = currentPage - 1

    const {data, isPending, isError, error} = useQuery({
        queryKey: ['movies', {limit: PAGE_SIZE, offset: startOffset, filterQueryParams: filterQueryParams}],
        queryFn: () => getMovies(PAGE_SIZE, PAGE_SIZE * startOffset, filterQueryParams)
    })

    const content = isPending ? <div className='flex items-center'><LoadingIndicator/></div>
        : isError
            ? <ErrorBlock message={error.message || 'Failed to fetch movies data'}></ErrorBlock>
            : data
                ? <SideBarOutput
                    totalCount={data.count}
                    pageSize={PAGE_SIZE}
                    onPageChange={page => setCurrentPage(page)}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    columns={moviesColumns}
                    data={data.results}
                    buttonAddSignature={'Add movie'}
                    resourcePath='edit'
                    deleteRecordFunc={deleteMovie}
                    queryKey='movies'
                /> : null

    return (
        <>
            <MovieFilters onSetFilterQueryParams={setFilterQueryParams}/>
            {content}
        </>
    )
}


export default MovieListPage
