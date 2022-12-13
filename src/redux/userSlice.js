import {createSlice} from '@reduxjs/toolkit';

const initialState = {users: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : []};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.users = action.payload;
        },
        removeUser(state) {
            state.users = [];
        },
    },
});

export const {setUser, removeUser} = userSlice.actions;

export default userSlice.reducer;