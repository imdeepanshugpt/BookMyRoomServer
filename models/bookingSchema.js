const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-beautiful-unique-validation');

let BookingSchema = new mongoose.Schema({
    customerEmail: {
        type: String, 
        required: true
    },
    bookingReferenceID: {
        type: String,
        required: true,
        unique: true
    },
    hotelName: {
        type: String,
        required: true
    },
    hotelRegistrationNumber: {
        type: String,
        required: true
    },
    checkIn: {
        type: Date,
    },
    checkOut:{
        type: Date,
    },
    bookedRooms: {
        type: Number
    },
    bookedGuests: {
        type: Number
    },
    totalAmount: {
        type: Number,
    }
});

BookingSchema.plugin(uniqueValidator, {
    defaultMessage: "Expected to be unique"
});
module.exports = mongoose.model('bookings', BookingSchema);