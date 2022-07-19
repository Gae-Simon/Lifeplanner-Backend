// This file handel the connection to the MongoDB database
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://127.0.0.1:27017/LIFEPLANNER', {useNewUrlParser: true}).then(() => {
    console.log("Connected to MongoDB");
}).catch((e) => {
    console.log("Error while attempting to connect to database");
    console.log(e);
});

module.exports = {
    mongoose
};


