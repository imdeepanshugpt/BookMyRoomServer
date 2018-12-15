const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-beautiful-unique-validation');
const HotelAvailabilitySchema = new mongoose.Schema({
    hotelReferenceNumber: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    availableRooms: {
        type: Number,
        required: true
    }
});
HotelAvailabilitySchema.plugin(uniqueValidator, {
    defaultMessage: "Expected to be unique"
});
module.exports = mongoose.model('hotelAvailabilities', HotelAvailabilitySchema);