const jwt = require('jsonwebtoken');
const Admin = require('../models/adminSchema');
module.exports = {
    Authenticate: function (req, res, next) {
        console.log(req.body.token);
        const token = req.body.token;
        if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
        Admin.find({ adminToken: req.body.token }, function (err, doc) {
            if (err) return res.status(500).send({
                auth: false, message: 'Server error'
            });
            else if (doc == null) {
                return res.status(400).send({
                    auth: false, message: 'Invalid Request.'
                })
            }
            else {
                next();
            }
        })
        // jwt.verify(token, 'secretkey', function (err, decoded) {
        //     if (err) return res.status(500).send({
        //         auth: false, message: 'Failed to authenticate token.'
        //     });
        //    // res.status(200).send('Authenticated');
        //     next();
        // });
    }
}

