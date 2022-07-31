import { store } from "@redux/store";
import { Categories } from "@redux/store/categoryStore";

export type TypeSetTaskListAction = (taskList: ITask[]) => void;
export type TypeSelectTaskAction = () => void;
export type TypeAddTaskAsyncAction = (data: ITaskForm) => void;
export type TypeEditTaskAsyncAction = ({ taskId, data }: { taskId: string, data?: ITaskForm }) => void;
export type TypeDeleteTaskAsyncAction = (taskId: string) => void;
export type TypeSetCategoryAction = (category: string) => void;
export type TypeSetUserIdAction = (userId: string) => void;
export type TypeInitializeDataAsyncAction = (data: []) => void;
export type TypeStore = ReturnType<typeof store.getState>

interface IForm { }
export interface IJoinForm extends IForm {
    email: string,
    password: string,
    passwordConfirm: string
}
export interface ILoginForm extends IForm {
    email: string,
    password: string
}
export interface ITaskForm extends IForm {
    text: string,
    category: string
}

// Each element of taskList will follow this structure.
export interface ITask {
    _id: string,
    text: string,
    category: Categories,
    isDone: boolean
}