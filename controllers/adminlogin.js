const Admin = require('../models/adminSchema');
const bcrypt = require('bcryptjs');
module.exports = {
    verifylogin: function (req, res) {
        Admin.find({ adminEmail: req.body.adminEmail}, { adminPassword: 1, adminToken: 1 }, function (err, data) {
            if (err || data.length === 0) {
                // console.log('if');
                res.status(401).send({ status: "invalidCredentials" });
            } else {
                // console.log('else');
                bcrypt.compare(req.body.adminPassword, data[0].adminPassword, function (err, authenticate) {
                    if (err) {
                        // console.log('else 1');
                        res.status(401).send({ status: "invalidCredentials" });
                    }
                    if (authenticate) {
                        res.status(200).send({ token: data[0].adminToken });
                    }
                    else{
                        // console.log('else 2');
                        res.status(401).send({ status: "invalidCredentials" });
                    }
                });
            }
        });
    }
}
