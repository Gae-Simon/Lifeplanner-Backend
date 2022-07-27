const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    _listId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    deadline: {
        type: Date,
        required: false,
        trim: true
    },
    created: {
        type: Date,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    }
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = { Task };