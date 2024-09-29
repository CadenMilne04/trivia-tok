require('dotenv').config()

const express = require('express')
const bodyParserSetup = require('./middleware/bodyParser.js');
const mongooseSetup = require('./middleware/mongoose.js');

const app = express()

mongooseSetup();
bodyParserSetup(app);

//For cors errors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api/questions', require('./questions/routes.js'))
app.use('/api/users', require('./users/routes.js'))
module.exports = app
