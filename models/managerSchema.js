const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-beautiful-unique-validation');

let ManagerSchema = new mongoose.Schema({
    managerName: {
        type: String,
        required: true
    },
    managerEmail: {
        type: String,
        required: true,
        unique: true
    },
    approvalStatus: {
        type: Boolean
    },
    managerPhoneNumber: {
        type: String,
    },
    managerGender: {
        type: String
    },
    managerAge: {
        type: Number
    },
    managerCity: {
        type: String
    },
    managerCountry: {
        type: String
    }
});

ManagerSchema.plugin(uniqueValidator, {
    defaultMessage: "Expected to be unique"
});
module.exports = mongoose.model('managers', ManagerSchema);

