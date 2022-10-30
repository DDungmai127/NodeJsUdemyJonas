// const { application } = require('express');
const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

// 1.MIDDlEWARE
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
//build own middleware
app.use((req, res, next) => {
    console.log('Hello from the middleware');
    next();
});

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});
/*
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello from the server side',
        app: 'Natours',
    });
});

app.post('/', (req, res) => {
    res.send('You can post to this endpoint...');
});
*/

//2. ROUTE HANDLER

// refactoring our routes

// 3.ROUTES
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// 4. START SERVER
module.exports = app;
