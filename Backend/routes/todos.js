var express = require('express');
var router = express.Router();
var helper = require('../Helpers/todo');

router.route('/')
    .get(helper.getTodos)
    .post(helper.createTodo)

router.route('/:todoId')
    .get(helper.getSingleTodo)
    .put(helper.updateTodo)
    .delete(helper.deleteTodo)

module.exports = router;