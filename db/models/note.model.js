const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    content: {
        type: String,
        trim: true
    }
});

const Note = mongoose.model('Note', NoteSchema);

module.exports = { Note };