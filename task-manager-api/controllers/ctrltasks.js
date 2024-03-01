const { Response } = require('express');
const { HTTP_CODE } = require('../utilities/constants');
const { validateTask, validateNumeric } = require('../validators/taskValidator');

var taskList = [];

filter = (taskId) => taskList.filter(task => task.id === taskId);

const get = (req, res = Response) => {
    const { id, pageSize, pageNumber } = req.params;
    const validate = validateNumeric(id, 'el parametro :id debe ser numerico');
    // Código de estado por defecto
    let statusCode = HTTP_CODE.OK;

    // Respuesta predeterminada
    let response = taskList;

    if (id) {
        const idValidation = validateNumeric(id, 'El parámetro :id debe ser numérico');
        if (!idValidation.isValid) {
            statusCode = HTTP_CODE.BAD_REQUEST;
            response = { message: idValidation.errors };
        } else {
            const taskId = Number(id);
            const taskFilter = filterTaskById(taskId);
            if (taskFilter.length === 0) {
                statusCode = HTTP_CODE.NOT_FOUND;
                response = { message: '¡Tarea no encontrada!' };
            } else {
                response = taskFilter;
            }
        }
    } else if (pageSize && pageNumber) {
        const pageSizeValidation = validateNumeric(pageSize, 'El parámetro :pageSize debe ser numérico');
        const pageNumberValidation = validateNumeric(pageNumber, 'El parámetro :pageNumber debe ser numérico');

        if (!pageSizeValidation.isValid || !pageNumberValidation.isValid) {
            statusCode = HTTP_CODE.BAD_REQUEST;
            response = { message: [...pageSizeValidation.errors, ...pageNumberValidation.errors] };
        } else {
            const sizePage = Number(pageSize);
            const numberPage = Number(pageNumber);
            const totalPages = Math.ceil(taskList.length / sizePage);
            const nextPage = Math.min(numberPage + 1, totalPages);
            response = {
                sizePage: sizePage,
                nextPage: nextPage,
                data: taskList.slice((numberPage - 1) * sizePage, numberPage * sizePage)
            };
        }
    }
    // Establecer el código de estado y enviar la respuesta
    res.status(statusCode).json(response);
};

const create = (req, res) => {
    const { body } = req;
    const { id } = body;

    // Validar la tarea
    const validate = validateTask(body);

    if (!validate.isValid) {
        // Si la validación falla, enviar respuesta de error
        return res.status(HTTP_CODE.BAD_REQUEST).json({ message: validate.errors });
    }

    // Filtrar la tarea por ID
    const existingTask = filter(id);

    if (existingTask.length > 0) {
        // Si la tarea ya existe, enviar respuesta de error
        return res.status(HTTP_CODE.BAD_REQUEST).json({ message: 'La tarea ya existe!' });
    }

    // Agregar la nueva tarea a la lista de tareas
    taskList.push(body);

    // Enviar respuesta de éxito
    return res.status(HTTP_CODE.CREATED).json({ message: 'Tarea creada con éxito!' });
};

const update = (req, res) => {
    const { body } = req;
    const { id } = body;
    
    // Validar la tarea
    const validate = validateTask(body);
    
    if (!validate.isValid) {
        // Si la validación falla, enviar respuesta de error
        return res.status(HTTP_CODE.BAD_REQUEST).json({ message: validate.errors });
    }
    
    // Filtrar la tarea por ID
    const existingTaskIndex = taskList.findIndex(task => task.id === id);
    
    if (existingTaskIndex !== -1) {
        // Si la tarea existe, reemplazarla en la lista
        taskList[existingTaskIndex] = body;
        // Enviar respuesta de éxito
        return res.status(HTTP_CODE.OK).json({ message: 'La tarea se modificó con éxito!' });
    } else {
        // Si la tarea no existe, enviar respuesta de error
        return res.status(HTTP_CODE.NOT_FOUND).json({ message: 'La tarea no existe!' });
    }
};

const remove = (req, res) => {
    const { id } = req.params;
    
    // Validar si el ID es numérico
    const validate = validateNumeric(id, 'El parámetro :id debe ser numérico');
    
    // Convertir el ID a número
    const taskId = Number(id);
    
    // Establecer el código de estado predeterminado
    let statusCode = HTTP_CODE.NO_CONTENT;
    
    if (taskId && validate.isValid) {
        // Filtrar la tarea por ID
        const taskIndex = taskList.findIndex(task => task.id === taskId);
        
        if (taskIndex === -1) {
            // Si la tarea no se encuentra, establecer el código de estado a NOT_FOUND
            statusCode = HTTP_CODE.NOT_FOUND;
            return res.status(statusCode).json({ message: '¡Tarea no encontrada!' });
        } else {
            // Eliminar la tarea de la lista
            taskList.splice(taskIndex, 1);
            return res.status(statusCode).json();
        }
    } else {
        // Si el ID no es numérico, establecer el código de estado a BAD_REQUEST
        statusCode = HTTP_CODE.BAD_REQUEST;
        return res.status(statusCode).json({ message: validate.errors });
    }
};

const createBatch = (req, res = Response) => {
    const { body } = req;
    taskList = body;
    res.json({ message: 'Tareas creadas con exito!' });
};

module.exports = { get, create, update, remove, createBatch }