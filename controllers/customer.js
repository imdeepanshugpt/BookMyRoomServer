const Customer = require('../models/customerSchema');
const bcrypt = require('bcryptjs');

userDetails = function (req, res) {
    Customer.find({
        customerEmail: req.body.customerEmail
    }, function (err, doc) {
        if (err) {
            res.send(404).json('Email Not found');
        } else {
        res.status(200).json(doc);
        }
    });
}
editDetails = function (req, res) {
    Customer.findOneAndUpdate({
        customerEmail: req.params.customerEmail
    }, {
            $set: {
                customerName: req.body.customerName,
                customerPhoneNumber: req.body.customerPhoneNumber,
                customerGender: req.body.customerGender,
                customerAge: req.body.customerAge,
                customerCity: req.body.customerCity,
                customerCountry: req.body.customerCountry
            }
        },
        function (err, results) {
            if (err) {
                res.status(404).json('Email Not found')
            }
            else {
                res.status(200).json('successfully updated');
            }
        })
}

getCustomers = function (req, res) {
    Customer.find({}, function (err, doc) {
        if (err) {
            res.status(404).send({
                message: 'Not found'
            });
        }
        res.status(200).send({
            status: 'OK',
            data: doc
        });
    })
}

signupCustomer = function (req, res, next) {
    console.log('here');
    console.log(req.body);
    Customer.create({
        customerName: req.body.customerName,
        customerEmail: req.body.customerEmail,
        customerIdToken: req.body.customerIdToken,
        customerPhoneNumber: req.body.customerPhoneNumber,
        customerGender: req.body.customerGender,
        customerAge: req.body.customerAge,
        customerCity: req.body.customerCity,
        customerCountry: req.body.customerCountry
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
}
findCustomerByEmail = function (req, res, next) {
    console.log(req.body);
    Customer.findOne({
        'customerEmail': req.body.customerEmail
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
module.exports = {
    userDetails,
    editDetails,
    getCustomers,
    signupCustomer,
    findCustomerByEmail
}