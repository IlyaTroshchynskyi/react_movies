import PageContent from "../../components/PageContent";
import {useQuery} from "@tanstack/react-query";
import ErrorBlock from "../../components/ErrorBlock";
import LoadingIndicator from "../../components/LoadingIndIcator";
import SideBarOutput from "../../components/SideBarOutput";
import {moviesColumns} from "../../components/TableColumnNames";
import {useState} from "react";
import {useLocation} from "react-router";
import {deleteMovie, getMovies} from "../../http_queries/httpQueriesMovies";
import {PAGE_SIZE} from "../../const";
import MovieFilters from "../../components/movies/MovieFilters";
import {deleteGenre} from "../../http_queries/httpsQueriesGenres";

const MovieListPage = () => {

    const location = useLocation();
    const [filterQueryParams, setFilterQueryParams] = useState('')
    const searchParams = new URLSearchParams(location.search);

    const pageNumber = searchParams.get('page') || 1;

    const [currentPage, setCurrentPage] = useState(+pageNumber);
    const startOffset = currentPage - 1

    const {data, isPending, isError, error} = useQuery({
        queryKey: ['movies', {limit: PAGE_SIZE, offset: startOffset, filterQueryParams: filterQueryParams}],
        queryFn: () => getMovies(PAGE_SIZE,PAGE_SIZE * startOffset, filterQueryParams)
    })


    let content;
    if (isPending) {
        content = <div className='flex items-center'>
            <LoadingIndicator/>
        </div>
    } else if (isError) {
        content = <>
            <ErrorBlock
                message={error.message || 'Failed to fetch movies data, please try again later'}>
            </ErrorBlock>
        </>
    } else if (data) {
        content = <SideBarOutput
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
        />
    }
    return (
        <>
            <PageContent>
                <MovieFilters onSetFilterQueryParams={setFilterQueryParams}/>
                {content}
            </PageContent>
        </>
    )
}


export default MovieListPage
