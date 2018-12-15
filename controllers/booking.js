const Booking = require('../models/bookingSchema');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const Discount = require('../models/discountSchema');
postBookingdetails = function (req, res) {

        Booking.create({

            customerEmail: req.body.customerEmail,
            bookingReferenceID: req.body.bookingReferenceID,
            hotelName: req.body.hotelName,
            hotelRegistrationNumber: req.body. hotelRegistrationNumber,
            checkIn: req.body.checkIn,
            checkOut: req.body.checkOut,
            bookedRooms: req.body.bookedRooms,
            bookedGuests: req.body.bookedGuests,
            totalAmount: req.body.totalAmount,

    }).then((data) => {
        const output = `
            <p>Your booking request is confirmed</p>
            <h3>Booking details</h3>
            <ul>  
              <li>Booking Id: ${data.bookingReferenceID}</li>
              <li>Hotel Registration Number: ${data.hotelRegistrationNumber}</li>
              <li>Booked Rooms: ${data.bookedRooms}</li>
              <li>Booked Guests: ${data.bookedGuests}</li>
              <li>Amount Payable: ${data.totalAmount}</li>
            </ul>
          `;
        let transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 't15543952@gmail.com',
                pass: 'test9876'
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        let mailOptions = {
            from: '"Book My Room" <t15543952@gmail.com>',
            to: data.customerEmail,
            subject: 'Booking Details',
            text: 'Booking confirmed',
            html: output
        };
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return error;
            }
            else{
            res.send({
                msg: 'Email has been sent'
            });
        }
        });
    });
}

bookingDetails = function (req, res) {
    Booking.find({
        customerEmail: req.body.customerEmail
    }, function (err, doc) {
        if (err) {
            res.send(404).json('Email Not found')
        }
        else {
            res.status(200).json(doc);
        }
    });
}
getbookingDetails = function (req, res) {
 Booking.find({customerEmail: req.body}).then(function (bookings) {
        res.json(bookings);
    });
}


module.exports = {postBookingdetails, bookingDetails,getbookingDetails}
