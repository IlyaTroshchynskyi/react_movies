import {createSlice} from '@reduxjs/toolkit'


const authSlice = createSlice({
    name: 'auth',
    initialState: {isAuthenticated: false},
    reducers: {
        authUser(state) {
            state.isAuthenticated = true
        },
        logoutUser(state) {
            state.isAuthenticated = false
        },
    },
})

export const authActions = authSlice.actions

export default authSlice
