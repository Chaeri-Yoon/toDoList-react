import express from 'express';
import routes from './routes.js';
import { postJoin, postLogin, getLogout } from './controllers/userController';
import { loadTaskList, postAddTask, postEditTask, postDeleteTask } from './controllers/taskController';
import { onlyLoggedUser } from "./middlewares.js";

const router = express.Router();
router.post(routes.joinApi, postJoin, postLogin, loadTaskList);
router.post(routes.loginApi, postLogin, loadTaskList);
router.post(routes.logoutApi, onlyLoggedUser, getLogout);
router.post(routes.addTaskApi, onlyLoggedUser, postAddTask);
router.post(routes.editTaskApi, onlyLoggedUser, postEditTask);
router.post(routes.deleteTaskApi, onlyLoggedUser, postDeleteTask)
export default router;