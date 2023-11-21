import React from 'react';
import {useMutation} from "@tanstack/react-query";
import ErrorBlock from "../../components/ErrorBlock";
import LoadingIndicator from "../../components/LoadingIndIcator";
import {queryClient} from "../../http_queries/client";
import {useNavigate} from "react-router";
import CreateEditActorForm from "../../components/actors/CreateEditActorForm";
import {createActor} from "../../http_queries/httpQueriesActors";

const CreateActorPage = () => {
    const navigate = useNavigate();
    const {mutate, isPending, isError, error} = useMutation({
        mutationFn: createActor,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['actors']})
            navigate('/actors')
        }
    })

    function onCreateActor(actorData) {
        mutate({actorData})
    }

    let content = isPending ? <div className='flex items-center'><LoadingIndicator/></div> : null
    content = isError ?
        Object.keys(error.response.data).map((key) => (<ErrorBlock message={error.response.data[key][0]}/>)) :
        content

    return (
        <>
            {content && content}
            <CreateEditActorForm backPath='../' onSubmit={onCreateActor}/>
        </>
    )
}


export default CreateActorPage
