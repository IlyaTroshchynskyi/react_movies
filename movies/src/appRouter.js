import {createBrowserRouter} from 'react-router-dom'
import ErrorPage from "./pages/ErroPage";
import HomePage from "./pages/HomePage";
import RootLayout from "./pages/RootLayout";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./pages/SignUpPage";
import LogoutPage from "./pages/LogoutPage";
import {getAuthToken} from "./auth/auth";



const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <ErrorPage/>,
        id: 'root',
        loader: getAuthToken,
        children: [
            {index: true, element: <HomePage/>},
            {path: 'logout',  element: <LogoutPage/>},
            {path: 'login', element: <LoginPage/>},
            {path: 'profile', element: <ProfilePage/>},
            {path: 'signup', element: <SignUpPage/>}
        ]
    }

])


export default router
