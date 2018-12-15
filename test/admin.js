process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Booking = require('../models/bookingSchema');
let Hotel = require('../models/hotelSchema');
let Discount = require('../models/discountSchema');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);
describe('ADMIN', () => {

    let validToken = {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluQGJvb2tteXJvb20uY29tIiwiaWF0IjoxNTM1NTQ0MTk4fQ._B8yIObHHkIGQ_sUrSgYqAUxdCCZ0rP78iGRVlbs_78"
    }
    let invalidToken = {
        "token": "byJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFkbWluQGJvb2tteXJvb20uY29tIiwiaWF0IjoxNTM1NTQ0MTk4fQ._B8yIObHHkIGQ_sUrSgYqAUxdCCZ0rP78iGRVlbs_78"
    }
    let coupon = {
        "referralCode": "COUPON",
        "discount": 200
    };
    let sampleHotel1 = {
        "hotelName" : "Noorya Jaipur",
        "hotelAddress" : {
            "street" : "Panchavati Circle, Near, Chimanlal Girdharlal Rd, Roads, Ambawadi",
            "city" : "Jaipur",
            "state" : "Rajasthan",
            "pin" : "300951",
            "country" : "India"
        },
        "imageUrls" : {
            "img1" : "https://firebasestorage.googleapis.com/v0/b/udemy-ng-http-6a66c.appspot.com/o/jaipur3.jpg?alt=media&token=ffb6567e-9852-4a0e-ac59-f966b05dd7ec",
            "img2" : "https://firebasestorage.googleapis.com/v0/b/udemy-ng-http-6a66c.appspot.com/o/b3.jpg?alt=media&token=fc03ac50-8a9c-4e1d-a1a6-05729da44263",
            "img3" : "https://firebasestorage.googleapis.com/v0/b/udemy-ng-http-6a66c.appspot.com/o/r3.jpg?alt=media&token=024687f5-9346-4ca0-a305-316b0648ef44"
        },
        "managerEmail" : "manager10@gmail.com",
        "hotelRegistrationNumber" : "678",
        "hotelPrice" : 1549,
        "hotelCategory" : "Standard",
        "hotelRoomCount" : 15,
        "hotelFeatures" : {
            "ac" : true,
            "wifi" : true,
            "food" : false
        },
        "hotelAverageRating" : 4,
        "hotelReviews" : [ 
            {
                "customerName" : "Piper Chapman",
                "customerEmail" : "piperchapman@gmail.com",
                "review" : "Good Service",
                "reply" : "Thank You"
            }
        ],
        "hotelDiscount" : 10
    }
    describe('POST /admin/adminAccess', () => {
        it('should return admin creds if token is valid', (done) => {
            chai.request('http://localhost:3000')
                .post(`/admin/adminAccess`)
                .send(validToken)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.doc.should.be.a('array');
                    res.body.doc.should.have.length(1);
                    done();
                });
        });
        it('should return empty doc if token is invalid', (done) => {
            chai.request('http://localhost:3000')
                .post(`/admin/adminAccess`)
                .send(invalidToken)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.doc.should.be.a('array');
                    res.body.doc.should.have.length(0);
                    done();
                });
        });
    });
    describe('POST /admin/add', () => {
        beforeEach((done) => {
            Hotel.create(sampleHotel1, (err) => {
                done();
            });
        });

        afterEach((done) => {
            Hotel.deleteOne({'hotelName': 'Noorya Jaipur'}, (err) => {
                done();
            });
        });
    
        it('should add hotel to the hotels collection', (done) => {
            chai.request('http://localhost:3000')
                .post(`/admin/add`)
                .send({"finalhotel": sampleHotel1})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.status.should.be.a('string');
                    // res.body.status.should.equal("ADDED");
                    done();
                });
        });
    });
    describe('DELETE /admin/delete', () => {
        beforeEach((done) => {
            Hotel.create(sampleHotel1, (err) => {
                done();
            });
        });

        afterEach((done) => {
            Hotel.deleteOne({'hotelName': 'Noorya Jaipur'}, (err) => {
                done();
            });
        });
    
        it('should delete hotel by registration number', (done) => {
            chai.request('http://localhost:3000')
                .post(`/admin/delete`)
                .send({"token": validToken.token, "hotelRef": sampleHotel1.hotelRegistrationNumber})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.status.should.be.a('string');
                    // res.body.status.should.equal("ADDED");
                    done();
                });
        });
    });
});