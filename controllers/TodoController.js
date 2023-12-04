const  Todo = require('../models/Todos')

//Fetch all todos
exports.getAllTodos = (req, res,next) => {
    Todo.find()
        .then(todos => res.status(200).json(todos))
        .catch(err => res.status(400).json('Error: ' + err))
}

// Fetch one todo
exports.getTodo = (req, res,next) => {
    Todo.findById(req.params.id).then(todo => res.status(200).json(todo))
    .catch(err => res.status(400).json('Error: ' + err))
}

//Create a todo
exports.postAddTodo = (req, res,next) => {
    const title = req.body.title;
    const description = req.body.description;
    const status = req.body.status;
    const date = Date.parse(req.body.date);
    const todo = new Todo({
        title: title,
        description: description,
        status: status,
        date: date
    })
    todo.save()
    .then(()=> {
        console.log('Todo Added')
        res.status(201).json({title:"Todo Added", todo:todo})
    })
    .catch(err => res.status(400).json('Error: ' + err));
};

//Update a todo
exports.putUpdateTodo = (req, res,next) => {
    const todoId = req.params.id;
    const updatedTitle = req.body.title;
    const updatedDescription = req.body.description;
    const updatedStatus = req.body.status;
    const updatedDate = Date.parse(req.body.date);

    Todo.findById(todoId).then(todo => {
        todo.title = updatedTitle;
        todo.description = updatedDescription;
        todo.status = updatedStatus;
        todo.date = updatedDate;
        return todo.save();
    }).then(result => {
        console.log('Todo Updated')
        res.status(201).json({title: 'Todo Updated', todo:result})
    })
    .catch(err => res.status(400).json('Error: ' + err));
}

//Delete a todo
exports.deleteTodo = (req, res,next) => {
    const todoId = req.params.id;
    Todo.findByIdAndDelete(todoId).then(() => {
        console.log('Todo Deleted')
        res.status(200).json('Todo Deleted')
    })
}