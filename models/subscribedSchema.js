const mongoose = require('mongoose');

let subscribedSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true, 
        unique: true
    },
    subscribed: {
        type: Boolean
    }
});

module.exports = mongoose.model('subscribed',subscribedSchema);