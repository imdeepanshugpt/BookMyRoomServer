const mongoose = require('mongoose');

let subscribersSchema = new mongoose.Schema({
    sub: {
        type: Object,
        required: true
    },
    email: {
        type: String,
    },
    subscribed: {
        type: Boolean
    }
});

module.exports = mongoose.model('subscribers',subscribersSchema);