import PageContent from "../../components/PageContent";
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

    let content;
    if (isPending) {
        content = <div className='flex items-center'>
            <LoadingIndicator/>
        </div>
    } else if (isError) {
        content = <>
            <ErrorBlock
                message={error.message || 'Failed to create genre data, please try again later'}>
            </ErrorBlock>
        </>
    }

    return (
        <>
            <PageContent>
                {content && content}
                <CreateEditGenreForm backPath='../' onSubmit={onCreateGenre}/>

            </PageContent>
        </>
    )
}


export default CreateGenrePage
