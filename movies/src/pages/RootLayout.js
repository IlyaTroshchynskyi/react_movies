import NavBar from "../components/NavBar";
import {useLoaderData} from "react-router-dom";
import {useEffect} from "react";
import {decodeToken, getCurrentDatetimeSec} from "../auth/auth";
import {useNavigate} from "react-router";
import {useDispatch} from "react-redux";
import {authActions} from "../store/auth-slice";

const RootLayout = () => {
    const dispatch = useDispatch()
    const token = useLoaderData()
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            dispatch(authActions.logoutUser())
            return
        }

        const decodedToken = decodeToken(token)
        dispatch(authActions.authUser())
        const tokenTimeout = decodedToken.exp - getCurrentDatetimeSec()

        setTimeout(() => {
            navigate('/logout')
            dispatch(authActions.logoutUser())

        }, tokenTimeout * 1000)
    }, [token, navigate, dispatch])


    return (
        <>
            <NavBar/>
        </>
    )
}

export default RootLayout
