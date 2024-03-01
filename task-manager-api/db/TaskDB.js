var taskList = [];

const filter = (idTask) => taskList.filter((task) => task.id === idTask);
const getAll = () => taskList.sort((a,b) => a.id-b.id);

const filterPager = (pageSize, pageNumber) => {
    var totalPages = Math.ceil(taskList.length / pageSize);
    var nextPage = Math.min(pageNumber + 1, totalPages);
    var data = taskList.sort((a,b) => a.id-b.id).slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
    return { nextPage: nextPage, data: data };
};

const save = (task) => taskList.push(task);

const update = (taskUpdate) => {
    const { id } = taskUpdate;
    const existingTaskIndex = taskList.findIndex((task) => task.id === id);
    if (existingTaskIndex !== -1) {
        // Si la tarea existe, reemplazarla en la lista
        taskList[existingTaskIndex] = taskUpdate;
    }
    return existingTaskIndex;
};

const remove = (idTask) => {
    const taskIndex = taskList.findIndex((task) => task.id === idTask);
    if (taskIndex !== -1) {
        // Eliminar la tarea de la lista
        taskList.splice(taskIndex, 1);
    }
    return taskIndex;
};

module.exports = { filter, getAll, filterPager, save, update, remove };
