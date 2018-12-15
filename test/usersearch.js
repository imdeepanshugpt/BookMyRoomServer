process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Hotel = require('../models/hotelSchema');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);
describe('UserSearch', () => {

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
    describe('/userSearch', () => {

        beforeEach((done) => {
            Hotel.create(sampleHotel, (err) => {
                done();
            });
        });

        afterEach((done) => {
            Hotel.remove(sampleHotel, (err) => {
                done();
            });
        });

        it('it should get hotels by distinct city', (done) => {
            chai.request('http://localhost:3000')
                .get('/usersearch/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });

        it('it should get hotels by city', (done) => {     
            chai.request('http://localhost:3000')
                .post('/usersearch/')
                .send({ 'hotelAddress.city': sampleHotel.hotelAddress.city })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

        it('it should get hotels by managerEmail', (done) => {     
            chai.request('http://localhost:3000')
                .get('/usersearch/managerSearch')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });

        it('it should give 404 error for invalid request', (done) => {     
            chai.request('http://localhost:3000')
                .post('/usersearchh/')
                .send({ 'hotelAddress.city': sampleHotel.hotelAddress.city })
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should give 404 error for invalid request', (done) => {     
            chai.request('http://localhost:3000')
                .get('/usersearchh/managersearch')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

    });

});