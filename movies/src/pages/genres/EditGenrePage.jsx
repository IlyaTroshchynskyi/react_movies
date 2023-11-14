import React from 'react';
import {useMutation, useQuery} from "@tanstack/react-query";
import ErrorBlock from "../../components/ErrorBlock";
import LoadingIndicator from "../../components/LoadingIndIcator";
import {getGenre, updateGenre} from "../../http_queries/httpsQueriesGenres";
import {useNavigate, useParams} from "react-router";
import CreateEditGenreForm from "../../components/genres/CreateEditGenreForm";
import {queryClient} from "../../http_queries/client";

const EditGenrePage = () => {
    const genreId = useParams().genreId
    const navigate = useNavigate();
    const {data, isPending, isError, error} = useQuery({
        queryKey: ['genres', genreId],
        queryFn: ({signal}) => getGenre({genreId, signal})
    })

    const {mutate, isErrorUpdate, errorUpdate} = useMutation({

        mutationFn: updateGenre,
        onMutate: async (dataOnMute) => {
            queryClient.cancelQueries({queryKey: ['genres', genreId]})
            const previousEvent = queryClient.getQueryData(['genres', genreId])
            queryClient.setQueryData(['genres', genreId], dataOnMute.data)
            return {previousEvent}
        },
        onError: (error, data, context) => {
            queryClient.setQueryData(['genres', genreId], context.previousEvent)
        },
        onSettled: () => {
            queryClient.invalidateQueries(['genres', genreId])
        }
    })

    function handleSubmit(formData) {
        mutate({genreId: genreId, genreData: formData})
        navigate('../../')
    }

    let content = isPending ? <div className='flex items-center'><LoadingIndicator/></div> : null
    content = isError ? <ErrorBlock message={error.message || 'Failed to fetch genre data'}></ErrorBlock> : content
    content = isErrorUpdate ?
        Object.keys(errorUpdate.response.data).map((key) => (
            <ErrorBlock key={key} message={errorUpdate.response.data[key][0]}/>)) :
        content
    content = data ? <CreateEditGenreForm genreData={data} onSubmit={handleSubmit} backPath='../../'/> : content

    return (
        <>
            {content}
        </>
    )
}


export default EditGenrePage
