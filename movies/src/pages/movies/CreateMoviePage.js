import {useNavigate} from "react-router";
import {useMutation, useQuery} from "@tanstack/react-query";
import {queryClient} from "../../http_queries/client";
import LoadingIndicator from "../../components/LoadingIndIcator";
import ErrorBlock from "../../components/ErrorBlock";
import PageContent from "../../components/PageContent";
import {createMovie} from "../../http_queries/httpQueriesMovies";
import CreateEditMovieForm from "../../components/movies/CreateEditMovieForm";
import {getGenres} from "../../http_queries/httpsQueriesGenres";
import {getDirectors} from "../../http_queries/httpQueriesDirectors";
import {getActors} from "../../http_queries/httpQueriesActors";


const CreateMoviePage = () => {

    const navigate = useNavigate();
    const {mutate, isPending, isError, error} = useMutation({
        mutationFn: createMovie,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['movies']})
            navigate('/movies')
        }
    })

    const {data: genres} = useQuery({
        queryKey: ['genres', {limit: 0, offset: 0}],
        queryFn: () => getGenres(0,0)
    })
    const {data: directors} = useQuery({
        queryKey: ['directors', {limit: 0, offset: 0}],
        queryFn: () => getDirectors(0,0)
    })
    const {data: actors} = useQuery({
        queryKey: ['actors', {limit: 0, offset: 0}],
        queryFn: () => getActors(0,0)
    })

    function onCreateMovie(movieData) {
        mutate({movieData})
    }


    let content;
    if (isPending) {
        content = <div className='flex items-center'><LoadingIndicator/></div>
    } else if (isError) {
        content = <>
            <ErrorBlock
                message={error.message || 'Failed to create movie'}>
            </ErrorBlock>
        </>
    }

    return (
        <>
            <PageContent>
                {content && content}
                <CreateEditMovieForm
                    genres={{chosen: [], available: genres?.results || []}}
                    directors={{chosen: [], available: directors?.results || []}}
                    actors={{chosen: [], available: actors?.results || []}}
                    backPath='../' onSubmit={onCreateMovie}/>
            </PageContent>
        </>
    )
}

export default CreateMoviePage
