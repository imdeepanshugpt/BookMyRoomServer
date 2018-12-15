const mongoose = require('mongoose');
const mongoDB = 'mongodb://localhost:27017/Orchard2';
mongoose.connect(mongoDB, { useNewUrlParser: true });
module.exports = mongoose;