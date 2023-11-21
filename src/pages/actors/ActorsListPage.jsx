import React from 'react';
import ErrorBlock from "../../components/ErrorBlock";
import LoadingIndicator from "../../components/LoadingIndIcator";
import SideBarOutput from "../../components/SideBarOutput";
import {actorColumns} from "../../const/TableColumnNames";
import {useState} from "react";
import {useLocation} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {deleteActor, getActors} from "../../http_queries/httpQueriesActors";


const ActorListPage = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    let pageNumber = searchParams.get('page') || 1;
    const pageSize = 5;
    const [currentPage, setCurrentPage] = useState(+pageNumber);
    const startOffset = currentPage - 1

    const {data, isPending, isError, error} = useQuery({
        queryKey: ['actors', {limit: pageSize, offset: startOffset}],
        queryFn: () => getActors(pageSize, pageSize * startOffset)
    })
    const content = isPending
        ? <div className='flex items-center'><LoadingIndicator/></div>
        : isError
            ? <ErrorBlock message={error.message || 'Failed to fetch actor data'}/>
            : data
                ? <SideBarOutput
                    totalCount={data.count}
                    pageSize={pageSize}
                    onPageChange={page => setCurrentPage(page)}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                    columns={actorColumns}
                    data={data.results}
                    buttonAddSignature={'Add Actor'}
                    resourcePath='edit'
                    deleteRecordFunc={deleteActor}
                    queryKey='actors'
                />
                : null;

    return (
        <>
            {content}
        </>
    )
}


export default ActorListPage
