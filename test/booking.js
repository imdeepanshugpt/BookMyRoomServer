process.env.NODE_ENV = 'test';

let mongoose = require('mongoose');
let Booking = require('../models/bookingSchema');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);
describe('Bookings', () => {

    let sampleBooking = {
        "customerEmail": "jnashdkjdhsj@gmail.com",
        "bookingReferenceID": "8GDUY1Q0Z",
        "hotelName": "Radisson Blu Hotel",
        "hotelRegistrationNumber": "104",
        "checkIn": "2018-09-13T18:30:00.000Z",
        "checkOut": "2018-09-14T18:30:00.000Z",
        "bookedRooms": 1,
        "bookedGuests": 1,
        "totalAmount": 2549,
    }
    describe('/booking', () => {

        beforeEach((done) => {
            Booking.create(sampleBooking, (err) => {
                done();
            });
        });

        afterEach((done) => {
            Booking.remove(sampleBooking, (err) => {
                done();
            });
        });

        it('it should get booking history by email', (done) => {
            chai.request('http://localhost:3000')
                .post(`/booking/bookinghistory`)
                .send({ customerEmail: sampleBooking.customerEmail })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });

        it('it should return 404 for invalid request', (done) => {
            chai.request('http://localhost:3000')
                .post(`/booking/bookinghistoory`)
                .send({ customerEmail: sampleBooking.customerEmail })
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });

        it('it should return array of length 0 for invalid email', (done) => {
            chai.request('http://localhost:3000')
                .post(`/booking/bookinghistory`)
                .send({ customerEmail:'shdgjhdsdjhaj@gmail.com' })
                .end((err, res) => {
                     res.body.should.be.a('array').to.have.length(0);
                    done();
                });
        });

    });

});