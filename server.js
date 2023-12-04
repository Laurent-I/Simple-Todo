const express = require('express');

const app = express();

const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config();

const authRoute = require('./routes/AuthRoute');

const todoRoute = require('./routes/TodoRoute');

app.use(express.json());

app.use('/api/user', authRoute);
app.use('/api/todo', todoRoute);


mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB Connection Successful!')).catch(err => {
        console.log(err);
    })
    .then(()=> {
        app.listen(process.env.PORT, () => console.log('Server Up and running'));
    })
    .catch(err => {
        console.log(err);
});

module.exports = app