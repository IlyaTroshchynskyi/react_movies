import React from 'react';
import {useNavigate, useParams} from "react-router";
import {useMutation, useQuery} from "@tanstack/react-query";

import {queryClient} from "../../http_queries/client";
import LoadingIndicator from "../../components/LoadingIndIcator";
import ErrorBlock from "../../components/ErrorBlock";
import CreateEditMovieForm from "../../components/movies/CreateEditMovieForm";
import {getMovie, updateMovie} from "../../http_queries/httpQueriesMovies";
import {getGenres} from "../../http_queries/httpsQueriesGenres";
import {getDirectors} from "../../http_queries/httpQueriesDirectors";
import {getActors} from "../../http_queries/httpQueriesActors";


const EditMoviePage = () => {
    const movieId = useParams().movieId
    const navigate = useNavigate();
    const {data, isPending, isError, error} = useQuery({
        queryKey: ['movies', movieId],
        queryFn: () => getMovie({movieId}),
        gcTime: 0
    })

    const {data: genres} = useQuery({
        queryKey: ['genres', {limit: 0, offset: 0}],
        queryFn: () => getGenres(0, 0)
    })
    const {data: directors} = useQuery({
        queryKey: ['directors', {limit: 0, offset: 0}],
        queryFn: () => getDirectors(0, 0)
    })
    const {data: actors} = useQuery({
        queryKey: ['actors', {limit: 0, offset: 0}],
        queryFn: () => getActors(0, 0)
    })

    const {mutate, isErrorUpdate, errorUpdate} = useMutation({

        mutationFn: updateMovie,
        onSuccess: () => {
            queryClient.invalidateQueries(['movies', movieId])
            navigate('../../')
        }
    })

    function handleSubmit(formData) {
        mutate({movieId: movieId, movieData: formData})
    }

    let content = isPending ? <div className='flex items-center'><LoadingIndicator/></div> : null
    content = isError ?
        Object.keys(error.response.data).map((key) => (
            <ErrorBlock key={key} message={error.response.data[key][0]}/>)) :
        content

    content = isErrorUpdate ?
        Object.keys(errorUpdate.response.data).map((key) => (
            <ErrorBlock key={key} message={errorUpdate.response.data[key][0]}/>)) :
        content
    content = data && genres && directors && actors ?
        <CreateEditMovieForm
            genres={{chosen: data.genres, available: genres.results}}
            directors={{chosen: data.directors, available: directors.results}}
            actors={{chosen: data.actors, available: actors.results}}
            movieData={data}
            onSubmit={handleSubmit}
            backPath='../../'
        /> : content

    return (
        <>
            {content}
        </>
    )
}

export default EditMoviePage
