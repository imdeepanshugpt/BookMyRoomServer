const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const uniqueValidator = require('mongoose-beautiful-unique-validation');

let HotelSchema = new mongoose.Schema({
    hotelName: {
        type: String,
        required: true
    },
    hotelAddress: {
        street: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        pin: {
            type: String
        },
        country: {
            type: String
        }
    },
    imageUrls: {
        img1: {
            type: String
        },
        img2: {
            type: String
        },
        img3: {
            type: String
        }
    },
    managerEmail: {
        type: String,
        required: true
    },
    hotelRegistrationNumber: {
        type: String,
        required: true
    },
    hotelPrice: {
        type: Number,
        required: true
    },
    hotelCategory: {
        type: String
    },
    hotelRoomCount: {
        type: Number,
        required:true
    },
    hotelFeatures: {
        ac: {
            type: Boolean
        },
        wifi: {
            type: Boolean
        },
        food: {
            type: Boolean
        }
    },
    hotelAverageRating: {
        type: Number,
        min: 0,
        max: 5
    },
    hotelReviews: [{
        customerName: {
            type: String 
        },
        customerEmail: {
            type: String
        },
        review: {
            type: String
        },
        reply: {
            type: String
        }
    }],
    hotelDiscount: {
        type: Number
    }

});

HotelSchema.plugin(uniqueValidator, {
    defaultMessage: "Expected to be unique"
});


module.exports = mongoose.model('hotels', HotelSchema);