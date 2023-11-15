import {render, screen} from "@testing-library/react";
import {BrowserRouter as Router} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import CreateEditGenreForm from "./CreateEditGenreForm";
import userEvent from "@testing-library/user-event";

const queryClient = new QueryClient();


jest.mock('../../http_queries/httpsQueriesGenres');

it("Header exists", async () => {
    render(<QueryClientProvider client={queryClient}><Router><CreateEditGenreForm/></Router></QueryClientProvider>)
    const text = await screen.findByText(/Genre Info/i)
    expect(text).toBeInTheDocument()
})

it("Genre form fields exists", async () => {
    render(<QueryClientProvider client={queryClient}><Router><CreateEditGenreForm/></Router></QueryClientProvider>)
    const name = await screen.findByText(/Genre Name/)
    const description = await screen.findByText(/Description/)
    const url = await screen.findByText(/Url/)

    expect(name).toBeInTheDocument()
    expect(description).toBeInTheDocument()
    expect(url).toBeInTheDocument()
})


it("Not valid data to create gener", async () => {
    render(<QueryClientProvider client={queryClient}><Router><CreateEditGenreForm/></Router></QueryClientProvider>)
    const nameInput = screen.getByLabelText(/Genre Name/i);
    const descriptionInput = screen.getByLabelText(/Description/i);
    const urlInput = screen.getByLabelText(/Url/i);
    const saveBtn = await screen.findByText(/Save/);

    userEvent.type(nameInput, 'ab')
    userEvent.type(descriptionInput, 'Desc')
    userEvent.type(urlInput, 'ur ')
    userEvent.click(saveBtn)

    screen.getByTestId('name')
    screen.getByTestId('description')
    screen.getByTestId('url')
})


it("Valid data to create gener", async () => {
    render(<QueryClientProvider client={queryClient}>
        <Router><CreateEditGenreForm onSubmit={jest.fn()}/>
        </Router></QueryClientProvider>)

    const nameInput = screen.getByLabelText(/Genre Name/i)
    const descriptionInput = screen.getByLabelText(/Description/i)
    const urlInput = screen.getByLabelText(/Url/i)
    const saveBtn = await screen.findByText(/Save/)

    userEvent.type(nameInput, 'Genre3')
    userEvent.type(descriptionInput, 'Description3')
    userEvent.type(urlInput, 'Url3')
    userEvent.click(saveBtn)
})


it("Props genre exists", async () => {
    const inputGenre = {
        "name": "NameGenre1",
        "description": "DescriptionGenre1",
        "url": "UrlGenre1"
    }
    render(<QueryClientProvider client={queryClient}>
        <Router><CreateEditGenreForm onSubmit={jest.fn()} genreData={inputGenre}/>
        </Router></QueryClientProvider>)

    const nameInput = screen.getByLabelText(/Genre Name/i)
    const descriptionInput = screen.getByLabelText(/Description/i)
    const urlInput = screen.getByLabelText(/Url/i)

    expect(nameInput.defaultValue).toBe(inputGenre.name)
    expect(descriptionInput.defaultValue).toBe(inputGenre.description)
    expect(urlInput.defaultValue).toBe(inputGenre.url)

})