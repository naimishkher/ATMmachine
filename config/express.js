const express = require('express');
const bodyParser = require('body-parser');
const session = require("express-session");
const path = require("path");
const compression = require('compression');
const async = require("async");
const app = express();

function parallel(middlewares) {
    return function (req, res, next) {
        async.each(middlewares, function (mw, cb) {
            mw(req, res, cb);
        }, next);
    };
}

module.exports = function() {
    if (process.env.NODE_ENV == 'development') {
        ///// FOR SESSION SET /////
        app.use(session({resave: true, saveUninitialized: true, secret: 'SOMERANDOMSECRETHERE', maxAge: '1h'}));
    } else if (process.env.NODE_ENV == 'production') {
        const RedisStore = require('connect-redis')(session);
        const redis = require("redis");
        const client = redis.createClient();
        app.use(session({resave: true, saveUninitialized: true, secret: 'SOMERANDOMSECRETHERE', maxAge: '1h', store: new RedisStore({host: 'localhost', port: 6379, client: client, ttl: 1440})}));
    }

    app.use(parallel([
        express.static(path.join(__dirname, '../dist')),
        express.static(path.join(__dirname, '../uploads')),
        compression(),  
        bodyParser.json({limit: '50mb'}),
        bodyParser.urlencoded({limit: '50mb', extended: true})
    ]));
        require('../app/routes/bank')(app);

        // Catch all other routes and return the index file
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../dist/index.html'));
        });
    return app;
};