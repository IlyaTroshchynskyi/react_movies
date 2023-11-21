import {fireEvent, render, screen} from "@testing-library/react";
import MovieListPage from "./MovieListPage";
import {BrowserRouter as Router} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";


import http_queries from '../../http_queries/httpQueriesMovies'

const queryClient = new QueryClient();

jest.mock("../../http_queries/base")
jest.mock('../../http_queries/httpQueriesMovies');


const moviesResponse = {
    "count": 5,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 1,
            "title": "Movie1",
            "description": "Description1",
            "year": 2020,
            "country": "USA",
            "directors": [
                {
                    "id": 2,
                    "name": "Dir2",
                    "age": 28
                }
            ],
            "actors": [
                {
                    "id": 1,
                    "name": "Actor1",
                    "age": 23,
                    "description": "ActorDescript1"
                },
                {
                    "id": 2,
                    "name": "Actor2",
                    "age": 99,
                    "description": "ActorDescript1"
                }
            ],
            "genres": [
                {
                    "id": 2,
                    "name": "Genr1",
                    "description": "GenreDescript1",
                    "url": "UrlDescription"
                }
            ],
            "world_premier": "2023-11-07",
            "budget": 20,
            "fees_is_usa": 112345,
            "fees_in_world": 112346,
            "rating_user": 5,
            "middle_star": null,
            "url": "urlMovie2"
        },
        {
            "id": 2,
            "title": "Movie2",
            "description": "MovieDescription2",
            "year": 2022,
            "country": "Canada",
            "directors": [
                {
                    "id": 1,
                    "name": "Dir1",
                    "age": 29
                }
            ],
            "actors": [
                {
                    "id": 1,
                    "name": "Actor1",
                    "age": 23,
                    "description": "ActorDescript2"
                }
            ],
            "genres": [
                {
                    "id": 2,
                    "name": "Genr2",
                    "description": "GenreDescript2",
                    "url": "UrlDescription"
                }
            ],
            "world_premier": "2023-11-08",
            "budget": 2,
            "fees_is_usa": 2,
            "fees_in_world": 0,
            "rating_user": false,
            "middle_star": null,
            "url": "someurlmovie2"
        },
    ]
}

const countries = ['USA', 'Canada']

it("Add movie button exists", async () => {
    http_queries.getMovies.mockResolvedValueOnce(moviesResponse)
    http_queries.getAllCountries.mockResolvedValueOnce(countries)
    render(<QueryClientProvider client={queryClient}><Router><MovieListPage/></Router></QueryClientProvider>)
    const button = await screen.findByText(/Add movie/)
    expect(button).toBeInTheDocument()
})


it("Movies columns data were rendered", async () => {
    http_queries.getMovies.mockResolvedValueOnce(moviesResponse)
    http_queries.getAllCountries.mockResolvedValueOnce(countries)
    render(<QueryClientProvider client={queryClient}><Router><MovieListPage/></Router></QueryClientProvider>)
    const colTitle = await screen.getByText('Movie1')
    const colDescription = await screen.getByText('Description1')
    const colYear= await screen.getAllByText('2020')
    const colCountry = await screen.getAllByText('USA')
    const colDirectors = await screen.getByText('Dir2')
    const colActors = await screen.getByText('Actor1,Actor2')
    const colGenres = await screen.getByText('Genr1')
    const colWorldPremier = await screen.getByText('2023-11-07')
    const colBudget = await screen.getByText('20')
    const colFeeIsUSA = await screen.getByText('112345')
    const colFeesInWorld = await screen.getByText('112346')
    const colRatingUser = await screen.getByText('5')
    const colMiddleStar = await screen.getAllByText('-')
    const colRatingUrl = await screen.getByText('urlMovie2')


    expect(colTitle).toBeInTheDocument()
    expect(colDescription).toBeInTheDocument()
    expect(colYear).toHaveLength(3)
    expect(colCountry).toHaveLength(2)
    expect(colDirectors).toBeInTheDocument()
    expect(colActors).toBeInTheDocument()
    expect(colGenres).toBeInTheDocument()
    expect(colWorldPremier).toBeInTheDocument()
    expect(colBudget).toBeInTheDocument()
    expect(colFeeIsUSA).toBeInTheDocument()
    expect(colFeesInWorld).toBeInTheDocument()
    expect(colRatingUser).toBeInTheDocument()
    expect(colMiddleStar).toHaveLength(7)
    expect(colRatingUrl).toBeInTheDocument()
})


it("Click Movie add button and form is appeared", async ()=> {
    http_queries.getMovies.mockResolvedValueOnce(moviesResponse)
    http_queries.getAllCountries.mockResolvedValueOnce(countries)
    render(<QueryClientProvider client={queryClient}><Router><MovieListPage/></Router></QueryClientProvider>)
    const link = screen.getByText('Add movie')
    fireEvent.click(link)
    expect(window.location.href).toEqual('http://localhost/new')
})


it("Find and choose start year", async () => {
    const currentYear = new Date().getFullYear() + 1
    http_queries.getMovies.mockResolvedValueOnce(moviesResponse)
    http_queries.getAllCountries.mockResolvedValueOnce(countries)
    render(<QueryClientProvider client={queryClient}><Router><MovieListPage/></Router></QueryClientProvider>)
    const option = screen.getByTestId('startyears')
    fireEvent.change(option, { target: { value: currentYear - 5 } })
    expect(option.value).toEqual((currentYear - 5).toString())
})


it("Find and choose end year", async () => {
    const currentYear = new Date().getFullYear() + 1
    http_queries.getMovies.mockResolvedValueOnce(moviesResponse)
    http_queries.getAllCountries.mockResolvedValueOnce(countries)
    render(<QueryClientProvider client={queryClient}><Router><MovieListPage/></Router></QueryClientProvider>)
    const option = screen.getByTestId('endyears')
    fireEvent.change(option, { target: { value: currentYear - 3 } })
    expect(option.value).toEqual((currentYear - 3).toString())
})


it("Find and choose country", async () => {
    const currentYear = new Date().getFullYear() + 1
    http_queries.getMovies.mockResolvedValueOnce(moviesResponse)
    http_queries.getAllCountries.mockResolvedValueOnce(countries)
    render(<QueryClientProvider client={queryClient}><Router><MovieListPage/></Router></QueryClientProvider>)
    const option = screen.getByTestId('country')
    fireEvent.change(option, { target: { value: 'USA'} })
    expect(option.value).toEqual('USA')
})


