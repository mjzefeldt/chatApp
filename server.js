const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const http = require('http').Server(app);
const io = require('socket.io')(http);
const db = require('./db');
const { User } = require('./db/models');
const { badWords } = require('./helper-functions/badwords')

app.use(morgan('dev'));
app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/messages', async (req, res, next) => {
    try {
        const messages = await User.findAll();
        res.send(messages);
    }
    catch (err) {
        console.error(err);
        next(err);
    }
});

app.get('/messages/:user', async (req, res, next) => {
    try {
        const messages = await User.findAll({
            where: {
                name: req.params.user
            }
        });
        res.send(messages);
    }
    catch (err) {
        console.error(err);
        next(err);
    }
});

app.post('/messages', async (req, res, next) => {
    try {
        const broadcast = badWords(req.body.message) ? { name: req.body.name, message: 'CENSORED' } : req.body;
        await User.create(broadcast);
        io.emit('message', broadcast);
        res.sendStatus(200);
    }
    catch (err) {
        console.error(err);
        next(err);
    }
});

// sends index.html for endpoints that do not exist
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/'));
});

// handle errors for endpoint that does not exist
app.use((req, res, next) => {
    const err = new Error('Not found.');
    err.status = 404;
    next(err);
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

// replacing app.listen with http.listen instead so backend served by both Express and Socket.io
db.sync(
    { force: true }, //how to handle this? don't want to constantly empty db...
    console.log('db synced'))
    .then(() => {
        http.listen(PORT, () => {
            console.log(`Listening on port: ${PORT}`);
        });
    });

// handle 500 errors
    app.use((err, req, res, next) => {
        console.error(err);
        console.error(err.stack);
        res.status(err.status || 500).send(err.message || 'Internal server error.');
    });
