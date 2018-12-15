const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-beautiful-unique-validation');

let DiscountSchema = new mongoose.Schema({
    referralCode: {
        type: String,
        required: true,
        unique: true
    },
    discount: {
        type: Number,
        required: true
    }
});

DiscountSchema.plugin(uniqueValidator, {
    defaultMessage: "Expected to be unique"
});

module.exports = mongoose.model('discounts',DiscountSchema);