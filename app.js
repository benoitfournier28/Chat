const express = require("express");
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const messages = require("./back/message");

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
});

io.on('connection', (socket) => {
    console.log('Un utilisateur s\'est connecté.');

    socket.on('disconnect', () => {
        console.log('un utilisateur s\'est déconnecté');
    });
    socket.on('chat message', (msg) => {
        console.log('message reçu : ' + msg);
        io.emit('chat message', msg );
    });
});



server.listen(3000, () => {
    console.log('server is listening on the port 3000.')
});

// io.on('connection', (socket) => {
//     console.log('Un utilisateur s\'est connecté.');

//     socket.on('chat message', (msg) => {
//         console.log('Message:' + msg);
//     });
// });