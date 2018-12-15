const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-beautiful-unique-validation');

let CustomerSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true, 
    },
    customerEmail: {
        type: String,
        required: true,
        unique: true
    },
    customerIdToken: {
        type: String
    },
    customerPhoneNumber: {
        type: String,
        required: true,
        unique: true,
        maxlength: 10,
        minlength: 10
    },
    customerGender: {
        type: String
    },
    customerAge: {
        type: Number
    },
    customerCity: {
        type: String
    },
    customerCountry: {
        type: String
    }
    
});

CustomerSchema.plugin(uniqueValidator, {
    defaultMessage: "Expected to be unique"
});
module.exports = mongoose.model('customers', CustomerSchema);

  