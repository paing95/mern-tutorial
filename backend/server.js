const cors = require('cors');
const express = require('express');

// imports
const config = require('./config/config');
const connection = require('./config/connection');
const workoutRouter = require('./routes/workouts');

// express app
const app = express();
// CORS for cross-domain for all APIs.
app.use(cors())

// middlewares for POST requests
app.use(express.json());
app.use(express.urlencoded());

// middleware
app.use((req, resp, next) => {
    console.log(req.url, req.method);
    // next method has to be called to continue requests
    next();
});

// workout routes
app.use('/api/workouts', workoutRouter);

// connect to db
connection.connect_to_db()
    .then(() => {
        console.log("DB connected.");

        // listening for requests
        app.listen(config.PORT, () => {
            console.log(`Server is listening on ${config.PORT}`);
        });
    })
    .catch((error) => {
        console.log("Cannot connect to db:", error);
    });







/* 

=== Examples of GET & POST requests ===

// GET request /< id >
app.get('/:id', (req, resp) => {
    console.log('GET request params:', req.params.id);
    resp.json({ data: 'hello world!' });
});

// GET request /?id=123
app.get('/', (req, resp) => {
    console.log('GET requests query:', req.query.id);
    resp.json({ data: 'hello world!' });
});

// POST request
app.post('/', (req, resp) => {
    console.log('POST request data:', req.body);
    resp.json({ data: 'hello world!' });
});

*/