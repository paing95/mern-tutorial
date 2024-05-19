const mongoose = require('mongoose');

// imports
const config = require('./config');

const connect_to_db = () => {
    const db_uri = 'mongodb+srv://' +
    config.DB_USERNAME + ':' + config.DB_PASSWORD +
    '@cluster0.ujpxl.mongodb.net/' + config.DB_NAME +
    '?retryWrites=true&w=majority' + 
    '&appName=Cluster0';

    return mongoose.connect(db_uri);
};

module.exports = {
    connect_to_db
};