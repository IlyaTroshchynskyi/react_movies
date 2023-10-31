import PageContent from "../components/PageContent";
import LoginForm from "../components/users/LoginForm";
import {useMutation} from "@tanstack/react-query";
import {loginUser} from "../http_queries/httpQueriesUsers";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {authActions} from "../store/auth-slice";
import ErrorBlock from "../components/ErrorBlock";

const LoginPage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {mutate, isPending, isError, error} = useMutation(
        {
            mutationFn: loginUser,
            onSuccess: async (data) => {
                if (data) {
                    dispatch(authActions.authUser())
                    navigate('/')
                }
            },

        }
    )
    function handleSubmit(formData) {
        mutate({user: formData})
  }

    return (
        <PageContent>
           <LoginForm onSubmit={handleSubmit}/>
            {isPending && 'Submitting ...'}
            {isError && <ErrorBlock
            message={error.info?.message || 'Failed to log in'}/>}
         </PageContent>
    )
}


export default LoginPage
