import { createAsyncThunk } from '@reduxjs/toolkit';
import { postAddTask, postDeleteTask, postEditTask } from '@src/api';
import { ITaskForm } from '@src/type';
import { addTask, editTask, deleteTask } from '@redux/store/taskStore';

export const addTaskAsync = createAsyncThunk(
    'api/add-task',
    (data: ITaskForm, thunkAPI) => {
        postAddTask(data)
            .then(response => {
                const { data: { addedTask } } = response;
                thunkAPI.dispatch(addTask(addedTask));
            });
    }
)
export const editTaskAsync = createAsyncThunk(
    'api/edit-task',
    ({ taskId, data }: { taskId: string, data?: ITaskForm }, thunkAPI) => {
        postEditTask({ taskId, data })
            .then(response => {
                const { data: { editedTask } } = response;
                thunkAPI.dispatch(editTask({ taskId, data: editedTask }));
            });
    }
)
export const deleteTaskAsync = createAsyncThunk(
    'api/delete-task',
    (taskId: string, thunkAPI) => {
        postDeleteTask(taskId)
            .then(response => {
                thunkAPI.dispatch(deleteTask(taskId));
            })
    }
)