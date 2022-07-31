import { combineReducers, configureStore, createAsyncThunk } from "@reduxjs/toolkit";
import reduxThunk from "redux-thunk";
import { persistStore, persistReducer } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import { categorySlice } from "@redux/store/categoryStore";
import { setTaskList, taskListSlice } from "@redux/store/taskStore";
import { setUserId, userIdSlice } from "@redux/store/userIdStore";

export const initializeDataAsyncAction = createAsyncThunk(
    'api/initialize-data',
    async (data: [], thunkAPI) => {
        await persistor.purge();
        thunkAPI.dispatch(setTaskList([]));
        thunkAPI.dispatch(setUserId(""));
    }
)

const taskListReducer = taskListSlice.reducer;
const categoryReducer = categorySlice.reducer;
const userIdReducer = userIdSlice.reducer;

const rootReducer = combineReducers({
    taskList: taskListReducer,
    category: categoryReducer,
    userId: userIdReducer
})

const persistConfig = {
    key: 'root',
    storage
}
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: [reduxThunk]
})
export const persistor = persistStore(store);