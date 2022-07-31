import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string = "";
export const userIdSlice = createSlice({
    name: "userId",
    initialState,
    reducers: {
        setUserId: (state, action: PayloadAction<string>) => action.payload
    }
});
export const {
    actions: { setUserId }
} = userIdSlice;
export default configureStore({ reducer: userIdSlice.reducer });