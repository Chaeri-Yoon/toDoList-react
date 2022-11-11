import axios from 'axios';
import routes from '@src/routes';
import { ITaskForm } from '@src/type';

const baseUrl = `${process.env.REACT_APP_SERVER_URL}/api`;

export const postJoin = async ({ email, password }: { email: string, password: string }) => {
    return await axios.post(`${baseUrl}/join`, { email, password });
}
export const postLogin = async ({ email, password }: { email: string, password: string }) => {
    return await axios.post(`${baseUrl}/login`, { email, password });
}
export const getLogout = async () => await axios.get(`${baseUrl}/logout`);
export const postAddTask = async (data: ITaskForm) => {
    return await axios.post(`${baseUrl}/add-task`, { ...data });
}
export const postEditTask = async ({ taskId, data }: { taskId: string, data?: ITaskForm }) => {
    return await axios.post(`${baseUrl}/edit-task`, { taskId, data: { ...data } });
}
export const postDeleteTask = async (taskId: string) => {
    return await axios.post(`${baseUrl}/delete-task`, { taskId });
}