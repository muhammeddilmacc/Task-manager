const Task = require('../models/Task');
const asyncWrapper = require('../middleware/asyncWrapper');
const { createCustomError } = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
});



const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
});


const getTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
        return next(createCustomError(`Task with id: ${taskID} not found`, 404));
    }
    res.status(200).json({ task });
});


const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
        return next(createCustomError(`Task with id: ${taskID} not found`, 404));
    }
    res.status(200).json({ task });
});


const updateTask = asyncWrapper(async (req, res) => {
    const { id: taskID } = req.params;
    // as third argument, after the sending req.body we can pass  {new : true, runValidators: true} 
    // to get the updated document and to run the validators
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, { new: true, runValidators: true });
    if (!task) {
        return next(createCustomError(`Task with id: ${taskID} not found`, 404));
    }
    res.status(200).json({ task });
});


module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask

}