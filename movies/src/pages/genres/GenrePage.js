import PageContent from "../../components/PageContent";
import {useQuery} from "@tanstack/react-query";
import ErrorBlock from "../../components/ErrorBlock";
import LoadingIndicator from "../../components/LoadingIndIcator";
import {getGenres} from "../../http_queries/httpsQueriesGenres";
import SideBarOutput from "../../components/SideBarOutput";
import {genreColumns} from "../../components/TableColumnNames";
import {useState} from "react";
import {useLocation} from "react-router";

const GenrePage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    let pageNumber = searchParams.get('page');
    if (!pageNumber){
        pageNumber = 1
    }

    const pageSize= 5;
    const [currentPage, setCurrentPage] = useState(+pageNumber);
    const startOffset = currentPage - 1

    const {data, isPending, isError, error} = useQuery({
        queryKey: ['genres', {limit: pageSize, offset: startOffset}],
        queryFn: () => getGenres(pageSize,pageSize * startOffset)
    })


    let content;
    if (isPending) {
        content = <div className='flex items-center'>
            <LoadingIndicator/>
        </div>
    }
    if (isError) {
        content = <>
            <ErrorBlock
                message={error.info?.message || 'Failed to fetch genre data, please try again later'}>
            </ErrorBlock>
        </>
    }

    if (data) {
        content = <SideBarOutput
            totalCount={data.count}
            pageSize={pageSize}
            onPageChange={page => setCurrentPage(page)}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            columns={genreColumns}
            data={data.results}
            resourcePath='edit'
        />
    }
    return (
        <>
            <PageContent>
                {content}
            </PageContent>
        </>
    )
}


export default GenrePage
