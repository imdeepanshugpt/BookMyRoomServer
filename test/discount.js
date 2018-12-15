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
describe('DISCOUNT', () => {
    let coupon = {
        "referralCode": "COUPON",
        "discount": 200
    };
    describe('GET /discount/', () => {
        it('should return coupons', (done) => {
            chai.request('http://localhost:3000')
                .get(`/discount`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
    describe('DELETE /discount/:_coupon', () => {
       
        beforeEach((done) => {
            Discount.create(coupon, (err) => {
                done();
            });
        });

        afterEach((done) => {
            Discount.deleteOne({'referralCode': 'COUPON'}, (err) => {
                done();
            });
        });
    
        it('should delete coupon provided as parameter', (done) => {
            chai.request('http://localhost:3000')
                .del(`/discount/${coupon.referralCode}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.n.should.equal(1);
                    done();
                });
        });
    });
});