const { filter, getAll, filterPager, save, update, remove } = require('../db/TaskDB');

const findTaskById = (idTask) => filter(idTask)

const findTaskPager = (pageSize, pageNumber) => filterPager(pageSize,pageNumber);

const getAllTask = () => getAll();

const createTask = (task) => save(task);

const updateTask = (task) => update(task);

const removeTask = (idTask) => remove(idTask);


module.exports = { findTaskById, findTaskPager, getAllTask, createTask, updateTask, removeTask }