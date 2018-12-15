const Hotel = require('../models/hotelSchema');

getHotels = function (req, res) {
    Hotel.find({
        'hotelAddress.city': req.body.city
    }, function (err, doc) {
        if (err) {
            res.send({
                status: "NotOK"
            });
        }
        res.send({
            status: "OK",
            doc: doc
        });
    });
},



addComments = function (req, res) {
        Hotel.findOneAndUpdate({ 'hotelRegistrationNumber': req.body.hotelRegNum }, { $push: { hotelReviews: req.body } },
            { safe: true, upsert: true },
            function (err, doc) {
                if (err) {
                    res.status(400).send({ status: "invalid Data" });
                } else {
                    res.send({ doc });
                }
            })
},

addRatings = function (req, res) {
        Hotel.findOneAndUpdate({ hotelRegistrationNumber: req.body.hotelRegNum }, {
            $set: {
                hotelAverageRating: req.body.rating
            }
        },
            function (err, results) {
                if (err) {
                    res.status(400).send({ status: "invalid Data" });
                }
                else {
                    res.send({ status: 'successfully Added' });
                }
            })
},

getReviews = function (req,res) {
    Hotel.find({'hotelRegistrationNumber': req.query.regNum}, function (err, doc) {
        if (err) {
            res.send({
                status: "NotOK"
            });
        }
        res.send({
            status: "OK",
            doc: doc
        });
    });
},

addReply = function (req, res) {
    Hotel.update({'hotelRegistrationNumber': req.body.hotelRegistrationNumber, 'hotelReviews.customerName': req.body.customerName},
    {$set: {'hotelReviews.$.reply': req.body.reply}}, function(err,doc) {
        if (err) {
            res.send({
                status: "NotOK",
                error: err
            });
        }
        res.send({
            status: "OK",
            doc: doc
        });
    }
)
}

module.exports = {
    getHotels, addComments, addRatings, getReviews, addReply
}