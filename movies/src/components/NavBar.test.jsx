import {fireEvent, render, screen} from "@testing-library/react";
import {BrowserRouter as Router} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import NavBar from "./NavBar";
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';


const queryClient = new QueryClient();


it("Login button in UI", async () => {
    const mockStore = configureStore()
    const store = mockStore( {auth: {isAuthenticated: false}});
    render(
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Router><NavBar/></Router>
            </QueryClientProvider>
        </Provider>
    )

    const loginLink = await screen.getByText('Login')
    expect(loginLink).toBeInTheDocument();
})


it("Login button not in UI", async () => {
    const mockStore = configureStore()
    const store = mockStore( {auth: {isAuthenticated: true}});
    render(
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Router><NavBar/></Router>
            </QueryClientProvider>
        </Provider>
    )

    const loginLink = await screen.queryByText('Login')
    expect(loginLink).toBeNull()
})


it("Profile and Logout button in UI", async () => {
    const mockStore = configureStore()
    const store = mockStore( {auth: {isAuthenticated: true}});
    render(
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Router><NavBar/></Router>
            </QueryClientProvider>
        </Provider>
    )

    const profileLink = await screen.queryByText('Profile')
    const logoutLink = await screen.queryByText('Log out')
    expect(profileLink).toBeInTheDocument()
    expect(logoutLink).toBeInTheDocument()
})


it("After click, login link is underlined", async () => {
    const mockStore = configureStore()
    const store = mockStore( {auth: {isAuthenticated: false}});
    render(
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <Router><NavBar/></Router>
            </QueryClientProvider>
        </Provider>
    )

    const loginLink = await screen.getByText('Login')
    fireEvent.click(loginLink)
    expect(loginLink).toHaveClass('underline');

})