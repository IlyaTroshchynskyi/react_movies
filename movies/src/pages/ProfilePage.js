import PageContent from "../components/PageContent";
import UserProfile from "../components/users/UserProfile";
import {useQuery} from "@tanstack/react-query";
import {getCurrentUser} from "../http_queries/httpQueriesUsers";
import ErrorBlock from "../components/ErrorBlock";
import LoadingIndicator from "../components/LoadingIndIcator";

const ProfilePage = () => {
     const {data, isPending, isError, error} = useQuery({
        queryFn: getCurrentUser
    })


  let content;
  if (isPending) {
    content = <div className='flex items-center'>
      <LoadingIndicator/>
    </div>
  }
  if (isError) {
    content = <>
    <ErrorBlock
        message={error.info?.message || 'Failed to fetch event data, please try again later'}>
    </ErrorBlock>
  </>
  }

  if (data) {
    content = <UserProfile title='Profile page' userData={data}/>
  }
    return (
        <>
        <PageContent>
            {content}
        </PageContent>
        </>
    )
}


export default ProfilePage
