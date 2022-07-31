import axios from 'axios';
import routes from '@src/routes';
import { ITaskForm } from '@src/type';

const baseUrl = `..${routes.api}`;

export const postJoin = async ({ email, password }: { email: string, password: string }) => {
    return await axios.post(`${baseUrl}${routes.join}`, { email, password });
}
export const postLogin = async ({ email, password }: { email: string, password: string }) => {
    return await axios.post(`${baseUrl}${routes.login}`, { email, password });
}
export const getLogout = async () => await axios.get(`${baseUrl}${routes.logout}`);
export const postAddTask = async (data: ITaskForm) => {
    return await axios.post(`${baseUrl}${routes.addTask}`, { ...data });
}
export const postEditTask = async ({ taskId, data }: { taskId: string, data?: ITaskForm }) => {
    return await axios.post(`${baseUrl}${routes.editTask}`, { taskId, data: { ...data } });
}
export const postDeleteTask = async (taskId: string) => {
    return await axios.post(`${baseUrl}${routes.deleteTask}`, { taskId });
}