import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface userState {
    message: string;
}

const initialState: userState = {
    message: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        fetchMessage: () => { },
        setMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
        },
    },
});

export const { fetchMessage, setMessage } = userSlice.actions;
export default userSlice.reducer;
