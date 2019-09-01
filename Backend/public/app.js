

function addTodos(todos) {
    todos.forEach(function(todo) {
       addTodoLi(todo)
    })
}

function createTodo(name) {
    $.post('/api/todos', {name: name})
    .then(function(todo){
        console.log(todo)
        addTodoLi(todo);
    }).catch(function(error){
        alert(error);
    })
}

function addTodoLi(todo) {
    var newTodo = $('<li class="todoItem">'+todo.name+'<span class="delete">X</span> </li>')
    newTodo.data('id',todo._id);
    $('.list').append(newTodo)
    if(todo.completed === true){
        newTodo.addClass("done");
   }
    return newTodo
}

function toggleCompleted(todoli){
    var todoId = todoli.data('id');
    console.log(todoId)
    $.get('/api/todos/'+todoId)
    .then(function(todo){
        console.log(todo)
        return $.ajax({
            method: "PUT",
            url: '/api/todos/'+todoId,
            data: {completed : !todo.completed}
        })
    }).then(function(todo){
        todoli.toggleClass("done");
    }).catch(function(error){
        alert(error)
    })
};

function removeTodo(event){
    event.stopPropagation();
    var clickedId = $(this).parent().data('id');
    $.ajax({
        method: 'Delete',
        url: '/api/todos/' + clickedId
    }).then(function(response){
        alert(response.message)
    })
    $(this).parent().remove();
}

$(document).ready(function() {
    $.getJSON("/api/todos")
    .then(addTodos)

    let textInput = $('#todoInput');

    textInput.keypress(function(event){
        if(event.which == 13) {
            console.log(textInput.val())
            createTodo(textInput.val())
            textInput.val('');
        }
    });

    $('.list').on('click','span',removeTodo)

    $('.list').on('click', 'li', function(event){
        toggleCompleted($(this));
    })
});