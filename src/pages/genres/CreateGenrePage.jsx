import React from 'react';
import {useMutation} from "@tanstack/react-query";
import ErrorBlock from "../../components/ErrorBlock";
import LoadingIndicator from "../../components/LoadingIndIcator";
import {createGenre} from "../../http_queries/httpsQueriesGenres";
import CreateEditGenreForm from "../../components/genres/CreateEditGenreForm";
import {queryClient} from "../../http_queries/client";
import {useNavigate} from "react-router";

const CreateGenrePage = () => {
    const navigate = useNavigate();
    const {mutate, isPending, isError, error} = useMutation({
        mutationFn: createGenre,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['genres']})
            navigate('/genres')
        }
    })

    function onCreateGenre(genreData) {
        mutate({genreData})
    }

    let content = isPending ? <div className='flex items-center'><LoadingIndicator/></div> : null
    content = isError ?
        Object.keys(error.response.data).map((key) => (<ErrorBlock message={error.response.data[key][0]}/>)) :
        content

    return (
        <>
            {content && content}
            <CreateEditGenreForm backPath='../' onSubmit={onCreateGenre}/>
        </>
    )
}


export default CreateGenrePage
