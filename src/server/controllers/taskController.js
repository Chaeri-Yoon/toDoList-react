import Task from '../models/Task.js';
import User from '../models/User.js';

export const loadTaskList = async (req, res) => {
    const user = await User.findById(req.user.id).populate('taskList');
    res.send({ userId: user.id, taskList: user.taskList });
};
export const postAddTask = async (req, res) => {
    const {
        body: { text, category }
    } = req;
    const newTask = new Task({
        text,
        category,
        isDone: false
    });
    try {
        await Task.create(newTask);
        console.log("Task create completed");

        // Update User DB because the field named taskList of User is linked with Task DB.
        req.user.taskList.push({
            $each: [newTask.id],
            $position: 0
        })
        req.user.save();
        console.log("TaskList modify completed");
        res.send({ addedTask: newTask });
    }
    catch (error) {
        console.log(error);
        res.send({ error });
    }
};
export const postEditTask = (req, res) => {
    const {
        body: { taskId, data }
    } = req;
    try {
        // If data is not empty, it means an user is trying to change the content of the task.
        // If not, it means an user is trying to change the status of isDone.
        Object.keys(data).length === 0 ? (
            Task.findById(taskId, function (err, task) {
                task.isDone = !task.isDone;
                task.save();
                res.send({ editedTask: task });
            })
        ) : (
            Task.findById(taskId, function (err, task) {
                task.text = data.text;
                task.category = data.category;
                task.save();
                res.send({ editedTask: task });
            })
        );
    }
    catch (error) {
        console.log(error);
        res.send({ error });
    }
};
export const postDeleteTask = async (req, res) => {
    const {
        body: { taskId }
    } = req;
    try {
        // Update User DB because the field named taskList of User is linked with Task DB.
        const newTaskList = req.user.taskList.filter(task => task.id.toString() !== taskId);
        req.user.taskList = newTaskList;
        req.user.save();
        console.log("TaskList modify completed");

        await Task.findByIdAndDelete(taskId);
        console.log('delete task completed');
        res.sendStatus(200);
    }
    catch (error) {
        console.log(error);
        res.send({ error });
    }
};