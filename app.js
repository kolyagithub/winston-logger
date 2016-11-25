/**
 * Created by qudrat on 06/12/16.
 */

const http = require('http')
    , express = require('express')
    , config = require('./config/config.json')
    , bodyParser = require('body-parser')
    , fs = require('fs')
    , route = require('./routes/route')
    , logger = require('./utils/logger')(__filename);

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/', route);
app.use(function(err, req, res, next) {
    logger.error('Express error: ', err);
    res.status(500).send('Something broke in express!');
});
app.use(function(req, res, next) {
    if(req.url !== "/favicon.ico"){
        res.status(404).send('Sorry cant find this URL!');
        logger.error('Route not found: ', req.url);
    }
});

if (!fs.existsSync('logs')) {
    fs.mkdirSync('logs');
    logger.info('Created logs folder ');
}

var server = http.createServer(app);
server.listen(config.app.port, function () {
    logger.info('Server listening on port %d ', config.app.port);
});