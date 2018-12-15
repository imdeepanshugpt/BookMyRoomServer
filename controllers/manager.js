const Manager = require('../models/managerSchema');
const Hotel = require('../models/hotelSchema');
const nodemailer = require('nodemailer');

changeStatus = function (req, res) {
    Manager.findOneAndUpdate(
        {
            managerEmail: req.params.managerEmail
        },
        {
            $set: {
                approvalStatus: true
            }
        },
        function (err, results) {
            if (err) {
                res.send(404).json('Email Not found')
            }
            else {
                res.status(200).json('successfully updated');
                const output = `
                <p>Don't reply on this mail. This is system generated mail.</p>
                <p>Your request is approved</p>
                <h3>Congratulations...</h3>
                <ul>  
                    <li> Your Email ID is : ${ req.params.managerEmail}</li>
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
                    to: req.params.managerEmail,
                    subject: 'Manager Request Approved',
                    text: 'Confirmed',
                    html: output
                };
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Message sent: %s', info.messageId);
                        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                    }

                });
            }
        });
},
declineRequest = function (req, res) {
    console.log(req.params);
    Manager.remove({ managerEmail: req.params.managerEmail }, function (err, doc) {
        if (err)
            res.status(404).send(err);
        res.status(200).send(doc);
    });
},
getManagerHotels = function (req, res) {
        Hotel.find({
            'managerEmail': req.body.managerEmail
        }, function (err, doc) {
            if (err) {
                res.send(404).json('Manager Email Not found')
            } else {
                res.status(200).json(doc);
            }
        });
}
getManager = function (req, res) {
    Manager.find({ 'approvalStatus': false }, function (err, data) {
        if (err) {
            console.log(err);
            res.status(400).send({
                message: 'Bad request'
            });
        } else {
            console.log(data);
            res.status(200).send({
                message: 'OK',
                data: data
            });
        }
    });
},
signupManager = function (req, res) {
        console.log('here');
        console.log(req.body);
        Manager.create({
            managerName: req.body.managerName,
            managerEmail: req.body.managerEmail,
            approvalStatus: req.body.approvalStatus,
            managerPhoneNumber: req.body.managerPhoneNumber,
            managerGender: req.body.managerGender,
            managerAge: req.body.managerAge,
            managerCity: req.body.managerCity,
            managerCountry: req.body.managerCountry
        }, function (err, data) {
            if (err) {
                console.log(err);
                res.status(400).send({
                    message: 'Bad request'
                });
            } else {
                console.log(data);
                res.status(200).send({
                    message: 'OK',
                    data: data
                });
            }
        })
},
getManagerDetails = function (req, res) {
    Manager.findOne({
        'managerEmail': req.body.managerEmail
    }, function (err, data) {
        if (err) {
            res.status(404).send({
                message: 'Not found'
            });
        } else {
            res.status(200).send({
                message: 'OK',
                data: data
            });
    }
    });
}
updateHotel = function (req, res) {
    Hotel.findOneAndUpdate({
        hotelName: req.params.hotelName
    },
        {
            $set: {
                hotelAddress: {
                    street: req.body.hotelAddress.street,
                    city: req.body.hotelAddress.city,
                    state: req.body.hotelAddress.state,
                    pin: req.body.hotelAddress.pin,
                    country: req.body.hotelAddress.country
                },
                imageUrls: {
                    img1: req.body.imageUrls.img1,
                    img2: req.body.imageUrls.img2,
                    img3: req.body.imageUrls.img3
                },
                hotelRegistrationNumber: req.body.hotelRegistrationNumber,
                hotelPrice: req.body.hotelPrice,
                hotelCategory: req.body.hotelCategory,
                hotelRoomCount: req.body.hotelRoomCount,
                hotelFeatures: {
                    ac: req.body.hotelFeatures.ac,
                    wifi: req.body.hotelFeatures.wifi,
                    food: req.body.hotelFeatures.food
                }
            }
        },  
        function (err, results) {
            if (err) {
                res.send(404).json('Hotel Not found')
            }
            else {
                res.status(200).json('successfully updated');
            }
        })
},
module.exports = {
    signupManager,
    getManager,
    changeStatus,
    declineRequest,
    getManagerHotels,
    getManagerDetails,
    updateHotel
}


