const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;
const http = require('http').Server(app);
const io = require('socket.io')(http);
const db = require('./db');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// placeholder messsages list
const messages = [
    {name: 'MJ', message: 'Sup bud?'},
    {name: 'Luke', message: 'Nada.' }
];

app.get('/messages', (req, res, next) => {
    res.send(messages);
});

app.post('/messages', (req, res, next) => {
    messages.push(req.body);
    io.emit('message', req.body);
    res.sendStatus(200);
});

io.on('connection', (socket) => {
    console.log('a user connected');
});

// replacing app.listen with http.listen instead so backend served by both Express and Socket.io
db.sync({ force: true })
    .then(() => {
        http.listen(PORT, () => {
            console.log(`Listening on ${PORT}`);
        });
    });
