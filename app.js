const express = require('express');
const app = express();

const { mongoose } = require('./db/mongoose');

const bodyParser = require('body-parser');

// Load models
const { List, Task } = require('./db/models');

// Load middleware
app.use(bodyParser.json());

/* ROUTE HANDLERS */

/* LIST ROUTES */

/*
*   GET /lists
*   Purpose: Get all lists
*/

app.get('/lists', (req, res) => {
    // Return an array with all elements in the database
    List.find({}).then((lists) => {
        res.send(lists);
    });
});


/*
*   POST /lists
*   Purpose: Create a new list
*/

app.post('/lists', (req, res) => {
    // Create a new list and return the new list document back to the user
    // List information will be passed via the JSON request body
    let title = req.body.title;

    let newList = new List({
        title
    });

    newList.save().then((listDoc) => {
        res.send(listDoc);
    });
});

/*
*   PATCH /lists/:id
*   Purpose: Update a list element (specified by the id)
*/

app.patch('/lists/:id', (req, res) => {
    // We want to update the specified list element with new values in the JSON body
    List.findOneAndUpdate({_id: req.params.id }, {
        $set: req.body
    }).then (() => {
        res.sendStatus(200);
    });
});

/*
*   DELETE /lists/:id
*   Purpose: Delete an list element (specified by the id)
*/

app.delete('/lists/:id', (req, res) => {
    // We want to delete a specific list element (element is specified in the url)
    List.findOneAndRemove({
        _id: req.params.id
    }).then((removedListDoc) => {
        res.send(removedListDoc);
    });
});

/*
*   GET /lists/:listId/tasks
*   Purpose: Get all tasks of one list
*/

app.get('/lists/:listId/tasks', (req, res) => {
    // We want all tasks of one specific list
    Task.find({
        _listId: req.params.listId
    }).then((tasks) => {
        res.send(tasks);
    });
});

app.get('/lists/:listId/tasks/:taskId', (req, res) => {
    // We want one task from on list
    Task.findOne({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((task) => {
        res.send(task);
    });
});

/*
*   POST /lists/:listId/tasks
*   Purpose: Create a new task
*/

app.post('/lists/:listId/tasks', (req, res) => {
    // We want to create a new task in the list
    let newTask = new Task({
        title: req.body.title,
        _listId: req.params.listId
    });
    newTask.save().then((newTaskDoc) => {
        res.send(newTaskDoc);
    });
});

/*
*   PATCH /lists/:listId/tasks/:taskId
*   Purpose: Update an existing task
*/

app.patch('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndUpdate({
        _id: req.params.taskId,
        _listId: req.params.listId
    }, {
        $set: req.body
    }).then(() => {
        res.sendStatus(200);
    });
});


/*
*   DELETE /lists/:listId/tasks/:taskId
*   Purpose: Delete an existing task
*/

app.delete('/lists/:listId/tasks/:taskId', (req, res) => {
    Task.findOneAndRemove({
        _id: req.params.taskId,
        _listId: req.params.listId
    }).then((removedTaskDoc) => {
        res.send(removedTaskDoc)
    });
});

app.listen(3000, () => {
    console.log("Server is listening on Port 3000")
});