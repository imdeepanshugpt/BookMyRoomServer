const express = require('express');
const app = express();
const cors = require('cors');

const bodyParser = require('body-parser');
const mongoose = require('./config/database');
const jwt = require('jsonwebtoken');
const subscribers = require('./models/subscribersSchema');
const webPush = require('web-push');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json());
app.use(cors());

const admin = require('./routes/admin');
const booking = require('./routes/booking');
const customer = require('./routes/customer');
const discount = require('./routes/discount');
const hotel = require('./routes/hotel');
const manager = require('./routes/manager');
const usersearch = require('./routes/usersearch');
const subscribe = require('./routes/subscribers');


app.use('/admin', admin);
app.use('/booking', booking);
app.use('/booking', booking);
app.use('/customer', customer);
app.use('/discount', discount);
app.use('/coupon',booking)
app.use('/hotel', hotel);
app.use('/manager', manager);
app.use('/usersearch',usersearch);
app.use('/subscribe', subscribe);

var port = process.env.PORT || 3000;


var server = app.listen(port, function(){
    console.log("Server Started");
});
var io = require('socket.io').listen(server);


io.on('connection', (socket) => {
    console.log('user connected');
    socket.on('new-message', (message) => {
      console.log(message);
      io.emit('new-message', message);
    });
});
