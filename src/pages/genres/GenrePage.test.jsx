import {fireEvent, render, screen} from "@testing-library/react";
import GenrePage from "./GenrePage";
import {BrowserRouter as Router} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import http_queries from '../../http_queries/httpsQueriesGenres'

const queryClient = new QueryClient();

jest.mock('../../http_queries/httpsQueriesGenres');


const genresResponse = {
    "count": 5,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 1,
            "name": "NameGenre1",
            "description": "DescriptionGenre1",
            "url": "UrlGenre1"
        },
        {
            "id": 2,
            "name": "NameGenre2",
            "description": "DescriptionGenre2",
            "url": "UrlGenre2"
        }
    ]
}

it("Add genre button exists", async () => {
    http_queries.getGenres.mockResolvedValueOnce(genresResponse)
    render(<QueryClientProvider client={queryClient}><Router><GenrePage/></Router></QueryClientProvider>)
    const button = await screen.findByText(/Add genre/i)
    expect(button).toBeInTheDocument()
})


it("Genre columns data were rendered", async () => {
    http_queries.getGenres.mockResolvedValueOnce(genresResponse)
    render(<QueryClientProvider client={queryClient}><Router><GenrePage/></Router></QueryClientProvider>)
    const colName = await screen.findByText(/NameGenre1/i)
    const colDescription = await screen.findByText(/DescriptionGenre1/i)
    const colUrl = await screen.findByText(/UrlGenre1/i)
    const colEditAction = await screen.findAllByText(/Edit/i)
    const colDeleteAction = await screen.findAllByText(/Delete/i)

    expect(colName).toBeInTheDocument();
    expect(colDescription).toBeInTheDocument();
    expect(colUrl).toBeInTheDocument();
    expect(colEditAction).toHaveLength(3)
    expect(colDeleteAction).toHaveLength(3)
})


it("Click Genre button and form is appeared", async () => {
    http_queries.getGenres.mockResolvedValueOnce(genresResponse)
    render(<QueryClientProvider client={queryClient}><Router><GenrePage/></Router></QueryClientProvider>)
    const link = screen.getByText('Add genre')
    fireEvent.click(link)
    expect(window.location.href).toEqual('http://localhost/new')
})
