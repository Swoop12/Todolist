var Todo = require('../Models');

exports.getTodos = function (req, res) {
    Todo.find().then(function (todos) {
        res.json(todos);
    }).catch(function (err) {
        res.send(err);
    })
}

exports.createTodo = function(req, res){
    console.log("body", req.body)
    Todo.create(req.body)
    .then(function(todo){
        console.log(todo)
        res.send(todo)
    }).catch(function(error){
        res.send(error)
    })
}

exports.getSingleTodo = function(req, res){
    Todo.findById(req.params.todoId)
    .then(function(foundTodo){
        res.json(foundTodo);
    })
    .catch(function(err){
        res.send(err);
    })
}

exports.updateTodo = function(req, res){
    Todo.findOneAndUpdate({_id: req.params.todoId}, req.body, {new : true})
    .then(function(foundTodo){
        res.json(foundTodo);
    }).catch(function(error){
        res.send(error);
    })
}

exports.deleteTodo = function(req, res){
    Todo.findByIdAndDelete(req.params.todoId)
    .then(function(){ res.send({message : "Todo deleted"}) })
    .catch(function(error){ res.send(error) })
}

module.exports = exports