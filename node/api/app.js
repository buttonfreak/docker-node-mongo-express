const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const chalk = require('chalk');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const errorHandler = require('errorhandler');
const expressStatusMonitor = require('express-status-monitor');
const MongoStore = require('connect-mongo')(session);

const index = require('./routes/index');
const bearRoutes = require('./routes/bearRoutes');

dotenv.load({ path: `.env.${process.env.NODE_ENV}` });

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', (err) => {
    console.error(err);
    console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
    process.exit();
});

const app = express();
const router = express.Router();

app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 3000);
app.use(expressStatusMonitor());
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
    store: new MongoStore({
        url: process.env.MONGODB_URI,
        autoReconnect: true,
    }),
}));

// middleware to use for all requests
router.use((req, res, next) => {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

app.use('/api', index);
app.use('/api/bears', bearRoutes);

app.use(errorHandler());

app.listen(app.get('port'), () => {
    console.log('%s App is running at http://localhost:%d in %s mode. For express-status go to http://localhost:%d/status', chalk.green('✓'), app.get('port'), app.get('env'));
    console.log('  Press CTRL-C to stop\n');
});

module.exports = app;
