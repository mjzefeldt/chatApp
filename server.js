const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;

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
    messages.push(req.body)
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});
