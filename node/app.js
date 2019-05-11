const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./router/user');
const imageRouter = require('./router/image');
const bookRouter = require('./router/book');

const server = express();

server.listen(3333);

console.log('http://localhost:3333/user/login.html');

server.use(bodyParser.urlencoded({extended: false}));

server.use(express.static(__dirname + '../../static/html'));
server.use(express.static(__dirname + '../../static/'));

server.use('/user', userRouter);
server.use('/image', imageRouter);
server.use('/book', bookRouter);



