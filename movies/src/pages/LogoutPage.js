import {tokenTypes} from "../auth/tokenTypes";
import {useDispatch} from "react-redux";
import {authActions} from "../store/auth-slice";

import {useNavigate} from "react-router";
import {useEffect} from "react";



const LogoutPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    localStorage.removeItem(tokenTypes.movieAccessToken)
    localStorage.removeItem(tokenTypes.movieRefreshToken)
    dispatch(authActions.logoutUser())

  useEffect(() => {
      navigate("/")

  }, [navigate])


}

export default LogoutPage
