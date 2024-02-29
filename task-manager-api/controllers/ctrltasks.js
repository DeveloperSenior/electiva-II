const { Response } = require('express');
const { HTTP_CODE } = require('../utilities/constants');
const { validateTask, validateNumeric } = require('../validators/taskValidator');

var taskList = [];

filter = (taskId) => taskList.filter(task => task.id === taskId);

const get = (req, res = Response) => {
    const { id } = req.params;
    const validate = validateNumeric(id, 'el parametro :id debe ser numerico');
    var taskId = Number(id);
    res.statusCode = HTTP_CODE.OK;
    if (taskId) {
        if (!validate.isValid) {
            res.statusCode = HTTP_CODE.BAD_REQUEST;
            res.json({ message: validate.errors })
        } else {
            var taskFilter = filter(taskId);
            if (taskFilter.length === 0) {
                res.statusCode = HTTP_CODE.NOT_FOUND;
                res.json({ message: 'Tarea no encontrada!' });
            }
            res.json(taskFilter);
        }
    } else {
        res.json(taskList)
    }
}

const create = (req, res = Response) => {
    const { body } = req;
    const { id } = body;
    const validate = validateTask(body);
    if (!validate.isValid) {
        res.statusCode = HTTP_CODE.BAD_REQUEST;
        res.json({ message: validate.errors })
    } else {
        const taskFilter = filter(id);
        res.statusCode = HTTP_CODE.CREATED;
        if (taskFilter.length > 0) {
            res.statusCode = HTTP_CODE.BAD_REQUEST;
            res.json({ message: 'La tarea ya existe!' })
        } else {
            taskList.push(body);
            res.json({ message: 'Tarea creada con exito!' })
        }
    }
}

const update = (req, res = Response) => {
    const { body } = req;
    const { id } = body;
    const validate = validateTask(body);
    if (!validate.isValid) {
        res.statusCode = HTTP_CODE.BAD_REQUEST;
        res.json({ message: validate.errors })
    } else {
        const taskFilter = filter(id);
        res.statusCode = HTTP_CODE.OK;
        if (taskFilter.length > 0) {
            const newList = taskList.filter(task => task.id !== id);
            newList.push(body);
            taskList = newList;
            res.json({ message: 'La tarea se modifico con exito!' })
        } else {
            res.statusCode = HTTP_CODE.NOT_FOUND;
            res.json({ message: 'La tarea no existe!' })
        }
    }
}

const remove = (req, res = Response) => {
    const { id } = req.params;
    const validate = validateNumeric(id, 'el parametro :id debe ser numerico');
    var taskId = Number(id);
    res.statusCode = HTTP_CODE.NO_CONTENT;
    if (taskId && validate.isValid) {
        var taskFilter = filter(taskId);
        if (taskFilter.length === 0) {
            res.statusCode = HTTP_CODE.NOT_FOUND;
            res.json({ message: 'Tarea no encontrada!' });
        } else {
            const newList = taskList.filter(task => task.id !== taskId);
            taskList = newList;
            res.json();
        }
    } else {
        res.statusCode = HTTP_CODE.BAD_REQUEST;
        res.json({ message: validate.errors })
    }

}

module.exports = { get, create, update, remove }