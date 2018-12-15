const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-beautiful-unique-validation');

let AdminSchema = new mongoose.Schema({
    adminName: {
        type: String,
        required: true, 
        unique: true
    },
    adminEmail: {
        type: String,
        required: true
    },
    adminPassword: {
        type: String,
        required: true
    },
    adminToken: {
        type: String
    },
    adminMobileNumber: {
        type: String
    }
});
AdminSchema.pre('save', function (next) {
    this.adminPassword = bcrypt.hashSync(this.adminPassword, 10);
    next();
});

AdminSchema.plugin(uniqueValidator, {
    defaultMessage: "Expected to be unique"
});
module.exports = mongoose.model('admins', AdminSchema);

  