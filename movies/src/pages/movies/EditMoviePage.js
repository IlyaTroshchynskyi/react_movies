import {useNavigate, useParams} from "react-router";
import {useMutation, useQuery} from "@tanstack/react-query";

import {queryClient} from "../../http_queries/client";
import LoadingIndicator from "../../components/LoadingIndIcator";
import ErrorBlock from "../../components/ErrorBlock";
import PageContent from "../../components/PageContent";
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
        queryFn: ({signal}) => getMovie({movieId}),
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

    const {mutate, isPendingUpdate, isErrorUpdate, errorUpdate} = useMutation({

        mutationFn: updateMovie,
        onSuccess: () => {
            queryClient.invalidateQueries(['movies', movieId])
            navigate('../../')
        }
    })

    function handleSubmit(formData) {
        mutate({movieId: movieId, movieData: formData})
    }


    let content;
    if (isPending) {
        content = <div className='flex items-center'>
            <LoadingIndicator/>
        </div>
    } else if (isError) {
        content = <>
            <ErrorBlock
                message={error.message || 'Failed to fetch movie data, please try again later'}>
            </ErrorBlock>
        </>
    } else if (data && genres && directors && actors) {
        content = <CreateEditMovieForm
            genres={{chosen: data.genres, available: genres.results}}
            directors={{chosen: data.directors, available: directors.results}}
            actors={{chosen: data.actors, available: actors.results}}
            movieData={data}
            onSubmit={handleSubmit}
            backPath='../../'
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

export default EditMoviePage
