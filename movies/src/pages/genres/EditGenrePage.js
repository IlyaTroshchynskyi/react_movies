import PageContent from "../../components/PageContent";
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

    const {mutate, isPendingUpdate, isErrorUpdate, errorUpdate} = useMutation({

        mutationFn: updateGenre,
        onMutate: async (data) => {
            queryClient.cancelQueries({queryKey: ['genres', genreId]})
            const previousEvent = queryClient.getQueryData(['genres', genreId])
            queryClient.setQueryData(['genres', genreId], data.genreData)
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


    let content;
    if (isPending) {
        content = <div className='flex items-center'>
            <LoadingIndicator/>
        </div>
    } else if (isError) {
        content = <>
            <ErrorBlock
                message={error.message || 'Failed to fetch genre data, please try again later'}>
            </ErrorBlock>
        </>
    } else if (data) {
        content = <CreateEditGenreForm genreData={data} onSubmit={handleSubmit} backPath='../../'/>
    }
    return (
        <>
            <PageContent>
                {content}
            </PageContent>
        </>
    )
}


export default EditGenrePage
