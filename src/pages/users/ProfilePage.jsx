import React from 'react';
import UserProfile from "../../components/users/UserProfile";
import {useQuery} from "@tanstack/react-query";
import {getCurrentUser} from "../../http_queries/httpQueriesUsers";
import ErrorBlock from "../../components/ErrorBlock";
import LoadingIndicator from "../../components/LoadingIndIcator";


const ProfilePage = () => {
    const {data, isPending, isError, error} = useQuery({
        queryFn: getCurrentUser
    })

    const content = isPending ? <div className='flex items-center'><LoadingIndicator/></div>
        : isError
            ? <ErrorBlock message={error.message || 'Failed to fetch user data'}/>
            : data
                ? <UserProfile title='Profile page' userData={data}/>
                : null

    return (
        <>
            {content}
        </>
    )
}


export default ProfilePage
