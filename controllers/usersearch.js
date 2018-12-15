const Hotel = require('../models/hotelSchema');
const HotelAvailablity = require('../models/hotelAvailabilitySchema');
usersearch = function (req, res) {
    var city = req.body.city;
    Hotel.find({ 'hotelAddress.city': req.body.city }, function (err, data) {
        if (err) {
            res.status(500).send({ status: "NOT OK ( error in usersearch controller)" });
        }
        data.length = 10;
        res.status(200).send({ hotelList: data });
    });
}
citySearch = function (req, res) {
    Hotel.find().distinct('hotelAddress.city', function (err, data) {
        if (err)
            res.status(404).send('not found');
        res.status(200).json(data);
    });
}

managerSearch = function (req, res) {
    Hotel.find().distinct('managerEmail', function (err, data) {
        if (err)
            res.status(404).send('not found');
        res.status(200).json(data);
    });
}
module.exports = {
    usersearch,
    citySearch,
    managerSearch
}
        // let doc = {
        //     hotelReferenceNumber : 101,
        //     date : new Date(2018,8,29),
        //     availableRooms : 20,
        // };
        // HotelAvailablity.create(doc,function(err,data){
        //     if(err)
        //     res.send('error');
        //     // res.send(doc);
        // });
        // HotelAvailablity.find({}, function (err, data) {
        //     if (err) {
        //         res.send({ status: "NOT OK ( error in usersearch controller)" });
        //     }     
        //    // console.log(data);
        //    //    console.log(data[0].date);
        //     // res.send('hotel');
        // });
                // HotelAvailablity.aggregate([{
        //     $project:
        //     {
        //         date:
        //         {
        //             $dateToString:
        //             {
        //                 format: "%m/%d/%Y",
        //                 date: "$date"
        //             }
        //         },
        //         availableRooms: 1,
        //         hotelReferenceNumber: 1
        //     }
        // }]).exec((err, locations) => {
        //     if (err) throw err;
        //     console.log(locations);
        // })