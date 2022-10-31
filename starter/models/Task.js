const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({

    name: String,
    completed: Boolean

});


// create a model
module.exports = mongoose.model('Task', TaskSchema);