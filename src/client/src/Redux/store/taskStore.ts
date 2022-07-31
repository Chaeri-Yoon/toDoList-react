import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "@src/type";

const initialState: ITask[] = [];
export const taskListSlice = createSlice({
    name: "taskList",
    initialState,
    reducers: {
        setTaskList: (_, action: PayloadAction<ITask[]>) => action.payload,
        addTask: (state, action: PayloadAction<ITask>) => {
            state.unshift(action.payload);
        },
        editTask: (state, action: PayloadAction<{ taskId: string, data: ITask }>) => {
            const targetIndex = state.findIndex(task => task._id === action.payload.taskId);
            return [
                ...state.slice(0, targetIndex),
                action.payload.data,
                ...state.slice(targetIndex + 1)
            ]
        },
        deleteTask: (state, action: PayloadAction<string>) => {
            const targetIndex = state.findIndex(task => task._id === action.payload);
            return [
                ...state.slice(0, targetIndex),
                ...state.slice(targetIndex + 1)
            ]
        }
    }
})

export const {
    actions: { setTaskList, addTask, editTask, deleteTask }
} = taskListSlice;
export default configureStore({ reducer: taskListSlice.reducer });