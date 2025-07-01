const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController');

router
  .route('/')
  .get(taskController.getTasks)
  .post(taskController.createTask);

router
  .route('/:id')
  .get(taskController.getTaskById)
  .delete(taskController.removeTask)
  .put(taskController.updateTask);

module.exports = router;