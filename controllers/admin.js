const jwt = require('jsonwebtoken');
const Admin = require('../models/adminSchema');
const Discount = require('../models/discountSchema');
const Hotel = require('../models/hotelSchema');

deleteHotel = function (req, res) {
    Hotel.remove({
        'hotelRegistrationNumber': req.body.hotelRef
    }, function (err) {
        if (err) res.status(500).send("error");
        Hotel.find({
            'hotelAddress.city': req.body.hotelCity
        }, function (err, doc) {
            if (err) res.status(500).send("error");
            res.status(200).send({
                status: "OK",
                doc: doc
            });
        });
    });
}
addHotel = function (req, res) {
    Hotel.findOne({
        'hotelRegistrationNumber': req.body.finalhotel.hotelRegistrationNumber
    }, function (err, doc) {
        if (err) res.send("error");
        if (doc == null) {
            Hotel.create(req.body.finalhotel).then(function (doc) {
                res.send({
                    status: "ADDED",
                    doc: doc
                });
            }).catch(function (err) {
                res.send({
                    status: err
                });
            });
        } else {
            res.send({
                status: "EXIST",
                doc: doc
            });
        }
    });
}
generateCoupon = function (req, res) {
    const discount = {
        referralCode: req.body.referralCode,
        discount: req.body.discount
    };
    Discount.create(discount, function (err, data) {
        if (err)
            res.send('error');
        res.send(discount);
    });
}
adminAccess = function (req, res) {
    Admin.find({
        'adminToken': req.body.token
    }, function (err, doc) {
        if (err) res.status(500).send(err);
        if (doc == null) {
            res.send({
                status: "NO",
                doc: doc
            });
        } else {
            res.status(200).send({
                status: "OK",
                doc: doc
            });
        }
    })
}
createAdmin = function (req, res) {
    jwt.sign({
        id: 'admin@bookmyroom.com'
    }, 'secretkey', (err, token) => {
        const logindetails = {
            adminName: 'admin',
            adminEmail: ' admin@bookmyroom.com',
            adminPassword: 'admin',
            adminToken: token,
            adminContactNumber: '8947963181'
        };
        Admin.create(logindetails, function (err, data) {
            if (err)
                res.send('error');
            res.send(data);
        });
    });
}
updateHotel = function (req, res) {
    Hotel.findOneAndUpdate({
            hotelName: req.params.hotelName
        }, {
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
                managerEmail: req.body.managerEmail,
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
            } else {
                res.status(200).json('successfully updated');
            }
        })
}

module.exports = {
    deleteHotel,
    addHotel,
    generateCoupon,
    adminAccess,
    createAdmin,
    updateHotel
}