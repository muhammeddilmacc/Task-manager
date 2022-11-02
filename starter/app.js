const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
require('dotenv').config();

const connectDB = require('./db/connect');
const notFound = require('./middleware/404');

// middleware
app.use(express.static('./public'));
app.use(express.json());

// routes
app.use('/api/v1/tasks', tasks);
app.use(notFound);


// app.get('/api/v1/tasks)        - get all the tasks
// app.post('/api/v1/tasks)       - create a new task
// app.get('/api/v1/tasks/:id)    - get a single task
// app.patch('/api/v1/tasks/:id)  - update a task
// app.delete('/api/v1/tasks/:id) - delete a task

const port = process.env.PORT || 3000; // start the server on port 3000 if there is no any assigned port.

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(3000, console.log('server is listening on port 3000'));   
    } catch (error) {
        console.log(error);
    }
        
    }


start();