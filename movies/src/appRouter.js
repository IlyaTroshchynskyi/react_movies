import {createBrowserRouter} from 'react-router-dom'
import ErrorPage from "./pages/ErroPage";
import HomePage from "./pages/HomePage";
import RootLayout from "./pages/RootLayout";
import LoginPage from "./pages/users/LoginPage";
import ProfilePage from "./pages/users/ProfilePage";
import LogoutPage from "./pages/users/LogoutPage";
import {getAuthToken} from "./auth/auth";
import GenrePage from "./pages/genres/GenrePage";
import CreateGenrePage from "./pages/genres/CreateGenrePage";
import EditGenrePage from "./pages/genres/EditGenrePage";
import GenreRoot from "./pages/genres/GenreRoot";
import React from "react";
import SignUpPage from "./pages/users/SignUpPage";
import MovieRoot from "./pages/movies/MovieRoot";
import MovieListPage from "./pages/movies/MovieListPage";



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
            {path: 'signup', element: <SignUpPage/>},
            // GENRES ----------------------------
            {
                path: 'genres', element: <GenreRoot/>,
                children: [
                    {index: true, element: <GenrePage/>

                    },
                    {path: ':genreId',
                        children: [
                            {path: 'edit', element: <EditGenrePage/>}
                        ]
                    },
                    {path: 'new', element: <CreateGenrePage/>},
                ]

            },
            // MOVIES ---------------------------------------
            {
                path: 'movies', element: <MovieRoot/>,
                children: [
                    {index: true, element: <MovieListPage/>},
                ]

            }
        ]
    }

])


export default router
