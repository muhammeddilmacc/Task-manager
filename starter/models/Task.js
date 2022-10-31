const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Please provide a name'],                      // this is a custom error message
        trim: true,                                                     // remove white space
        maxlength: [20, 'Name cannot be more than 20 characters']       // max length of name
    },
    completed: {
        type: Boolean,
        default: false
    }

});


// create a model
module.exports = mongoose.model('Task', TaskSchema);