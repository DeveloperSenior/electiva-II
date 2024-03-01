const express = require('express')
const controller = require('../controllers/CtrlTasks');
const router = express.Router();

/**
 * @swagger
 * definitions:
 *   TaskModel:
 *     type: object
 *     required:
 *       - id
 *       - name
 *       - description
 *       - createdDate
 *       - dueDate
 *       - status
 *     properties:
 *       id:
 *         type: number
 *       name:
 *         type: string
 *       description:
 *         type: string
 *       createdDate:
 *         type: date
 *       dueDate:
 *         type: date
 *       status:
 *         type: string
 *   ResponseMessageModel:
 *     type: object
 *     required:
 *       - message
 *     properties:
 *       message:
 *         type: string
 *   PagerResponseTaskModel:
 *     type: object
 *     required:
 *       - sizePage
 *       - nextPage
 *       - data
 *     properties:
 *       sizePage:
 *         type: number
 *       nextPage:
 *         type: number
 *       data:
 *         items:
 *          $ref: '#/definitions/TaskModel'
 *         type: array
 *            
 */

/**
 * @swagger
 * /task:
 *   get:
 *     description: Retrieve the full list of tasks
 *     tags:
 *       - tasks
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: tasks
 *         schema:
 *           items:
 *              $ref: '#/definitions/TaskModel'
 *           type: array
 */
router.get('/task', controller.get);

/**
 * @swagger
 * /task/{id}:
 *   get:
 *     description: Retrieve the full list of tasks
 *     tags:
 *       - tasks
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of the task to retrieve
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: tasks
 *         schema:
 *           items:
 *              $ref: '#/definitions/TaskModel'
 *           type: array
 *       400:
 *         description: bad request error body
 *         schema:
 *           $ref: '#/definitions/ResponseMessageModel'
 *       404:
 *         description: not found task id
 *         schema:
 *           $ref: '#/definitions/ResponseMessageModel'  
 */
router.get('/task/:id', controller.get);

/**
 * @swagger
 * /task/{pageSize}/{pageNumber}:
 *   get:
 *     description: Retrieve the pagination list of tasks
 *     tags:
 *       - tasks
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: pageSize
 *         description: page size of the task to retrieve
 *         in: path
 *         required: true
 *         type: number
 *       - name: pageNumber
 *         description: page Number of the task to retrieve
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: tasks
 *         schema:
 *           $ref: '#/definitions/PagerResponseTaskModel'
 *           type: object
 *       400:
 *         description: bad request error body
 *         schema:
 *           $ref: '#/definitions/ResponseMessageModel'
 */
router.get('/task/:pageSize/:pageNumber', controller.get);

/**
 * @swagger
 * /task:
 *   post:
 *     description: Retrieve the full list of tasks
 *     tags:
 *       - tasks
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: task
 *         description: task to create
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/TaskModel'
 *     responses:
 *       201:
 *         description: tasks created
 *         schema:
 *           $ref: '#/definitions/ResponseMessageModel'
 *       400:
 *         description: bad request error body
 *         schema:
 *           items:
 *              $ref: '#/definitions/ResponseMessageModel'
 *           type: array
 */
router.post('/task', controller.create);

/**
 * @swagger
 * /task:
 *   put:
 *     description: update the task by id
 *     tags:
 *       - tasks
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: task
 *         description: task to update
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/TaskModel'
 *     responses:
 *       200:
 *         description: tasks
 *         schema:
 *           $ref: '#/definitions/ResponseMessageModel'
 *       400:
 *         description: bad request error body
 *         schema:
 *           $ref: '#/definitions/ResponseMessageModel'
 *       404:
 *         description: not found task id
 *         schema:
 *           $ref: '#/definitions/ResponseMessageModel'
 */
router.put('/task', controller.update);

/**
 * @swagger
 * /task/{id}:
 *   delete:
 *     description: delete task by id
 *     tags:
 *       - tasks
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: id of the task to delete
 *         in: path
 *         required: true
 *         type: number
 *     responses:
 *       204:
 *         description: no content body response
 *       400:
 *         description: bad request error body
 *         schema:
 *           $ref: '#/definitions/ResponseMessageModel'
 *       404:
 *         description: not found task id
 *         schema:
 *           $ref: '#/definitions/ResponseMessageModel' 
 */
router.delete('/task/:id', controller.remove);

/**
 * @swagger
 * /batch_task:
 *   post:
 *     description: save list of tasks
 *     tags:
 *       - tasks
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: task
 *         description: task to create
 *         in: body
 *         required: true
 *         schema:
 *          type: array
 *          items:
 *           $ref: '#/definitions/TaskModel'
 *     responses:
 *       201:
 *         description: tasks created
 *         schema:
 *           $ref: '#/definitions/ResponseMessageModel'
 *       400:
 *         description: bad request error body
 *         schema:
 *           items:
 *              $ref: '#/definitions/ResponseMessageModel'
 *           type: array
 */
router.post('/batch_task', controller.createBatch);

module.exports = router
