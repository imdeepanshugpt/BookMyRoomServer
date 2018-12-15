process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Hotel = require('../models/hotelSchema');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);
describe('Hotels', () => {

    let sampleHotel = {
        "hotelName" : "Holiday Inn Jaipur",
        "hotelAddress" : {
            "street" : "Plot No. 1, Sardar Patel Road, Shivaji Nagar, C Scheme",
            "city" : "Jaipur",
            "state" : "rajasthan",
            "pin" : "302001",
            "country" : "India"
        },
        "imageUrls" : {
            "img1" : "https://firebasestorage.googleapis.com/v0/b/udemy-ng-http-6a66c.appspot.com/o/jaipur1.jpg?alt=media&token=761bfad6-ed85-426c-b44b-f87bf07b5208",
            "img2" : "https://firebasestorage.googleapis.com/v0/b/udemy-ng-http-6a66c.appspot.com/o/b1.jpg?alt=media&token=357e5b2b-6558-40dc-b73a-29326eddd02d",
            "img3" : "https://firebasestorage.googleapis.com/v0/b/udemy-ng-http-6a66c.appspot.com/o/r1.jpg?alt=media&token=d01d5fcf-d37a-4e19-8065-fe50c726f811"
        },
        "managerEmail" : "manager4@gmail.com",
        "hotelRegistrationNumber" : "202",
        "hotelPrice" : 1700,
        "hotelCategory" : "Standard",
        "hotelRoomCount" : 20,
        "hotelFeatures" : {
            "ac" : true,
            "wifi" : true,
            "food" : true
        },
        "hotelAverageRating" : 3.75,
        "hotelReviews" : [ 
            {
                "customerName" : "Piper Chapman",
                "customerEmail" : "piperchapman@gmail.com",
                "review" : "excellent",
                "reply" : "Thanks"
            }
        ],
        "hotelDiscount" : 10
    }

    let sampleHotel2 = {
        "hotelName" : "Courtyrad Mariot",
        "hotelAddress" : {
            "street" : "No 8 jeya Nagar",
            "city" : "Pune",
            "state" : "Karnataka",
            "pin" : "302016",
            "country" : "India"
        },
        "imageUrls" : {
            "img1" : "https://firebasestorage.googleapis.com/v0/b/udemy-ng-http-6a66c.appspot.com/o/imagef.jpg?alt=media&token=2832eafb-c062-4885-a4e6-f3ee0e00138f",
            "img2" : "https://firebasestorage.googleapis.com/v0/b/udemy-ng-http-6a66c.appspot.com/o/imager1.jpg?alt=media&token=713de6d8-7b21-466f-bf91-f30b6003aa90",
            "img3" : "https://firebasestorage.googleapis.com/v0/b/udemy-ng-http-6a66c.appspot.com/o/imager2.jpg?alt=media&token=b2366e93-daf9-4350-8c07-068a90529139"
        },
        "managerEmail" : "manager2@gmail.com",
        "hotelRegistrationNumber" : "201",
        "hotelPrice" : 2000,
        "hotelCategory" : "Luxury",
        "hotelRoomCount" : 20,
        "hotelFeatures" : {
            "ac" : true,
            "wifi" : true,
            "food" : true
        },
        "hotelAverageRating" : 5,
        "hotelReviews" : [ 
            {
                "customerName" : "vharhun ganesalingam",
                "customerEmail" : "vharhun1996@gmail.com",
                "review" : "Great",
                "reply" : "Thank you.,"
            }
        ],
        "hotelDiscount" : 10
    }
    describe('/hotel', () => {

        beforeEach((done) => {
            Hotel.create([sampleHotel, sampleHotel2], (err) => {
                done();
            });
        });

        afterEach((done) => {
            Hotel.remove(sampleHotel, (err) => {})
                .then(
                    Hotel.remove(sampleHotel2, (err) => {
                        done();
                    })
                )
        });

        it('it should get all the hotels if the request is valid', (done) => {
            chai.request('http://localhost:3000')
                .post(`/hotel`)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('it should get all the reviewss if the request is valid', (done) => {
            chai.request('http://localhost:3000')
                .get(`/hotel/getReviews`)
                .send({'hotelRegistrationNumber': sampleHotel.hotelRegistrationNumber})
                .end((err, res) => {
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('it should add reply if the request is valid', (done) => {
            chai.request('http://localhost:3000')
                .post(`/hotel/addReply`)
                .send({'hotelRegistrationNumber': sampleHotel.hotelRegistrationNumber})
                .set('hotelReviews.reply', 'thank you')
                .end((err, res) => {
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('it should add rating if the request is valid', (done) => {
            chai.request('http://localhost:3000')
                .post(`/hotel/addRating`)
                .send({'hotelRegistrationNumber': sampleHotel.hotelRegistrationNumber})
                .set('hotelAverageRating', sampleHotel.hotelAverageRating)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    done();
                });
        });



    });

});