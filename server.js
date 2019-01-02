const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const http = require('http').Server(app);
const io = require('socket.io')(http);
const db = require('./db');
const { User } = require('./db/models');

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

app.post('/messages', async (req, res, next) => {
    // consider refactoring into helper function
    const badwords = ['cuss', 'fowl', 'rotten'];
    const shouldCensor = req.body.message.toLowerCase()
        .split(' ')
        .reduce((acc, cur) => {
            if (badwords.includes(cur)) acc = true;
            return acc;
        }, false);
    try {
        await User.create(req.body);
        const broadcast = shouldCensor ? { name: req.body.name, message: 'CENSORED' } : req.body;
        io.emit('message', broadcast);
        res.sendStatus(200);
    }
    catch (err) {
        console.error(err);
        next(err);
    }

});

// implement error handling catch-all

io.on('connection', (socket) => {
    console.log('a user connected');
});

// replacing app.listen with http.listen instead so backend served by both Express and Socket.io
db.sync({ force: true },
    console.log('db synced'))
    .then(() => {
        http.listen(PORT, () => {
            console.log(`Listening on ${PORT}`);
        });
    });
