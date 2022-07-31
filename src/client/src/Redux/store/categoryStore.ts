import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum Categories {
    "All" = "All",
    "Home" = "Home",
    "Work" = "Work",
    "School" = "School"
}
const initialState: string = Categories.All;
export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategory: (_, action: PayloadAction<string>) => action.payload
    }
});
export const {
    actions: { setCategory }
} = categorySlice;
export default configureStore({ reducer: categorySlice.reducer });